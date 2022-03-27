
// ██████╗  █████╗ ████████╗████████╗███████╗██████╗ ███╗   ██╗███████╗
// ██╔══██╗██╔══██╗╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗████╗  ██║██╔════╝
// ██████╔╝███████║   ██║      ██║   █████╗  ██████╔╝██╔██╗ ██║███████╗
// ██╔═══╝ ██╔══██║   ██║      ██║   ██╔══╝  ██╔══██╗██║╚██╗██║╚════██║
// ██║     ██║  ██║   ██║      ██║   ███████╗██║  ██║██║ ╚████║███████║
// ╚═╝     ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝
//
/**
 * Generate a checker pattern image.
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} sizeX 
 * @param {Number} sizeY 
 * @returns 
 */
function grayCheckersImage(w, h, sizeX = 1, sizeY = 1) {
    // Initialize image
    let img = createImage(w, h);
    let totalPixels = 4 * img.width * img.height;
    img.loadPixels();

    // Create some temp variables for calculations
    let x, y, bit, gray;
    let w4 = 4 * img.width;

    // Iterate over all the bytes in the pixel array 
    // in consecutive RGBA order. 
    for (let i = 0; i < totalPixels; i += 4) {
        // For this pixel i, compute it's xy location on the image
        x = (i / 4) % img.width;
        y = Math.floor(i / w4);


        //----Black & White----
        // Based on XY location, should this pixel be on?
        bit = Math.floor(x / sizeX) + Math.floor(y / sizeY);
        if (bit % 2 == 0) {
            gray = 0;
        } else {
            gray = 255;
        }

        // Set the pixel values  
        img.pixels[i] = gray;          // red
        img.pixels[i + 1] = gray;      // green
        img.pixels[i + 2] = gray;      // blue
        img.pixels[i + 3] = 255;    // alpha

    }

    img.updatePixels();
    return img;
}



/**
 * Generate a checker pattern image.
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} sizeX 
 * @param {Number} sizeY 
 * @param {Array} color Color in [R, G, B, A] format.
 * @returns 
 */
function colorCheckersImage(w, h, sizeX = 1, sizeY = 1, color) {
    // Initialize image
    let img = createImage(w, h);
    let totalPixels = 4 * img.width * img.height;
    img.loadPixels();

    // Create some temp variables for calculations
    let x, y, bit, gray;
    let w4 = 4 * img.width;

    // Iterate over all the bytes in the pixel array
    // in consecutive RGBA order. 

    for (let i = 0; i < totalPixels; i += 4) {
        // For this pixel i, compute it's xy location on the image
        x = (i / 4) % img.width;
        y = Math.floor(i / w4);


        //----Color----
        bit = Math.floor(x / sizeX) + Math.floor(y / sizeY);
        if (bit % 2 == 0) {
            color[1] = 0;
        } else {
            color[1] = 255;
        }

        img.pixels[i] = color[0];          // red
        img.pixels[i + 1] = color[1];      // green
        img.pixels[i + 2] = color[2];      // blue
        img.pixels[i + 3] = color[3];    // alpha
    }

    img.updatePixels();
    return img;
}

/**
 * Create a pattern of vertical bands.
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} sizeX 
 * @param {Array} color Color in [R, G, B, A] format.
 * @returns 
 */
function colorVerticalBandsImage(w, h, sizeX = 100, color) {
    // Initialize image
    let img = createImage(w, h);
    let totalPixels = 4 * img.width * img.height;
    img.loadPixels();

    // Create some temp variables for calculations
    let x, y, gray;
    let w4 = 4 * img.width;

    // Iterate over all the bytes in the pixel array 
    // in consecutive RGBA order. 
    for (let i = 0; i < totalPixels; i += 4) {
        // For this pixel i, compute it's xy location on the image
        x = (i / 4) % img.width;
        y = Math.floor(i / w4);

        // Based on X location, calculate the value of gray
        color[0] = 127 * (1 + Math.cos(2 * Math.PI * x / sizeX));
        //color[1] = 127 * (1 + Math.cos(2 * Math.PI * x / sizeX));


        // Set the pixel values
        img.pixels[i] = color[0];          // red
        img.pixels[i + 1] = color[1];      // green
        img.pixels[i + 2] = color[2];      // blue
        img.pixels[i + 3] = color[3];    // alpha
    }

    img.updatePixels();
    return img;
}


