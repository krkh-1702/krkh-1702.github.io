// Variables for source images and manipulated ones. 
let src, img;
let redC, greenC, blueC;

// Heavy assets should be loaded inside `preload()`
// to make sure they are fully available before the sketch starts. 
// Also, make sure you are running this sketch on a local server
// to avoid problems due to cross-origin requests (CORS).
function preload() {
  src = loadImage("assets/jlx-512px.png");
}

// Run once before start.
// Most static image heavy-lifting should go here.
function setup() {
  // Create a fullscreen canvas
  createCanvas(windowWidth, windowHeight);

  // Extract channels from image.
  redC = extractChannel(src, 'r');
  greenC = extractChannel(src, 'g');
  blueC = extractChannel(src, 'b');
}

// Run every frame
function draw() {
  background(127);


  // image is a p5.js library: image(img, x, y, [width], [height])
  // Display original image with original size
  image(src, 10, 10);

  // Display channels


  image(redC, src.width + 20, 10);
  image(greenC, 10, src.height + 20);
  image(blueC, src.width + 20, src.height + 20);
}

// Save the image when key pressed
function keyPressed() {
  if (key == 's' || key == 'S') {
    saveCanvas('frame_' + frameCount, 'png');
  }
}

