var Mover = function() {
    // Set mass equal to 1 for simplicity
    this.mass = 1;
    this.position = new PVector(30, 30);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

// Simulates Newton's second law
// Receive a force, divide by mass, add to acceleration
Mover.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};
  
Mover.prototype.update = function() {
    // Simulates Motion 101 from the vectors tutorial
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // Now we make sure to clear acceleration each time
    this.acceleration.mult(0);
};

Mover.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(255, 255, 255, 127);
    // Scale the size according to the mass, as a simple visualization of mass
    ellipse(this.position.x, this.position.y, this.mass*30, this.mass*30);
};

// Even though we've said we shouldn't check velocity directly, 
// there are some exceptions. Here we change it as a quick and easy
// way to bounce our mover off the edges.
Mover.prototype.checkEdges = function() {
    if (this.position.x > width) {
        this.position.x = width;
        this.velocity.x *= -1;
    } else if (this.position.x < 0) {
        this.velocity.x *= -1;
        this.position.x = 0;
    }
    if (this.position.y > height) {
        this.velocity.y *= -1;
        this.position.y = height;
    }
};

var m = new Mover(); 

var draw = function() {
    background(50, 50, 50);
    
    var wind = new PVector(0.01, 0);
    var gravity = new PVector(0, 0.1);
    m.applyForce(wind);
    m.applyForce(gravity);
    
    m.update();
    m.display();
    m.checkEdges();
};
