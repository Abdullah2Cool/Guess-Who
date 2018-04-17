export class Player {
    bWaiting: boolean = false;
    partner: Player;
    id;
    choice;
    name;

    constructor(id) {
        this.id = id;
    }

    assignPartner(partner: Player) {
        this.partner = partner;
        this.bWaiting = false;
    }

    removeParnter() {
        // this.partner = null;
        this.bWaiting = true;
    }
}