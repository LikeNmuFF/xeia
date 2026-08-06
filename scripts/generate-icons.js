/**
 * Icon Generation Script
 * 
 * This script helps generate multiple icon sizes from a source image.
 * Requires Node.js and the 'sharp' package.
 * 
 * Installation:
 *   npm install sharp -D
 * 
 * Usage:
 *   node scripts/generate-icons.js
 * 
 * This will create all required icon sizes from assets/logo-tulip.png
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const SOURCE_FILE = path.join(ASSETS_DIR, 'logo-tulip.png');

// Icon sizes to generate
const ICON_SIZES = [
  { name: 'favicon.png', width: 48, height: 48 },
  { name: 'icon.png', width: 1024, height: 1024 },
  { name: 'adaptive-icon.png', width: 1024, height: 1024 },
];

// Splash screen size (maintain aspect ratio)
const SPLASH_SIZE = { width: 1284, height: 2778 };

async function generateIcons() {
  console.log('🎨 Generating app icons from logo-tulip.png...\n');

  // Check if source file exists
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error('❌ Source file not found: assets/logo-tulip.png');
    console.log('   Please add your tulip logo to assets/logo-tulip.png first');
    process.exit(1);
  }

  try {
    // Create assets directory if it doesn't exist
    if (!fs.existsSync(ASSETS_DIR)) {
      fs.mkdirSync(ASSETS_DIR, { recursive: true });
    }

    // Generate each icon size
    for (const size of ICON_SIZES) {
      const outputPath = path.join(ASSETS_DIR, size.name);
      
      console.log(`📄 Generating ${size.name} (${size.width}x${size.height})...`);
      
      await sharp(SOURCE_FILE)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent
        })
        .png()
        .toFile(outputPath);
      
      console.log(`   ✅ Created: ${outputPath}`);
    }

    // Generate splash screen (center the logo on dark background)
    const splashPath = path.join(ASSETS_DIR, 'splash.png');
    console.log(`\n📄 Generating splash.png (${SPLASH_SIZE.width}x${SPLASH_SIZE.height})...`);
    
    await sharp({
      create: {
        width: SPLASH_SIZE.width,
        height: SPLASH_SIZE.height,
        channels: 4,
        background: { r: 26, g: 26, b: 46, alpha: 1 } // #1a1a2e
      }
    })
      .composite([
        {
          input: SOURCE_FILE,
          gravity: 'center',
        }
      ])
      .png()
      .toFile(splashPath);
    
    console.log(`   ✅ Created: ${splashPath}`);

    // Clean up placeholder files
    const placeholders = [
      'icon.png.placeholder',
      'adaptive-icon.png.placeholder',
      'splash.png.placeholder',
      'favicon.png.placeholder',
    ];
    
    console.log('\n🧹 Cleaning up placeholder files...');
    for (const placeholder of placeholders) {
      const placeholderPath = path.join(ASSETS_DIR, placeholder);
      if (fs.existsSync(placeholderPath)) {
        fs.unlinkSync(placeholderPath);
        console.log(`   ✅ Removed: ${placeholder}`);
      }
    }

    console.log('\n✅ All icons generated successfully!');
    console.log('\nNext steps:');
    console.log('1. Check the generated files in assets/');
    console.log('2. Verify the images look good (especially transparency)');
    console.log('3. Run: npx expo start');
    console.log('\nIf the images have black edges, you need to:');
    console.log('- Edit the source logo-tulip.png to remove black background');
    console.log('- Use an image editor or online tool like remove.bg');
    console.log('- Save as PNG with transparency');
    console.log('- Then re-run this script');

  } catch (error) {
    console.error('\n❌ Error generating icons:', error);
    process.exit(1);
  }
}

// Run the script
generateIcons();
