// A variable that we will use to store processed images
let src, src2, img;

let slider1, slider2, slider3, slider4, slider5, slider6;
let osc, osc2, osc3;
let sel1, sel2, sel3;
let button;
let toggle = false;

let time = 1;
let fr = 50;
let counter = 0;
let imageIndex = 0;

// let m = 0;
// let n = 0;

// Run once before start.
// Most static image heavy-lifting should go here.

function setup() {
    //frameRate(fr);


    // Create a fullscreen canvas
    createCanvas(windowWidth, windowHeight);
    textFont('Share Tech');


    //RVal
    slider1 = createSlider(0, 255);
    slider1.position(200, 170);

    //WVal
    slider5 = createSlider(0, 1000);
    slider5.position(200, 200);

    //GVal
    slider2 = createSlider(0, 255);
    slider2.position(200, 230);

    //BVal
    slider3 = createSlider(0, 255);
    slider3.position(200, 260);

    //AVal
    slider4 = createSlider(0, 255);
    slider4.position(200, 290);

    //frameVal
    slider6 = createSlider(1, 60);
    slider6.position(200, 320);


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

}



// Run every frame
function draw() {

    let r = slider1.value();
    let g = slider2.value();
    let b = slider3.value();
    let a = slider4.value();
    let w = slider5.value();

    let frSlider = slider6.value();
    frameRate(frSlider);

    src = mathPatternDanny(width, height, w, r, g, b, a);
    src.loadPixels();

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


    // imageIndex = src.pixels.length / 2;
    imageIndex += 4;


    let rVal = src.pixels[imageIndex + 0];
    let gVal = src.pixels[imageIndex + 1];
    let bVal = src.pixels[imageIndex + 2];


    osc.freq(map(rVal, 0, 255, 65, 500));
    osc2.freq(map(gVal, 0, 255, 65, 500));
    osc3.freq(map(bVal, 0, 255, 65, 500));

    //UI TEXT
    //Main heading
    fill('white');
    textSize(25);
    text('VERSION 2:', 60, 60);

    textSize(50);
    text('FRAME THE MUSIC', 60, 120);

    //Frame values
    textSize(25);
    text('R:' + rVal, 60, 180);
    text('G:' + gVal, 60, 220);
    text('B:' + bVal, 60, 260);

    textSize(25);
    text('Gradient 1:' + r, 335, 180);
    text('Gradient 2:' + w, 335, 210);
    text('Pattern:' + g, 335, 240);
    text('Bar Presence:' + b, 335, 270);
    text('Bar Density:' + a, 335, 300);
    text('Speed:' + frSlider, 335, 330);


    src.pixels[imageIndex + 0] = 255;
    src.pixels[imageIndex + 1] = 255;
    src.pixels[imageIndex + 2] = 255;
    src.pixels[imageIndex + 3] = 255;
    src.updatePixels();
}


// function toggleValue() {
//     if (mousePressed(toggle) = false) {
//         toggle = true;
//         osc.start();
//     } else {
//         toggle = false;
//         osc.stop();
//     }
// }


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