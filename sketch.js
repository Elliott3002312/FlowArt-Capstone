let increase = 0.1;
let scale = 20;
let cols, rows;
let fps = 24;

let offsetZ = 0;

let particles = []

function setup() {
  createCanvas(400, 400);
  cols = floor(width / scale)
  rows = floor(height / scale)
  frameRate(fps)

  particles[0] = new particle();
}

function draw() {
  background(255);
  var offsetY = 0;
  for (let y = 0; y < height; y++) {
    let offsetX = 0;
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let angle = noise(offsetX, offsetY, offsetZ) * TWO_PI;
      let vector = p5.Vector.fromAngle(angle);
      offsetX += increase;
      stroke(0)
      push();
      translate(x * scale, y * scale);
      rotate(vector.heading());
      line(0,0,scale,0);
      
      pop();
      //rect(x * scale, y * scale, scale,scale)
    }
    offsetY += increase
    offsetZ += increase
  }
  particle[0].show();
  particle[0].update();
}




class particle {
  constructor() {
  this.pos = createVector(0,0);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  }

  update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
  }


  applyForce(force) {
      this.acc.add(force)

  }

  display() {
      stroke(0);
      point(this.pos.x,this.pos.y);
  }
}