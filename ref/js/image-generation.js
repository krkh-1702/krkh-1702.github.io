// ███████╗ ██████╗ ██╗     ██╗██████╗ 
// ██╔════╝██╔═══██╗██║     ██║██╔══██╗
// ███████╗██║   ██║██║     ██║██║  ██║
// ╚════██║██║   ██║██║     ██║██║  ██║
// ███████║╚██████╔╝███████╗██║██████╔╝
// ╚══════╝ ╚═════╝ ╚══════╝╚═╝╚═════╝ 
//                                     
// ██╗███╗   ███╗ █████╗  ██████╗ ███████╗
// ██║████╗ ████║██╔══██╗██╔════╝ ██╔════╝
// ██║██╔████╔██║███████║██║  ███╗█████╗  
// ██║██║╚██╔╝██║██╔══██║██║   ██║██╔══╝  
// ██║██║ ╚═╝ ██║██║  ██║╚██████╔╝███████╗
// ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
//                                                                      

/**
 * Creates a solid color image. Uses p5.js get()/set() methods (slow). 
 * @param {Number} w Image width.
 * @param {Number} h Image height.
 * @param {Array} color Color in [R, G, B, A] format.
 * @returns p5.Image 
 */
function solidImageSlow(w, h, color) {
  // Create an empty image
  const img = createImage(w, h);

  // Load the pixels array
  img.loadPixels();

  // Go over all pixels in row/col order
  for (let col = 0; col < img.width; col++) {
    for (let row = 0; row < img.height; row++) {
      // Set the color of that pixel
      img.set(col, row, color);
    }
  }

  // Load the modified pixels back into the image
  img.updatePixels();

  // Return the image
  return img;
}


/**
 * Creates a solid color image. Uses p5.js pixel array method. 
 * @param {Number} w Image width.
 * @param {Number} h Image height.
 * @param {Array} color Color in [R, G, B, A] format.
 * @returns p5.Image 
 */
function solidImage(w, h, color) {
  // Create an empty image
  let img = createImage(w, h);

  // Calculate the total amount of pixels. 
  // Remember that each pixels is divided in 4 bytes: R, G, B, A.
  const totalPixels = 4 * img.width * img.height;

  // Load the pixels array
  img.loadPixels();

  // Iterate over all the bytes in the pixel array 
  // in consecutive RGBA order. 
  for (let i = 0; i < totalPixels; i += 4) {
    // Update each color byte independently
    img.pixels[i] = color[0];         // red
    img.pixels[i + 1] = color[1];     // green
    img.pixels[i + 2] = color[2];     // blue
    img.pixels[i + 3] = color[3];     // alpha
  }

  // Load the modified pixels back into the image
  img.updatePixels();

  // Return the image
  return img;
}


//  ██████╗ ██████╗  █████╗ ██████╗ ██╗███████╗███╗   ██╗████████╗███████╗
// ██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
// ██║  ███╗██████╔╝███████║██║  ██║██║█████╗  ██╔██╗ ██║   ██║   ███████╗
// ██║   ██║██╔══██╗██╔══██║██║  ██║██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
// ╚██████╔╝██║  ██║██║  ██║██████╔╝██║███████╗██║ ╚████║   ██║   ███████║
//  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
//                                                                        

/**
 * Create a grayscale gradient image.
 * @param {Number} w Image width
 * @param {Number} h Image height
 * @param {Number} min Min gray value
 * @param {Number} max Max gray value
 * @returns Grayscale image
 */
function gradientGrayImage(w, h, min, max) {
  // Initialize image
  let img = createImage(w, h);
  let totalPixels = 4 * img.width * img.height;
  img.loadPixels();

  // Create some temp variables for calculations
  let x, y, n, gray;
  let w4 = 4 * img.width;

  // Iterate over all the bytes in the pixel array 
  // in consecutive RGBA order. 
  for (let i = 0; i < totalPixels; i += 4) {
    // For this pixel i, compute it's xy location on the image
    x = (i / 4) % img.width;
    y = Math.floor(i / w4);

    // From 0.0 to 1.0, how far along x is this pixel?
    n = x / img.width;

    // Set a proportional gray value
    // gray = map(n, 0.0, 1.0, min, max);  // if using p5.js `map()`, remember to use the minified library to avoid argument type checks (super slow)
    gray = remap(n, 0.0, 1.0, min, max);  // alternatively, use your own lightweight mapping method

    // Set the pixel values
    img.pixels[i] = gray;       // red
    img.pixels[i + 1] = gray;   // green
    img.pixels[i + 2] = gray;   // blue
    img.pixels[i + 3] = 255;    // alpha
  }

  img.updatePixels();
  return img;
}

/**
 * Create a huescale gradient image.
 * @param {Number} w Image width
 * @param {Number} h Image height
 * @param {Number} min Min hue value
 * @param {Number} max Max hue value
 * @returns Huescale image
 */
