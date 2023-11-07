const fs = require('fs');
const Jimp = require('jimp');

async function decryptTextFromImage(imagePath, outputPath) {
  const image = await Jimp.read(imagePath);
  let textData = '';

  for (let y = 0; y < image.getHeight(); y++) {
    for (let x = 0; x < image.getWidth(); x++) {
      const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));

      // Extract the two least significant bits from each channel and combine them to recover the character
      const char = (
        (pixel.r & 0b00000011) << 6 |
        (pixel.g & 0b00000011) << 4 |
        (pixel.b & 0b00000011) << 2 |
        (pixel.a & 0b00000011)
      );

      textData += String.fromCharCode(char);
    }
  }

  fs.writeFileSync(outputPath, textData, 'utf-8'); // Specify utf-8 encoding for human-readable text

  console.log(`Text data successfully decrypted and saved to ${outputPath}`);
}

// Usage
decryptTextFromImage('output.png', 'recovered_text.txt');
