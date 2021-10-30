class Tile extends Phaser.Sprite {
  bOpen: boolean;
  game: Phaser.Game;
  img: Phaser.Image;
  sound: Phaser.Sound;
  text;
  select;
  otherName;

  constructor(
    game: Phaser.Game,
    x: number,
    y: number,
    scale: number,
    name,
    otherName
  ) {
    super(game, x, y, "tile_sheet");
    this.game = game;
    this.animations.add("open").reverse();
    this.animations.add("close");
    this.scale.set(1 / scale, 1 / scale);
    this.bOpen = true;
    this.inputEnabled = true;
    this.events.onInputUp.add(this.flip, this);
    let style = { font: "40px Comic Sans MS", fill: "#000" };
    this.text = this.addChild(game.make.text(x + 140, y + 150, name, style));
    this.text.anchor.set(0.5, 0.5);
    // this.select = this.addChild(game.make.button(x + 140, y + 360, "button", this.pick, this));
    // this.select.scale.set(1.4, 1.4);
    // this.select.anchor.set(0.5, 0.5);
    this.sound = game.add.audio("close_sound");

    this.otherName = otherName;
  }

  pick() {
    if (this.name == this.otherName) {
      this.game.camera.shake(100, 1000);
    } else {
      // this.game.camera.flash(0xff0000, 1000);
    }
    this.game.camera.shake(0.01, 100);
  }

  update() {}

  flip() {
    if (this.bOpen) {
      this.animations.play("close", 40, false);
      // this.img.visible = false;
      this.text.visible = false;
      // this.select.visible = false;
      this.bOpen = false;
      this.sound.play();
    } else {
      this.animations.play("open", 40, false);
      // this.img.visible = true;
      this.text.visible = true;
      // this.select.visible = true;
      this.bOpen = true;
      this.sound.play();
    }
  }
}
