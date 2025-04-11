/**
 * This script provides utility functions to convert between base64 strings and image files.
 * It will compress images to ensure the base64 string is not too large.
 *
 * Usage:
 *   node convertImage.js toBase64 <imagePath>
 *   node convertImage.js fromBase64 <base64FilePath> <outputImagePath>
 */

const fs = require('fs');
const sharp = require('sharp');

// Convert base64 string
function base64ToImage(base64Str, outputPath) {
    const base64Data = base64Str.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Image saved to ${outputPath}`);
}

// Convert image to base64 string
async function imageToBase64(imagePath) {
    const imageData = await sharp(imagePath)
        .resize({ width: 640 })
        .rotate() // Prevent rotation by disabling EXIF orientation handling
        .toBuffer();
    const base64Str = imageData.toString('base64');
    return `data:image/${getImageExtension(imagePath)};base64,${base64Str}`;
}

function getImageExtension(imagePath) {
    return imagePath.split('.').pop();
}

// CLI interface
if (require.main === module) {
    const [,, command, inputPath, outputPath] = process.argv;

    if (command === 'toBase64' && inputPath) {
        imageToBase64(inputPath).then(console.log);
    } else if (command === 'fromBase64' && inputPath && outputPath) {
        const base64Str = fs.readFileSync(inputPath, 'utf8');
        base64ToImage(base64Str, outputPath);
    } else {
        console.log('Usage:');
        console.log('  node convertImage.js toBase64 <imagePath>');
        console.log('  node convertImage.js fromBase64 <base64FilePath> <outputImagePath>');
    }
}

module.exports = {
    base64ToImage,
    imageToBase64
};
