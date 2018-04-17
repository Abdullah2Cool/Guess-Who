class WelcomeState extends Phaser.State {
    InputPlugin;
    inputField;
    instructions: Phaser.Text;
    playButton: Phaser.Button;
    name: string = "Enter name here";

    distance = 300;
    speed = 6;
    max = 1000;
    canvas;
    xx = [];
    yy = [];
    zz = [];

    constructor() {
        super();
    }

    preload() {
        this.game.load.image("red_bullet", "Assets/Red Bullet.png");
        this.game.load.image("blue_bullet", "Assets/Blue Bullet.png");
        this.game.load.image("play_Button", "Assets/Play Button.png");

        // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.game.scale.pageAlignHorizontally = true;
        // this.game.scale.pageAlignVertically = true;
    }

    create() {
        this.canvas = this.game.add.bitmapData(this.game.width, this.game.height);
        this.canvas.addToWorld();
        for (var i = 0; i < this.max; i++) {
            this.xx[i] = Math.floor(Math.random() * this.game.width) - this.game.width/2;
            this.yy[i] = Math.floor(Math.random() * this.game.height) - this.game.height/2;
            this.zz[i] = Math.floor(Math.random() * 1700) - 100;
        }
        this.game.stage.backgroundColor = "#000";

        this.InputPlugin = this.game.plugins.add(PhaserInput.Plugin);

        this.instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, "Pick a Name:",
            {font: "65px Arial", fill: "#ff0044", align: "center"});
        this.instructions.anchor.set(0.5, 0.5);

        this.playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 50, "play_Button", this.startNext, this);
        this.playButton.anchor.set(0.5, 0.5);

        this.inputField = this.game.add.inputField(this.game.world.centerX - 250, this.game.height / 2 - 120, {
            font: '50px Arial',
            fill: '#0005ff',
            fontWeight: 'bold',
            width: 500,
            max: 15,
            padding: 8,
            borderWidth: 1,
            borderColor: '#71ff00',
            borderRadius: 6,
            placeHolder: this.name,
            textAlign: 'center',
            type: PhaserInput.InputType.text
        });
    }

    update() {
        this.canvas.clear();

        for (var i = 0; i < this.max; i++) {
            var perspective = this.distance / (this.distance - this.zz[i]);
            var x = this.game.world.centerX + this.xx[i] * perspective;
            var y = this.game.world.centerY + this.yy[i] * perspective;

            this.zz[i] += this.speed;

            if (this.zz[i] > 300) {
                this.zz[i] -= 600;
            }

            //  Swap this for a standard drawImage call
            if (i % 2 == 0) {
                this.canvas.draw('red_bullet', x, y);
            } else {
                this.canvas.draw('blue_bullet', x, y);
            }
        }
    }

    startNext() {
        if (this.inputField.value !== "") {
            this.game.state.start("SelectState", true, false, {name: this.inputField.value});
        }
    }

}