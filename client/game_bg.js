var spacing = 6;
var size1 = spacing / 2 - 2;
var size2 = size1 * 2;
var x = 0;
var y = 0;

function setup() {
    createCanvas(800, 800);
    background(0);
    smooth();
    frameRate(500);
}

function draw() {
    if (random(1) < 0.5) {
        strokeWeight(this.size1);
        stroke(255);
        line(this.x, this.y, this.x + this.spacing, this.y + this.spacing);
        stroke(random(255), random(255), random(255));
        strokeWeight(this.size2);
        point(this.x, this.y);
        point(this.x + this.spacing, this.y + this.spacing);
    } else {
        strokeWeight(this.size1);
        stroke(255);
        line(this.x + this.spacing, this.y, this.x, this.y + this.spacing);
        stroke(random(255), random(255), random(255));
        strokeWeight(this.size2);
        point(this.x + this.spacing, this.y);
        point(this.x, this.y + this.spacing);
    }
    this.x += this.spacing;
    if (this.x > this.width) {
        this.x = 0;
        this.y += this.spacing;
        console.log(frameRate);
    }
    if (y + spacing > this.height) {
        this.x = 0;
        this.y = 0;
        this.spacing++;
        this.size1 = this.spacing / 2 - 2;
        this.size2 = this.size1 * 2;
        //noLoop();
        background(0);
    }
    if (spacing > 24) {
        console.log("Here");
        this.spacing = 6;
        this.size1 = this.spacing / 2 - 2;
        this.size2 = this.size1 * 2;
    }
}
