angleMode = "radians";

var Spaceship = function() {
    this.angle = new PVector();
    this.velocity = new PVector(random(-0.03, 0.03), random(-0.03, 0.03));
    this.amplitude = new PVector(random(20, width/2), random(20, width/2));
    this.position = new PVector(0, 0);
    this.aVel = 0;
    this.aAcc = 0;
};

Spaceship.prototype.oscillate = function() {
    this.angle.add(this.velocity);
    this.position.set(
                sin(this.angle.x) * this.amplitude.x,
                sin(this.angle.y) * this.amplitude.y);
    var acceleration = dist(this.position.x,this.position.y,0,0);
    
    this.aAcc += acceleration/10000;
    this.aAcc = constrain(this.aAcc, 0.5, 1);
    this.aVel += this.aAcc;
    
};

Spaceship.prototype.display = function() {
    pushMatrix();
    translate(width/2, height/2);
    stroke(181, 63, 0);
    strokeWeight(9);
    line(0, 0, this.position.x, this.position.y);
    imageMode(CENTER);
    translate(this.position.x,this.position.y);
    rotate(this.aVel);
    image(getImage("space/octopus"),
        0, 0,
        80, 100);
    popMatrix();
};

var ships = [];
for (var i = 0; i < 10; i++) {
    ships.push(new Spaceship());
}

draw = function() {
    background(174, 218, 232);
    for (var i = 0; i < ships.length; i++) {
        ships[i].oscillate();
        ships[i].display();
    }
};
