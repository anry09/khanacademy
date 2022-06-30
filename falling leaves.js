angleMode = "radians";

var Particle = function(position) {
    this.acceleration = new PVector(0, 0.05);
    this.velocity = new PVector(random(0, 1), random(0, 0));
    this.position = position;
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0.001;

};
Particle.prototype.run = function() {
    this.update();
    this.display();
};

Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;
    if ( this.position.y >= height - 40 ){
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;
    this.acceleration = new PVector(0, 0);
    this.velocity = new PVector(random(0, 0), random(0, 0));

    
    }
};

Particle.prototype.display = function() {
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    image(getImage("avatars/leaf-green"), 2, 2, 40, 40);
    popMatrix();
    
};



var Tree = function(position, options) {
this.position = position.get();
this.branchingFactor = 3;
this.angleBetweenBranches = 32;
this.scaleFactor = 0.7;
this.numLevels = 4;
this.baseBranchLength = 120;
};

Tree.prototype.display = function() {
var self = this;

var forward = function(distance) {
line(0, 0, 0, -distance);
translate(0, -distance);
};
var back = function(distance) {
forward(-distance);
};
var right = function(angle) {
rotate(angle * PI / 180);
};
var left = function(angle) {
right(-angle);
};
var drawTree = function(depth, length) {
if (depth === 0) {
image(getImage("avatars/leaf-green"), -10, -30, 40, 40);
return;
}

var totalAngle = self.angleBetweenBranches * (self.branchingFactor - 1);
strokeWeight(depth*5);
forward(length);
right(totalAngle / 2.0);
for (var i = 0; i < self.branchingFactor; i += 1) {
drawTree(depth - 1, length * self.scaleFactor);
left(self.angleBetweenBranches);
}

right(totalAngle / 2.0 + self.angleBetweenBranches);
back(length);
};

pushMatrix();
translate(this.position.x, this.position.y);
stroke(122, 112, 85);
drawTree(this.numLevels, this.baseBranchLength);
popMatrix();
};

var leaves = [];
mouseClicked = function()
{
    leaves.push(new Particle(new PVector(mouseX, mouseY)));
    
 
};
var tree = new Tree(new PVector(width/2, 400));

draw = function() {
    background(194, 231, 255);
    tree.display();
    for (var i = 0; i < leaves.length; i++) {
        var leaf = leaves[i];
        leaf.run();
        if (leaf.position.y >= height - 30) {
            leaf.acceleration.set(0, 0);
            leaf.velocity.set(0, 0);
            resetMatrix();
            leaf.aAcceleration = 0;
            leaf.aVelocity = 0;
        }
    }
};
