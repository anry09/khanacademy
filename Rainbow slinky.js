angleMode = "radians";

var drawSlinky = function(centerX, startY, endY) {
    noFill();
    colorMode(HSB);
    strokeWeight(2);
    ellipseMode(CENTER);
    var overlap = 0.8;
    var space = (endY/overlap - startY)/30;
    for (var i = 0; i < 30; i++) {
        stroke(i*9, 200, 255);
        ellipse(centerX, i*space*overlap + startY, 60, space);
    }
};

draw = function() {
    background(255);
    var y = sin(TWO_PI * frameCount / 120);
    var f = map(y,-1,1,100,200);
    drawSlinky(width/2, 10, f);
};
