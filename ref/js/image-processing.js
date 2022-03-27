//  ██████╗██╗      ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║     ██╔═══██╗████╗  ██║██╔════╝
// ██║     ██║     ██║   ██║██╔██╗ ██║█████╗  
// ██║     ██║     ██║   ██║██║╚██╗██║██╔══╝  
// ╚██████╗███████╗╚██████╔╝██║ ╚████║███████╗
//  ╚═════╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
//                                            

/**
 * Returns a deep copy of the input image.
 * @param {p5.Image} src 
 * @returns 
 */
function cloneImage(src) {
  // Make sure that the input image has the pixels updated
  src.loadPixels();

  // Initialize image
  let img = createImage(src.width, src.width);
  let totalPixels = 4 * img.width * img.height;
  img.loadPixels();

  // Iterate over all the bytes in the pixel array 
  // in consecutive RGBA order. 
  for (let i = 0; i < totalPixels; i += 4) {
    // Copy pixel values one by one
    img.pixels[i] = src.pixels[i];
    img.pixels[i + 1] = src.pixels[i + 1];
    img.pixels[i + 2] = src.pixels[i + 2];
    img.pixels[i + 3] = src.pixels[i + 3];
  }

  img.updatePixels();
  return img;
}

/**
 * Returns the selected image channel as a grayscale image.
 * @param {p5.Image} src 
 * @param {String} channelLetter 
 * @returns 
 */
function extractChannel(src, channelLetter) {
  // Make sure that the input image has the pixels updated
  src.loadPixels();

  // Initialize image
  let img = createImage(src.width, src.width);
  let totalPixels = 4 * img.width * img.height;
  img.loadPixels();

  // Which channel to extract?
  const channels = {
    'r': 0,
    'R': 0,
    'g': 1,
    'G': 1,
    'b': 2,
    'B': 2,
  };
  const chId = channels[channelLetter];

  // Iterate over all the bytes in the pixel array 
  // in consecutive RGBA order. 
  for (let i = 0; i < totalPixels; i += 4) {
    // Copy pixel values from the corresponding channel
    img.pixels[i] = src.pixels[i + chId];
    img.pixels[i + 1] = src.pixels[i + chId];
    img.pixels[i + 2] = src.pixels[i + chId];
    img.pixels[i + 3] = 255;  // force full opacity
  }

  img.updatePixels();
  return img;
}
