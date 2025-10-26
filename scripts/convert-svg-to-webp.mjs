import sharp from 'sharp';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'images', 'tech');

const files = [
  { input: 'dtf-temp.svg', output: 'dtf.webp' },
  { input: 'embroidery-temp.svg', output: 'embroidery.webp' },
  { input: 'sublimation-temp.svg', output: 'sublimation.webp' },
];

async function convertSvgToWebp() {
  for (const file of files) {
    try {
      const inputPath = join(publicDir, file.input);
      const outputPath = join(publicDir, file.output);

      console.log(`Converting ${file.input} → ${file.output}...`);

      await sharp(inputPath, { density: 150 })
        .resize(400, 300)
        .webp({ quality: 85 })
        .toFile(outputPath);

      console.log(`✓ ${file.output} created successfully`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file.input}:`, error.message);
    }
  }

  console.log('\nAll conversions completed!');
}

convertSvgToWebp();