function gradientHueImage(w, h, min, max) {
  // Initialize image
  let img = createImage(w, h);
  let totalPixels = 4 * img.width * img.height;
  img.loadPixels();

  // Create some temp variables for calculations
  let x, y, n, hue, rgba;
  let w4 = 4 * img.width;

  // Iterate over all the bytes in the pixel array 
  // in consecutive RGBA order. 
  for (let i = 0; i < totalPixels; i += 4) {
    // For this pixel i, compute it's xy location on the image
    x = (i / 4) % img.width;
    y = Math.floor(i / w4);

    // From 0.0 to 1.0, how far along x is this pixel?
    n = x / img.width;

    // Set a proportional hue value
    // hue = map(n, 0.0, 1.0, min, max);  // if using p5.js `map()`, remember to use the minified library to avoid argument type checks (super slow)
    hue = remap(n, 0.0, 1.0, min, max);  // alternatively, use your own lightweight mapping method

    // Covert to RGB
    rgba = HSBToRGB([hue, 100, 100, 100]);

    // Set the pixel values
    img.pixels[i] = rgba[0];       // red
    img.pixels[i + 1] = rgba[1];   // green
    img.pixels[i + 2] = rgba[2];   // blue
    img.pixels[i + 3] = rgba[3];   // alpha
  }

  img.updatePixels();
  return img;
}

/**
 * Create a gradient image between two colors. 
 * @param {Number} w Image width
 * @param {Number} h Image height
 * @param {Array} startColor Color array in RGBA/HSVA format
 * @param {Array} endColor Color array in RGBA/HSVA format
 * @param {String} mode 'rgb' (default) or 'hsv'
 * @returns p5.Image with the gradient
 */
function gradientColorImage(w, h, startColor, endColor, mode) {
  // Initialize image
  let img = createImage(w, h);
  let totalPixels = 4 * img.width * img.height;
  img.loadPixels();

  // Create some temp variables for calculations
  let x, y, n, hsv, rgba;
  let w4 = 4 * img.width;

  // Iterate over all the bytes in the pixel array 
  // in consecutive RGBA order. 
  for (let i = 0; i < totalPixels; i += 4) {
    // For this pixel i, compute it's xy location on the image
    x = (i / 4) % img.width;
    y = Math.floor(i / w4);

    // From 0.0 to 1.0, how far along x is this pixel?
    n = x / img.width;

    // Compute interpolated color based on mode
    if (mode == 'hsv') {
      // Assumes input colors are in HSV mode too
      hsv = lerpHSV(startColor, endColor, n);
      rgba = HSBToRGB(hsv);
    }
    else {
      rgba = lerpRGB(startColor, endColor, n);
    }

    // Set the pixel values
    img.pixels[i] = rgba[0];       // red
    img.pixels[i + 1] = rgba[1];   // green
    img.pixels[i + 2] = rgba[2];   // blue
    img.pixels[i + 3] = rgba[3];   // alpha
  }

  img.updatePixels();
  return img;
}

/**
 * Create a focal gradient between two points. 
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} x0 
 * @param {Number} y0 
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} factor Attenuation factor, typically < 1.0
 * @returns p5.Image
 */
function gradientFocalImage(w, h, x0, y0, x1, y1, factor = 1) {
  // Initialize image
  let img = createImage(w, h);
  let totalPixels = 4 * img.width * img.height;
  img.loadPixels();

  // Create some temp variables for calculations
  let x, y, n, d0, d1;
  let w4 = 4 * img.width;

  // Iterate over all the bytes in the pixel array 
  // in consecutive RGBA order. 
  for (let i = 0; i < totalPixels; i += 4) {
    // For this pixel i, compute it's xy location on the image
    x = (i / 4) % img.width;
    y = Math.floor(i / w4);

    // Calculate the distance from this pixel to each focal
    d0 = distance(x, y, x0, y0);
    d1 = distance(x, y, x1, y1);

    // Average them by a factor
    n = factor * (d0 + d1);

    // Set the pixel values
    img.pixels[i] = n;          // red
    img.pixels[i + 1] = n;      // green
    img.pixels[i + 2] = n;      // blue
    img.pixels[i + 3] = 255;    // alpha
  }

  img.updatePixels();
  return img;
}



// ██████╗  █████╗ ████████╗████████╗███████╗██████╗ ███╗   ██╗███████╗
// ██╔══██╗██╔══██╗╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗████╗  ██║██╔════╝
// ██████╔╝███████║   ██║      ██║   █████╗  ██████╔╝██╔██╗ ██║███████╗
// ██╔═══╝ ██╔══██║   ██║      ██║   ██╔══╝  ██╔══██╗██║╚██╗██║╚════██║
// ██║     ██║  ██║   ██║      ██║   ███████╗██║  ██║██║ ╚████║███████║
// ╚═╝     ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝
//    

/**
 * Create a pattern of vertical bands.
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} sizeX 
 * @returns 
 */
 function patternVerticalBandsImage(w, h, sizeX = 100) {
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
    gray = 127 * (1 + Math.cos(2 * Math.PI * x / sizeX));

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
 * @returns 
 */
function patternCheckersImage(w, h, sizeX = 1, sizeY = 1) {
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
