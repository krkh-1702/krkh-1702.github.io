function cloneImage(src) {

    src.loadPixels();
    let img = createImage(src.width, src.height);
    
    //Load pixel (from img to pixel)
    img.loadPixels();
    const totalpixels = img.width * img.height * 4;

    for (let x = 0; i < totalpixels; i++) {
        img.pixels[i] = src.pixels[i];//red
        img.pixels[i + 1] = src.pixels[i + 1];//blue
        img.pixels[i + 2] = src.pixels[i + 2];//green
        img.pixels[i + 3] = src.pixels[i + 3];//alpha
    }
    img.updatePixels();
    return img;
}