/**
 * Create a pattern of vertical bands.
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} sizeX 
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d  
 * @returns 
 */
function mathPatternDanny(w, h, sizeX, a, b, c, d) {
    // Initialize image
    let img = createImage(w, h);
    img.loadPixels();
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let index = (x + y * img.width) * 4;
            img.pixels[index + 0] = (0.033 * y) + (0.33 * Math.sin(y * x)) / (y * x - a / 23 * (b / 18) / 333) + (a + Math.sin(x * a));
            img.pixels[index + 1] = 0.333 * sizeX + Math.cos(y) + (y / b) * 6 / x * y * Math.cos(4 + y * x * b);
            img.pixels[index + 2] = x * (-Math.sin(a + 0.033 * d * x)) + (0.333 * c * 20 + Math.sin(b * y));
            img.pixels[index + 3] = 255;
        }
    }
    img.updatePixels();
    return img;
}

function colorVerticalBandsImage(w, h, sizeX = 100, color) {
    // Initialize image
    let img = createImage(w, h);
    let totalPixels = 4 * img.width * img.height;
    img.loadPixels();

    // Create some temp variables for calculations
    let x, y, gray;
    let w4 = 4 * img.width;

    // Iterate over all the bytes in the pixel array 
    // in consecutive RGBA order. 
    for (let i = 0; i < totalPixels; i += 4) {
        // For this pixel i, compute it's xy location on the image
        x = (i / 4) % img.width;
        y = Math.floor(i / w4);

        // Based on X location, calculate the value of gray
        color[0] =
            color[1] =


            // Set the pixel values
            img.pixels[i] = color[0];          // red
        img.pixels[i + 1] = color[1];      // green
        img.pixels[i + 2] = color[2];      // blue
        img.pixels[i + 3] = color[3];    // alpha
    }

    img.updatePixels();
    return img;
}


// function whitePixelTracker(w, h) {
//     // Initialize image
//     let img = createImage(w, h);
//     // let totalPixels = 4 * img.width * img.height;
//     img.loadPixels();

//     // Iterate over all the bytes in the pixel array
//     // in consecutive RGBA order.
//     for (let x = 0; x < img.width; x++) {
//         for (let y = 0; y < img.heigtht; y++){
//             R
//         }


//     }

//     img.updatePixels();
//     return img;
// }





function imageIndex2(img, x, y) {
    return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
    let idx = imageIndex2(img, x, y);
    let pix = img.pixels;
    let red = pix[idx];
    let green = pix[idx + 1];
    let blue = pix[idx + 2];
    let alpha = pix[idx + 3];
    return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
    let idx = imageIndex2(img, x, y);

    let pix = img.pixels;
    pix[idx] = red(clr);
    pix[idx + 1] = green(clr);
    pix[idx + 2] = blue(clr);
    pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
    return round(steps * value / 255) * floor(255 / steps);
}


function makeDithered(img, steps) {
    img.loadPixels();

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let clr = getColorAtindex(img, x, y);
            let oldR = red(clr);
            let oldG = green(clr);
            let oldB = blue(clr);
            let newR = closestStep(255, steps, oldR);
            let newG = closestStep(255, steps, oldG);
            let newB = closestStep(255, steps, oldB);

            let newClr = color(newR, newG, newB);
            setColorAtIndex(img, x, y, newClr);

            let errR = oldR - newR;
            let errG = oldG - newG;
            let errB = oldB - newB;

            distributeError(img, x, y, errR, errG, errB);
        }
    }

    img.updatePixels();
}
function getColorAtindex(img, x, y) {
    let idx = imageIndex2(img, x, y);
    let pix = img.pixels;
    let red = pix[idx];
    let green = pix[idx + 1];
    let blue = pix[idx + 2];
    let alpha = pix[idx + 3];
    return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
    let idx = imageIndex2(img, x, y);

    let pix = img.pixels;
    pix[idx] = red(clr);
    pix[idx + 1] = green(clr);
    pix[idx + 2] = blue(clr);
    pix[idx + 3] = alpha(clr);
}

function distributeError(img, x, y, errR, errG, errB) {
    addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
    addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
    addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
    addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
    if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
    let clr = getColorAtindex(img, x, y);
    let r = red(clr);
    let g = green(clr);
    let b = blue(clr);
    clr.setRed(r + errR * factor);
    clr.setGreen(g + errG * factor);
    clr.setBlue(b + errB * factor);

    setColorAtIndex(img, x, y, clr);
}