let increase = 0.1;
let scale = 20;
let cols, rows;

let offsetZ = 0;

function setup() {
  createCanvas(400, 400);
  cols = floor(width / scale)
  rows = floor(height / scale)
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
}