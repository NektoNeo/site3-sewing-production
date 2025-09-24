const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Function to create gradient image with text
function createTechImage(name, colors, outputPath) {
  const width = 1920;
  const height = 1080;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.5, colors[1]);
  gradient.addColorStop(1, colors[2]);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add pattern overlay
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < width; i += 40) {
    for (let j = 0; j < height; j += 40) {
      ctx.beginPath();
      ctx.arc(i + 20, j + 20, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;

  // Add text
  ctx.font = 'bold 120px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.fillText(name, width / 2, height / 2);

  // Save image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images/tech');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate images
const techImages = [
  {
    name: 'DTF ПЕЧАТЬ',
    colors: ['#8B5CF6', '#EC4899', '#F59E0B'],
    file: 'dtf.webp'
  },
  {
    name: 'ВЫШИВКА',
    colors: ['#3B82F6', '#10B981', '#6366F1'],
    file: 'embroidery.webp'
  },
  {
    name: 'СУБЛИМАЦИЯ',
    colors: ['#F59E0B', '#EF4444', '#EC4899'],
    file: 'sublimation.webp'
  }
];

techImages.forEach(img => {
  createTechImage(
    img.name,
    img.colors,
    path.join(imagesDir, img.file.replace('.webp', '.png'))
  );
});