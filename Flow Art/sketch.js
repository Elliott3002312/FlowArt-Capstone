let inc = 0.1;
let scale = 20;
let cols, rows;

function setup() {
  createCanvas(400, 400);
  cols = floor(width / scale)
  rows = floor(height / scale)
}

function draw() {
  var offsetY = 0;
  for (let y = 0; y < height; y++) {
    let offsetX = 0;
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let r = noise(offsetX, offsetY) * 255;
      offsetX += inc;
      fill(r)
      rect(x * scale, y * scale, scale,scale)
    }
    offsetY += inc
  }
}