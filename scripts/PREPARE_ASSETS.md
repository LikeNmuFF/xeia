# Preparing App Assets - Tulip Theme

## Quick Start

Since Erica loves tulips, we're using a beautiful tulip as the app logo and icon. Here's how to prepare the assets:

## Step 1: Prepare Your Tulip Image

### Option A: If you have `logo-tulip.png` with black edges

**Remove the black background:**

1. **Online (Easiest):**
   - Go to [remove.bg](https://www.remove.bg/)
   - Upload your `logo-tulip.png`
   - Download the result with transparent background
   - Save as `logo-tulip.png` in the `assets/` folder

2. **Using Photoshop:**
   - Open the image
   - Select → Subject (AI will select the tulip)
   - Layer → Layer Mask → Reveal Selection
   - File → Export → Export As → PNG, check "Transparency"

3. **Using GIMP (Free):**
   - Open the image
   - Layer → Transparency → Add Alpha Channel
   - Select black background with Fuzzy Select Tool
   - Press Delete
   - File → Export As → PNG, check "Save background color"

### Option B: Find a tulip image online

Search for:
- "tulip silhouette png"
- "tulip logo transparent"
- "pink tulip icon"

Recommended sites:
- [Flaticon](https://www.flaticon.com/) - Free icons
- [Pngtree](https://pngtree.com/) - Free PNG images
- [Freepik](https://www.freepik.com/) - Free vectors

**Choose a tulip that:**
- Has a clean, elegant shape
- Is recognizable as a tulip
- Matches our romantic theme
- Works well in pink/white colors

## Step 2: Create Required Assets

Once you have your clean tulip image (`logo-tulip.png`), create these files:

### 1. App Icon - `assets/icon.png`
- **Size:** 1024x1024 pixels
- **Format:** PNG with transparency
- **Design:** Centered tulip, solid color (pink or white)
- **Tool:** Use an image editor or online resizer

### 2. Android Adaptive Icon - `assets/adaptive-icon.png`
- **Size:** 1024x1024 pixels
- **Format:** PNG with transparency
- **Note:** Can be the same as icon.png
- The background color is set to `#1a1a2e` in the app config

### 3. Splash Screen - `assets/splash.png`
- **Size:** 1284x2778 pixels (or similar iPhone resolution)
- **Format:** PNG
- **Background:** `#1a1a2e` (deep navy) or gradient
- **Design:** Large tulip in the center, optional "Xeia" text below

### 4. Web Favicon - `assets/favicon.png`
- **Size:** 48x48 pixels (or larger, will be resized)
- **Format:** PNG with transparency
- **Design:** Simple tulip silhouette, no details

## Step 3: Recommended Design

### Color Palette (Match our app theme):
```
Primary:   #e94560  (Love Pink)
Secondary: #f472b6  (Soft Pink)
Accent:    #ffd700  (Gold)
Dark:      #8b5cf6  (Purple)
Background: #1a1a2e  (Deep Navy)
White:     #ffffff
```

### Tulip Logo Ideas:

1. **Simple Silhouette** (Recommended)
   - Single color tulip shape
   - No stem (cleaner look)
   - Symmetrical design
   - Color: `#e94560` or `#ffffff`

2. **Elegant Outline**
   - White tulip with pink outline
   - Subtle glow effect
   - Color: `#ffffff` with `#e94560` stroke

3. **Gradient Tulip**
   - Gradient from `#e94560` to `#8b5cf6`
   - Smooth color transition
   - Modern look

4. **Tulip with Text**
   - Tulip icon + "Xeia" text
   - For splash screen only
   - Text color: `#ffffff` or `#e94560`

## Step 4: Online Tools to Help

### Background Removal:
- [remove.bg](https://www.remove.bg/) - AI-powered, 1-click
- [Adobe Express](https://www.adobe.com/express/feature/image/remove-background) - Free, high quality
- [Canva](https://www.canva.com/background-remover/) - Easy to use
- [PhotoRoom](https://www.photoroom.com/) - Mobile-friendly

### Image Resizing:
- [resizeimage.net](https://resizeimage.net/) - Simple online resizer
- [tinypng.com](https://tinypng.com/) - Compress & resize
- [ezgif.com](https://ezgif.com/resize) - Precise sizing

### Color Adjustment:
- [photopea.com](https://www.photopea.com/) - Free Photoshop alternative
- [pixlr.com](https://pixlr.com/) - Online image editor
- [canva.com](https://www.canva.com/) - Easy color changes

## Step 5: Final Checklist

- [ ] `assets/logo-tulip.png` - Original source file (transparent background)
- [ ] `assets/icon.png` - 1024x1024, transparent
- [ ] `assets/adaptive-icon.png` - 1024x1024, transparent
- [ ] `assets/splash.png` - 1284x2778, with `#1a1a2e` background
- [ ] `assets/favicon.png` - 48x48, transparent

## Step 6: Test Your Assets

After adding the files, run:
```bash
npx expo start
```

Check:
- App icon shows correctly on your device/emulator
- Splash screen displays properly
- Favicon appears in web browser
- No black edges or artifacts

## Alternative: Use the Script

If you have Node.js installed, you can use the automated script:

```bash
# Install dependencies
npm install sharp -D

# Add your logo-tulip.png to assets/
# Then run:
node scripts/generate-icons.js
```

This will automatically:
- Create icon.png, adaptive-icon.png, favicon.png, splash.png
- Remove black backgrounds
- Center the logo on splash screen
- Clean up placeholder files

## Need Help?

If you're not sure about image editing, I can:
1. Suggest specific tulip images to download
2. Provide more detailed step-by-step instructions
3. Help you find the perfect tulip design

Just let me know what you need! 🌷
