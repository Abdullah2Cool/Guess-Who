class WaitState extends Phaser.State {
    constructor() {
        super();
    }
    init(data) {
        this.socket = data.socket;
        this.myID = data.id;
        this.choice = data.choice;
        // console.log(`My Choice ${this.choice}`);
    }
    create() {
        this.InputPlugin = this.game.plugins.add(PhaserInput.Plugin);
        // this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, "Waiting for other players...", {
        //     font: "bold 32px Arial",
        //     fill: "#000"
        // }).anchor.set(0.5, 0.5);
        this.instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, "Enter Partner's Name:", { font: "65px Arial", fill: "#ff0044", align: "center" });
        this.instructions.anchor.set(0.5, 0.5);
        this.playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 50, "play_Button", this.checkPartner, this);
        this.playButton.anchor.set(0.5, 0.5);
        this.inputField = this.game.add.inputField(this.game.world.centerX - 250, this.game.world.centerY - 120, {
            font: '50px Arial',
            fill: '#0005ff',
            fontWeight: 'bold',
            width: 500,
            max: 15,
            padding: 8,
            borderWidth: 1,
            borderColor: '#71ff00',
            borderRadius: 6,
            placeHolder: "Partner's Name",
            textAlign: 'center',
            type: PhaserInput.InputType.text
        });
        this.invalid = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 300, "Invalid Partner Name", { font: "40px Arial", fill: "#000000", align: "center" });
        this.invalid.anchor.set(0.5, 0.5);
        this.invalid.visible = false;
        this.socket.emit("ready", { choice: this.choice });
        this.socket.on("partnerFound", this.onPartnerFound.bind(this));
        this.socket.on("invalid", this.onInvalid.bind(this));
    }
    onPartnerFound(data) {
        console.log(`My partner: ${data.id}`);
        this.game.state.start("PlayState", true, false, data.choice);
    }
    checkPartner() {
        if (this.inputField.value !== "") {
            this.socket.emit("checkPartner", { name: this.inputField.value });
        }
    }
    onInvalid() {
        this.invalid.visible = true;
    }
}
