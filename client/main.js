class GuessWho extends Phaser.Game {
    constructor(divID) {
        super("99%", "99%", Phaser.AUTO, divID, null, false);
        this.state.add("WelcomeState", new WelcomeState());
        this.state.add("SelectState", new SelectState());
        this.state.add("WaitState", new WaitState());
        this.state.add("PlayState", new PlayState());
        this.state.start("WelcomeState", true, false);
        console.log("New Game object created.");
    }
}
window.onload = () => {
    new GuessWho("game");
};