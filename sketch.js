//CITED SOURCES: https://www.youtube.com/watch?v=BjoM9oKOAKY&t=1737s
//Coding train video that teaches how to create art using perlin noise, and a flow field.

var increase = 0.1;
var scl = 20;
var cols, rows;

var offsetZ = 0;

var fr;

var array = [];

var flowfield;

function setup() {
  createCanvas(400, 400);
  background(0);
  cols = floor(width / scl)
  rows = floor(height / scl)
  fr = createP('');
  
  flowfield = new Array(cols * rows);
  
  for (var i = 0; i < 200; i++) {
    array[i] = new particle()
  }
}

function draw() {
  var offsetY = 0;
  for (var y = 0; y < rows; y++) {
    let offsetX = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(offsetX, offsetY, offsetZ) * TWO_PI  * 4;
      var vector = p5.Vector.fromAngle(angle);
      vector.setMag(1);
      flowfield[index] = vector;
      offsetX += increase;
      stroke(0,50)
    }
    offsetY += increase
    offsetZ += 0.0003;
  }
  for (var i = 0; i < array.length; i++) {
    array[i].follow(flowfield);
    array[i].update()
    array[i].edges()
    array[i].show()
  }
  
  fr.html(floor(frameRate()))
}

function particle() {
  this.pos = createVector(random(width),random(height))
  this.vel = createVector(0,0)
  this.acc = createVector(0,0)
  this.maxspeed = 4;
  
  this.prevPos = this.pos.copy();
  
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
  
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.show = function() {
    strokeWeight(1)
    stroke(255, 5);
    line(this.pos.x, this.pos.y, this.prevPos.x,this.prevPos.y)
    //point(this.pos.x, this.pos.y);
    this.updatePrev();
  }
  
  this.updatePrev = function() {
    this.prevPos.x = this.pos.x
    this.prevPos.y = this.pos.y
  }
  
  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
