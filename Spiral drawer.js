var r = 0;
var theta = 0;

draw = function() {
    
    
    pushMatrix();
    translate(width/2, height/2);
    
    var x = r * cos(theta);
    var y = r * sin(theta);
    
    fill(0, 0, 0);
    
    ellipse(x, y, 10, 10);
    popMatrix();
    
    theta += 1;
    r+=0.1;
};
