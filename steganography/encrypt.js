const fs = require('fs');
const Jimp = require('jimp');

async function encryptTextInImage(imagePath, textPath, outputPath) {
  const image = await Jimp.read(imagePath);
  const textData = fs.readFileSync(textPath, 'utf8');

  let charIndex = 0;

  for (let y = 0; y < image.getHeight(); y++) {
    for (let x = 0; x < image.getWidth(); x++) {
      const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
      
      if (charIndex < textData.length) {
        const char = textData.charCodeAt(charIndex);

        // Modify the two least significant bits of each channel
        pixel.r = (pixel.r & 0b11111100) | (char >> 6);
        pixel.g = (pixel.g & 0b11111100) | ((char >> 4) & 0b00000011);
        pixel.b = (pixel.b & 0b11111100) | ((char >> 2) & 0b00000011);
        pixel.a = (pixel.a & 0b11111100) | (char & 0b00000011);

        // Update the pixel in the image
        image.setPixelColor(Jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, pixel.a), x, y);

        charIndex++;
      } else {
        break;
      }
    }
  }

  await image.writeAsync(outputPath);
}

// Usage
encryptTextInImage('input.png', 'text.txt', 'output.png');
