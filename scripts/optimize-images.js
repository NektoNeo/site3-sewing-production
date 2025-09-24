const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Function to convert images to WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    console.log(`✅ Converted: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error);
  }
}

// Function to generate LQIP (Low Quality Image Placeholder)
async function generateLQIP(inputPath) {
  try {
    const buffer = await sharp(inputPath)
      .resize(10) // Very small size
      .blur()
      .toBuffer();

    const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    return base64;
  } catch (error) {
    console.error(`❌ Error generating LQIP for ${inputPath}:`, error);
    return null;
  }
}

// Main function to process images
async function processImages() {
  const directories = [
    'public/brand',
    'public/images',
    'public'
  ];

  const imageExtensions = ['.png', '.jpg', '.jpeg'];

  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!imageExtensions.includes(ext)) continue;

      const inputPath = path.join(dir, file);
      const stats = fs.statSync(inputPath);

      // Skip if it's a directory
      if (stats.isDirectory()) continue;

      const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

      // Check if WebP already exists
      if (!fs.existsSync(outputPath)) {
        await convertToWebP(inputPath, outputPath);

        // Generate LQIP
        const lqip = await generateLQIP(inputPath);
        if (lqip) {
          const lqipPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.lqip.txt');
          fs.writeFileSync(lqipPath, lqip);
          console.log(`📝 Generated LQIP: ${path.basename(lqipPath)}`);
        }
      } else {
        console.log(`⏭️  Skipping (already exists): ${path.basename(outputPath)}`);
      }
    }
  }

  console.log('\n✨ Image optimization complete!');
}

// Run the script
processImages().catch(console.error);