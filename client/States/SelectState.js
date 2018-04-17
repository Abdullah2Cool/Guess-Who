class SelectState extends Phaser.State {
    constructor() {
        super();
        this.allCharacters = {};
    }
    init(data) {
        this.name = data.name;
        console.log("My Name: " + this.name);
    }
    preload() {
        this.game.load.spritesheet("tile_sheet", "Assets/Tile.png", 288, 432, 12);
        this.game.load.json('myData', "Assets/data.json");
        this.game.load.image('button', "Assets/pick_button.png");
    }
    create() {
        this.socket = io();
        this.allData = this.game.cache.getJSON("myData");
        this.allSelectors = this.game.add.group();
        this.allSelectors.inputEnableChildren = true;
        this.organize();
        this.add.text(this.game.world.centerX, 20, "Pick a character", {
            font: "32px Arial",
            fill: "#000000"
        }).anchor.set(0.5, 0.5);
        this.socket.emit("sendName", { name: this.name });
        this.socket.on("serverState", this.onServerState.bind(this));
        this.game.stage.backgroundColor = "#fff";
    }
    organize() {
        for (let i in this.allData.Characters) {
            this.allCharacters[this.allData.Characters[i].Name] = this.allData.Characters[i];
        }
    }
    onServerState(data) {
        this.myID = data.id;
        console.log(`My id from server: ${this.myID}`);
        let x = 1;
        let y = 1;
        for (let i in this.allCharacters) {
            this.allSelectors.add(new Selector(this.game, x * 200, y * 100, i, this.socket, this.myID));
            // x++;
            // if (x > 6) {
            //     x = 1;
            //     y++;
            // }
        }
        this.allSelectors.align(6, -1, 200, 100);
        this.allSelectors.centerX = this.game.world.centerX;
        this.allSelectors.centerY = this.game.world.centerY;
    }
}
