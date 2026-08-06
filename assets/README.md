# Assets Directory

## Required Images

### App Icon (Tulip Theme)
Please add the following files with a **clean tulip logo** (black edges removed, transparent background):

1. **Main Icon** (1024x1024 PNG, transparent background)
   - `icon.png` - Used for app icon, should be square with clean edges
   
2. **Android Adaptive Icon** (1024x1024 PNG)
   - `adaptive-icon.png` - Foreground layer for Android adaptive icons
   
3. **Splash Screen** (1284x2778 PNG for iPhone 11, or 1242x2436 for older iPhones)
   - `splash.png` - Should feature the tulip prominently on dark background
   
4. **Web Favicon** (48x48 PNG)
   - `favicon.png` - Small version of the tulip logo

### Source Image
- `logo-tulip.png` - Original tulip image (will be processed)

## Image Preparation Guide

### To Remove Black Edges:

**Option 1: Using Photoshop**
1. Open `logo-tulip.png` in Photoshop
2. Select the tulip using: Select → Subject (AI-powered selection)
3. Add a layer mask to remove background
4. Export as PNG with transparency

**Option 2: Using GIMP (Free)**
1. Open in GIMP
2. Use Fuzzy Select Tool (Magic Wand) to select black background
3. Delete the selection
4. Add alpha channel if needed (Layer → Transparency → Add Alpha Channel)
5. Export as PNG

**Option 3: Online Tools**
- [remove.bg](https://www.remove.bg/) - AI-powered background removal
- [Adobe Express](https://www.adobe.com/express/feature/image/remove-background) - Free background remover
- [Canva](https://www.canva.com/background-remover/) - Easy online tool

### Recommended Tulip Logo Style:
- **Color**: Soft pink or white tulip (matches our love theme)
- **Style**: Elegant, simple silhouette
- **Background**: Transparent (PNG)
- **Edges**: Smooth, no jagged pixels
- **Optional**: Subtle glow or gradient effect

### Icon Sizes for Different Platforms:
- **iOS**: 1024x1024 (App Store requires this)
- **Android**: 1024x1024 (Adaptive icon foreground)
- **Web**: 48x48 (favicon), 192x192 (PWA icon)
- **Splash**: Minimum 1242x2436 (iPhone 8+), 1284x2778 recommended

## Color Palette Integration

To match our app theme, consider these colors for your tulip:
- **Love Pink**: `#e94560` - Primary accent color
- **Soft Pink**: `#f472b6` - Lighter variant
- **White**: `#ffffff` - Clean and elegant
- **Gold**: `#ffd700` - For highlights
- **Purple**: `#8b5cf6` - Secondary accent

Background for splash should be: `#1a1a2e` (deep navy)

## Naming Convention
Please follow these exact filenames:
- `icon.png` (1024x1024)
- `adaptive-icon.png` (1024x1024)
- `splash.png` (1284x2778 or similar aspect ratio)
- `favicon.png` (48x48)
- `logo-tulip.png` (original source file)

Once you add these files, the app will automatically use them!
