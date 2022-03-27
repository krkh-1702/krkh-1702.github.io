


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