"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(id) {
        this.bWaiting = false;
        this.id = id;
    }
    assignPartner(partner) {
        this.partner = partner;
        this.bWaiting = false;
    }
    removeParnter() {
        // this.partner = null;
        this.bWaiting = true;
    }
}
exports.Player = Player;
