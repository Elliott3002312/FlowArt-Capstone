//CITED SOURCES: https://www.youtube.com/watch?v=BjoM9oKOAKY&t=1737s
//Coding train video that teaches how to create art using perlin noise, and a flow field.

var increase = 0.1;
var scl = 20;
var cols, rows;
let alpha = 0;
let Addalpha = 0.5;
let run = true;
let rSlider,gSlider,bSlider,r,g,b;
let fadeCheck = false;

var offsetZ = 0;

var fr;

var array = [];

var flowfield;

function setup() {
  createCanvas(600, 700);
  background(0);
  cols = floor(width / scl)
  rows = floor(600 / scl)
  fr = createP('');
  
  flowfield = new Array(cols * rows);
  
  for (var i = 0; i < 400; i++) {
    array[i] = new particle()
  }
  rSlider = createSlider(0,255,255)
  gSlider = createSlider(0,255,255)
  bSlider = createSlider(0,255,255)
  rSlider.position(20,640)
  gSlider.position(240,640)
  bSlider.position(440,640)
}

function draw() {
  var offsetY = 0;
  fill(150); 
  rect(0,600,width,100)
  textSize(20)
  fill(0)
  r = rSlider.value()
  text('Red: ' + r,45,660,120,50)
  g = gSlider.value()
  text('Green: ' + g,255,660,120,50)
  b = bSlider.value()
  text('Blue: ' + b,465,660,120,50)
  
  textSize(15)
  text('Press spacebar to clear the canvas, and escape to pause/unpause the drawing!',0,620)
  text('You can only clear if the drawing is paused.',0, 635)
  
  
  if (run) {
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
    
  } else if (fadeCheck == true) {
    fade()
  }
  
  fr.html(floor(frameRate()))
}

function particle() {
  this.pos = createVector(random(width),random(600))
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
    stroke(r,g,b, 5);
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
    if (this.pos.y > 600) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = 600;
      this.updatePrev();
    }
  }
}

function fade() {
  if (run == false); {
    if (alpha < 265) {
      alpha += Addalpha;
    }
    fill(0,alpha)
    rect(0,0,600,600)
  }
}

function keyPressed() {
  if (keyCode == 27 && run == true) {
    run = false;
  } else if (keyCode == 27 && run == false) {
    run = true;
    fadeCheck = false;
  } else if (keyCode == 32 && run == false) {
    fadeCheck = true;
  }
}