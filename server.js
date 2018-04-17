"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.get('/*', function (req, res) {
    let file = req.params[0];
    // console.log('\t :: Express :: file requested : ' + file);
    res.sendFile(__dirname + "/client/" + file);
});
server.listen(process.env.PORT || 3000);
console.log("Server started on localhost:3000");
const io = require('socket.io')(server, {});
const All_SOCKETS = {};
const ALL_PLAYERS = {};
io.on("connect", function (socket) {
    console.log(`Socket connected: ${socket.id}`);
    All_SOCKETS[socket.id] = socket;
    let currentPlayer = new Player_1.Player(socket.id);
    ALL_PLAYERS[socket.id] = currentPlayer;
    socket.emit("serverState", {
        id: socket.id
    });
    socket.on("sendName", function (data) {
        currentPlayer.name = data.name;
        console.log(`${socket.id} : ${currentPlayer.name}`);
    });
    socket.on("checkPartner", function (data) {
        if (data.name === currentPlayer) {
            socket.emit("invalid");
        }
        else {
            let foundMatch = false;
            let match;
            for (let i in ALL_PLAYERS) {
                if (ALL_PLAYERS[i] !== currentPlayer) {
                    if (ALL_PLAYERS[i].name === data.name && ALL_PLAYERS[i].bWaiting) {
                        match = ALL_PLAYERS[i];
                        foundMatch = true;
                        break;
                    }
                }
            }
            if (foundMatch) {
                currentPlayer.assignPartner(match);
                All_SOCKETS[currentPlayer.id].emit("partnerFound", {
                    id: match.id,
                    choice: match.choice
                });
                match.assignPartner(currentPlayer);
                All_SOCKETS[match.id].emit("partnerFound", {
                    id: currentPlayer.id,
                    choice: currentPlayer.choice
                });
            }
            else {
                socket.emit("invalid");
            }
        }
    });
    socket.on("ready", function (data) {
        currentPlayer.choice = data.choice;
        currentPlayer.bWaiting = true;
        console.log(`Player ${currentPlayer.name}'s choice: ${currentPlayer.choice}`);
        // for (let i in ALL_PLAYERS) {
        //     let otherPlayer: Player = ALL_PLAYERS[i];
        //     if (currentPlayer !== otherPlayer) {
        //         if (otherPlayer.bWaiting === false) continue;
        //         otherPlayer.assignPartner(currentPlayer);
        //         All_SOCKETS[i].emit("partnerFound", {
        //             id: currentPlayer.id,
        //             choice: currentPlayer.choice
        //         });
        //         console.log("HERE for player 1");
        //         currentPlayer.assignPartner(otherPlayer);
        //         All_SOCKETS[currentPlayer.id].emit("partnerFound", {
        //             id: otherPlayer.id,
        //             choice: otherPlayer.choice
        //         });
        //         console.log("HERE for player 2");
        //         console.log(`${currentPlayer.id} is partnered with ${otherPlayer.id}`);
        //         break;
        //     }
        // }
    });
    socket.on("disconnect", function () {
        delete ALL_PLAYERS[socket.id];
        delete All_SOCKETS[socket.id];
        if (currentPlayer.partner != null && currentPlayer.partner.id in All_SOCKETS) {
            All_SOCKETS[currentPlayer.partner.id].emit("partnerLeft", {});
            currentPlayer.removeParnter();
            currentPlayer.partner.removeParnter();
        }
        console.log(`Socket disconnected: ${currentPlayer.id}`);
    });
});
// setInterval(function () {
//     for (let i in ALL_PLAYERS) {
//         for (let j in ALL_PLAYERS) {
//             let currentPlayer: Player = ALL_PLAYERS[i];
//             if (currentPlayer.bWaiting === false) continue;
//             if (i !== j) {
//                 let otherPlayer: Player = ALL_PLAYERS[j];
//                 if (otherPlayer.bWaiting === false) continue;
//                 otherPlayer.assignPartner(currentPlayer);
//                 All_SOCKETS[i].emit("partnerFound", {
//                     id: currentPlayer.id
//                 });
//                 console.log("HERE for player 1");
//                 currentPlayer.assignPartner(otherPlayer);
//                 All_SOCKETS[currentPlayer.id].emit("partnerFound", {
//                     id: otherPlayer.id
//                 });
//                 console.log("HERE for player 2");
//                 console.log(`${currentPlayer.id} is partnered with ${otherPlayer.id}`);
//                 break;
//             }
//         }
//     }
// }, 1000 / 30);
