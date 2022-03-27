// A variable that we will use to store processed images
let src, src2, img;
// let dithImg;

// let slider1, slider2, slider3, slider4, slider5, slider6;
let osc, osc2, osc3;
let sel1, sel2, sel3;
// let button;
// let toggle = false;

let time = 1;
let fr = 50;
let counter = 0;
let imageIndex = 0;

//For the rectangle movement
let m = 0;
let n = 0;

// Run once before start.
// Most static image heavy-lifting should go here.

function setup() {
    // Create a fullscreen canvas
    createCanvas(windowWidth, windowHeight);
    textFont('Share Tech');
    //frameVal
    // slider6 = createSlider(1, 60);
    // slider6.position(50, 100);


    osc = new p5.Oscillator();
    osc.freq(220);
    osc.setType('triangle');
    osc.amp(0.5);
    osc.start();

    osc2 = new p5.Oscillator();
    osc2.freq(100);
    osc2.setType('square');
    osc2.amp(0.5);
    osc2.start();

    osc3 = new p5.Oscillator();
    osc3.freq(300);
    osc3.setType('sawtooth');
    osc3.amp(0.5);
    osc3.start();

    // Load the image ONLY ONCE at the beginning of the program
    //src = patternVerticalBandsImage(width, height, w, [r, g, b, a]);
    //src = mathPatternDanny(width, height, w, r, g, b, a);
    src = mathPatternDanny(width, height, 250, 255, 125, 64, 255);

    // src = loadImage('asset/apple.png');
    //src = colorVerticalBandsImage(width, height, 100, [r, g, b, a]);
    //src = colorCheckersImage(width, height, 100, [r, g, b, a]);
    //src2 = whitePixelTracker(width, height);

    image(src, 0, 0);

    // Set imageIndex to the center pixel
    src.loadPixels();
    imageIndex = src.pixels.length / 2;
}

// Run every frame
function draw() {

    // let r = slider1.value();
    // let g = slider2.value();
    // let b = slider3.value();
    // let a = slider4.value();
    // let w = slider5.value();

    // let frSlider = slider6.value();
    // frameRate(frSlider);

    // Use the generated image as background
    background(src);


    // Convert imageIndex to x y locations
    let y = Math.floor(imageIndex / (4 * src.width));
    let x = (imageIndex / 4) % (src.width);

    push();
    fill('white');
    rect(x, y, 5, 5);
    pop();

    src.loadPixels();

    //---V2: FRAME---
    // reset counter after 1000 iterations

    let totalPixels = width * height * 4;
    counter = counter + 1;
    if (counter % 1000 == 0) {
        counter = 0;
    }

    if (imageIndex % totalPixels == 0) {
        imageIndex = 0;
    }


    //MAZE MOVEMENT
    // Figure out a random direction to move 
    let randomDir = Math.floor(random(0, 4));

    //Solving for edge conditions
    //Top-Left Corner
    if (imageIndex == totalPixels[0]) {
        if (randomDir == 1) {
            imageIndex += 4;
        }
        else if (randomDir == 2) {
            imageIndex += 4 * src.width;
        }
    }

    //Top-Right Corner
    if (imageIndex == totalPixels[src.width]) {
        if (randomDir == 2) {
            imageIndex += 4 * src.width;
        }
        else if (randomDir == 3) {
            imageIndex -= 4;
        }
    }

    //Bottom-Right Corner
    if (imageIndex == totalPixels[totalPixels.length - 1]) {
        if (randomDir == 0) {
            imageIndex -= 4 * src.width;
        }
        else if (randomDir == 3) {
            imageIndex -= 4;  // move left
        }
    }

    //Bottom-Left Corner
    if (imageIndex == totalPixels[src.width]) {
        if (randomDir == 2) {
            imageIndex += 4 * src.width;
        }
        else if (randomDir == 3) {
            imageIndex -= 4;
        }
    }


    //General Maze Code
    if (randomDir == 0) {
        imageIndex -= 4 * src.width; //move up
    }
    else if (randomDir == 1) {
        imageIndex += 4;  // move right
    }
    else if (randomDir == 2) {
        imageIndex += 4 * src.width; //move down
    }
    else if (randomDir == 3) {
        imageIndex -= 4;  // move left
    }

    //Updating RGB Values based on the imageIndex 
    let rVal = src.pixels[imageIndex + 0];
    let gVal = src.pixels[imageIndex + 1];
    let bVal = src.pixels[imageIndex + 2];

    //Not print this out because it is memory intensive
    // console.log(src.pixels[imageIndex + 0]);
    // console.log(src.pixels[imageIndex + 1]);
    // console.log(src.pixels[imageIndex + 2]);
    //console.log(src.pixels[imageIndex + 3]);

    osc.freq(map(rVal, 0, 255, 65, 500));
    osc2.freq(map(gVal, 0, 255, 65, 500));
    osc3.freq(map(bVal, 0, 255, 65, 500));


    //UI TEXT
    fill('white');
    textSize(25);
    text('VERSION 3:', 60, 60);

    textSize(50);
    text('MAZE THE MUSIC', 60, 120);


    textSize(25);
    text('R:' + rVal, 60, 180);
    text('G:' + gVal, 60, 220);
    text('B:' + bVal, 60, 260);


    // fill('white');
    // text('Bar Width:' + w, 150, 145);
    // textSize(15);

    // fill('white');
    // text('R:' + r, 150, 25);
    // textSize(15);

    // fill('white');
    // text('G:' + g, 150, 55);
    // textSize(15);

    // fill('white');
    // text('B:' + b, 150, 85);
    // textSize(15);

    // fill('white');
    // text('alpha:' + a, 150, 115);
    // textSize(15);




    src.pixels[imageIndex + 0] = 255;
    src.pixels[imageIndex + 1] = 255;
    src.pixels[imageIndex + 2] = 255;
    src.pixels[imageIndex + 3] = 255;
    src.updatePixels();
}


function mousePressed() {
    if (mouseX < 400 && mouseY < 300) {
        osc.stop();
    }
    else {
        if (osc.started) {
            osc.stop();
        }
        else {
            osc.start();
        }
        if (osc2.started) {
            osc2.stop();
        }
        else {
            osc.start();
        }

        if (osc3.started) {
            osc3.stop();
        }
        else {
            osc.start();
        }
    }
}

// Save the image when key pressed
function keyPressed() {
    if (key == 's' || key == 'S') {
        img.save('frame_' + frameCount, 'png');
    }
}