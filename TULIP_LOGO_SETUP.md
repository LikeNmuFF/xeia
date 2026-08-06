# 🌷 Tulip Logo Setup for Xeia App

Since Erica loves tulips, we're customizing the app with a beautiful tulip logo! Here's everything you need to know.

## Quick Summary

**Goal:** Replace the default app icon and splash screen with a beautiful tulip logo that has clean edges (no black background).

**What's Needed:** 4 image files in the `assets/` folder

**Time Required:** 5-15 minutes (depending on image editing experience)

---

## 📁 Required Files

| File | Size | Purpose | Background |
|------|------|---------|------------|
| `assets/icon.png` | 1024×1024 | App icon (iOS/Android) | Transparent |
| `assets/adaptive-icon.png` | 1024×1024 | Android adaptive icon | Transparent |
| `assets/splash.png` | 1284×2778 | Splash screen | `#1a1a2e` (dark) |
| `assets/favicon.png` | 48×48 | Web favicon | Transparent |

---

## 🎨 Option 1: Easiest - Use Online Tools (Recommended)

### Step 1: Remove Black Background

1. Go to **[remove.bg](https://www.remove.bg/)**
2. Upload your `logo-tulip.png`
3. It will automatically remove the background
4. Download the result (PNG with transparency)
5. Save it as `assets/logo-tulip.png`

*Alternative tools:*
- [Adobe Express Background Remover](https://www.adobe.com/express/feature/image/remove-background)
- [Canva Background Remover](https://www.canva.com/background-remover/)

### Step 2: Resize Images

Use **[resizeimage.net](https://resizeimage.net/)** or **[ezgif.com/resize](https://ezgif.com/resize)**:

1. **icon.png & adaptive-icon.png:**
   - Upload your clean tulip
   - Resize to 1024×1024
   - Keep aspect ratio: ON
   - Download as PNG
   - Save both as `icon.png` and `adaptive-icon.png`

2. **favicon.png:**
   - Upload your clean tulip
   - Resize to 48×48
   - Download as PNG
   - Save as `favicon.png`

3. **splash.png:**
   - Create a new image: 1284×2778 pixels
   - Fill with color: `#1a1a2e` (deep navy)
   - Add your tulip in the center
   - Save as `splash.png`

*Alternative:* Use **[Canva](https://www.canva.com/)** to create the splash screen with a nice layout.

---

## 🎨 Option 2: Semi-Automated (Requires Node.js)

If you have Node.js installed:

```bash
# Install the image processing tool
npm install sharp -D

# Copy your tulip to assets/
# Make sure it's named: logo-tulip.png
# (with black background already removed)

# Run the generation script
node scripts/generate-icons.js
```

This will automatically:
- ✅ Create all 4 required files
- ✅ Maintain transparency
- ✅ Center the logo on splash screen
- ✅ Use the correct sizes
- ✅ Clean up placeholder files

---

## 🎨 Option 3: Manual - Use Image Editor

### Photoshop:
1. Open your tulip image
2. Select → Subject (AI selects the tulip)
3. Layer → Layer Mask → Reveal Selection
4. File → Export → Export As → PNG
5. Check "Transparency"
6. Resize as needed

### GIMP (Free):
1. Open your tulip image
2. Layer → Transparency → Add Alpha Channel
3. Select black background with Fuzzy Select Tool
4. Press Delete
5. File → Export As → PNG
6. Check "Save background color"
7. Resize as needed

---

## 🌈 Recommended Tulip Design

To match our romantic app theme, consider these styles:

### Style 1: Simple Silhouette (Recommended) ⭐
- Single solid color
- No stem or leaves
- Clean, symmetrical shape
- **Color:** `#e94560` (Love Pink) or `#ffffff` (White)

### Style 2: Elegant Outline
- White tulip with pink outline
- **Colors:** Fill `#ffffff`, Stroke `#e94560`

### Style 3: Gradient
- Gradient from `#e94560` to `#8b5cf6`
- Modern, eye-catching look

### Style 4: With Text (Splash Only)
- Tulip + "Xeia" text below
- **Text color:** `#ffffff` or `#e94560`

---

## 🎯 Color Palette

Use these colors to match our app theme:

| Name | Hex Code | Use For |
|------|----------|---------|
| Love Pink | `#e94560` | Primary tulip color |
| Soft Pink | `#f472b6` | Lighter variant |
| White | `#ffffff` | Clean, elegant |
| Gold | `#ffd700` | Highlights/accents |
| Purple | `#8b5cf6` | Secondary color |
| Deep Navy | `#1a1a2e` | Backgrounds |

---

## 📋 Checklist

- [ ] Start with a tulip image (PNG recommended)
- [ ] Remove black/white background
- [ ] Save with transparent background as `logo-tulip.png`
- [ ] Create `icon.png` (1024×1024)
- [ ] Create `adaptive-icon.png` (1024×1024)
- [ ] Create `splash.png` (1284×2778 on `#1a1a2e` background)
- [ ] Create `favicon.png` (48×48)
- [ ] Delete placeholder files
- [ ] Test with `npx expo start`

---

## 🚀 Where to Find Tulip Images

If you don't have a tulip image yet, try these **free** resources:

### Icons (SVG/PNG):
- [Flaticon - Tulip Icons](https://www.flaticon.com/free-icons/tulip)
- [Iconfinder - Tulip](https://www.iconfinder.com/search?q=tulip)
- [Freepik - Tulip Vectors](https://www.freepik.com/free-vector/tulip_*)

### Photos:
- [Unsplash - Tulip Photos](https://unsplash.com/s/photos/tulip)
- [Pexels - Tulip](https://www.pexels.com/search/tulip/)
- [Pixabay - Tulip](https://pixabay.com/images/search/tulip/)

**Tip:** Search for "tulip silhouette" or "tulip line art" for clean, simple designs.

---

## ✅ Once You're Done

After adding the files, simply run:

```bash
npx expo start
```

Your app will now display:
- 🌷 Beautiful tulip app icon on your home screen
- 🌷 Elegant tulip splash screen when opening the app
- 🌷 Matching favicon in web browsers

---

## 💡 Pro Tips

1. **Test on multiple devices** - Icons may look different on iOS vs Android
2. **Keep it simple** - Fine details won't be visible at small sizes
3. **High contrast** - Ensure the tulip is clearly visible on all backgrounds
4. **Consistent style** - Use the same tulip design across all assets

---

## 🎉 Need Help?

If you're stuck or want me to:
- Find a specific tulip image for you
- Create custom icon designs
- Provide more detailed instructions

Just let me know! I'm here to help make this app perfect for Erica. 💖

---

*Remember: The key is removing those black edges for a clean, professional look that Erica will love!* 🌷
