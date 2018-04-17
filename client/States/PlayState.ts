class PlayState extends Phaser.State {
    constructor() {
        super();
    }

    allTiles: Phaser.Group;
    tileScale: number;
    socket;
    myID: any;
    allData: any;
    allCharacters = {};
    allArchetypes = {};
    choice: String;
    allQuestions: Phaser.Group;
    nextButton: Phaser.Button;
    backButton: Phaser.Button;
    current = 0;

    init(choice) {
        this.choice = choice;
        // console.log("Other Player's Choice 2:" + this.choice);
    }

    preload() {
        this.game.load.image("shake", "Assets/shake.jpg");
        this.game.load.image("placeholder", "Assets/placeholder.jpg");
        this.game.load.image("next", "Assets/Next Button.png");
        this.game.load.audio("close_sound", "Assets/close_door_1.mp3");
    }

    create() {
        this.allData = this.game.cache.getJSON("myData");
        this.organize();
        this.allQuestions = this.game.add.group();
        let aq = this.pick(this.choice);
        for (let i in aq) {
            this.allQuestions.add(new Question(this.game, 0, 0, aq[i]))
        }
        this.allQuestions.forEach(function (q) {
            q.visible = false;
        }, this);
        this.allQuestions.align(1, -1, 100, 25);
        this.allQuestions.x = 100;
        this.allQuestions.y = this.game.world.centerY + 100;

        // this.allQuestions.getChildAt(0).visible = true;
        this.nextButton = this.game.add.button(this.game.world.width - 100, this.game.world.height - 50, "next", this.next, this);
        this.backButton = this.game.add.button(this.game.world.width, this.game.world.height - 100, "next", this.back, this);
        this.backButton.scale.set(-1, 1);

        // this.stage.backgroundColor = "#15ceff";
        this.allTiles = this.game.add.group();
        this.tileScale = 3.2;
        let x = 0;
        let y = 0;
        for (let i in this.allCharacters) {
            let sp: Tile = new Tile(this.game, x * (288 / this.tileScale + 50),
                y * (432 / this.tileScale + 50), this.tileScale, i, this.choice);
            this.allTiles.add(sp);
            // x++;
            // if (x > 8) {
            //     x = 0;
            //     y++;
            // }
        }
        this.allTiles.align(9, -1, 120, 150, Phaser.CENTER);
        this.allTiles.centerX = this.game.world.centerX;
        // this.socket.on("partnerLeft", this.onParnterLeft.bind(this));
    }

    update() {

    }

    organize() {
        for (let i in this.allData.Archetypes) {
            this.allArchetypes[this.allData.Archetypes[i].Type] = this.allData.Archetypes[i];
        }

        for (let i in this.allData.Characters) {
            this.allCharacters[this.allData.Characters[i].Name] = this.allData.Characters[i];
        }
        console.log(this.allArchetypes);
        console.log(this.allCharacters);
    }

    pick(name): String[] {
        let myData = this.allCharacters[name];
        console.log(`Other Player's Choice: ${name}`);
        let questions = [];
        for (let i in myData.Archetypes) {
            let a = this.allArchetypes[myData.Archetypes[i]];
            for (let j = 1; j <= a.NumQuestions; j++) {
                questions.push(a[j])
            }
        }
        questions.push(myData.Question);
        // console.log(questions);
        return questions;
    }

    next() {
        console.log(`Next ${this.current}`);
        if (this.current < this.allQuestions.length) {
            this.allQuestions.getChildAt(this.current).visible = true;
            if (this.current != this.allQuestions.length - 1) this.current++;
        }
    }

    back() {
        console.log(`Back ${this.current}`);
        if (this.current >= 0) {
            this.allQuestions.getChildAt(this.current).visible = false;
            if (this.current != 0) this.current--;
        }
    }
}