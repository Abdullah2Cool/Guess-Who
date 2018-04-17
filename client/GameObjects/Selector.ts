class Selector extends Phaser.Text {
    button;

    constructor(game: Phaser.Game, x: number, y: number, name, socket, id) {
        super(game, x, y, name, {font: "20px Arial", fill: "#000000"});
        this.button = this.addChild(game.make.button(x - 80, y - 90, "button", function () {
            socket.emit("choice", {choice: name});
            game.state.start("WaitState", true, false, {socket: socket, id: id, choice: name});
        }, this)).scale.set(0.4, 0.4);
        this.events.onInputOver.add(function () {
            this.addColor("#ff000a", 0);
        }, this);
        this.events.onInputOut.add(function () {
            this.addColor("#000000", 0);
        }, this);

    }
}