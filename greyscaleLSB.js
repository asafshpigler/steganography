const fs = require('fs');
const Jimp = require('jimp');

async function extractLSBsImage(inputImagePath, outputImagePath) {
  const image = await Jimp.read(inputImagePath);

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const r = image.bitmap.data[idx] & 0b00000011;
    const g = image.bitmap.data[idx + 1] & 0b00000011;
    const b = image.bitmap.data[idx + 2] & 0b00000011;
    const a = image.bitmap.data[idx + 3] & 0b00000011;

    // Set the pixel in the new image with only the LSBs
    image.setPixelColor(Jimp.rgbaToInt(r, g, b, a), x, y);
  });

  await image.writeAsync(outputImagePath);
  console.log(`LSBs-only image created and saved to ${outputImagePath}`);
}

// Usage
extractLSBsImage('output.png', 'extracted_lsb_image_encrypted.png');
