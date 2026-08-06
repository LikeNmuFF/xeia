import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const STRIP_WIDTH = 400;
const PHOTO_WIDTH = 360;
const PHOTO_HEIGHT = 360;
const GAP = 16;
const BORDER = 20;
const WATERMARK_HEIGHT = 40;

const STRIP_HEIGHT =
  BORDER * 2 + PHOTO_HEIGHT * 3 + GAP * 2 + WATERMARK_HEIGHT;

function PhotoStripTemplate({ photos, onRetake, onBack }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    if (!canvasRef.current || photos.length < 3) return;

    const canvas = canvasRef.current;
    canvas.width = STRIP_WIDTH;
    canvas.height = STRIP_HEIGHT;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#FDF6EC";
    ctx.fillRect(0, 0, STRIP_WIDTH, STRIP_HEIGHT);

    // Border frame
    ctx.strokeStyle = "#B8A9C9";
    ctx.lineWidth = 3;
    ctx.roundRect(4, 4, STRIP_WIDTH - 8, STRIP_HEIGHT - 8, 12);
    ctx.stroke();

    // Inner decorative border
    ctx.strokeStyle = "#D4C8E2";
    ctx.lineWidth = 1;
    ctx.roundRect(10, 10, STRIP_WIDTH - 20, STRIP_HEIGHT - 20, 8);
    ctx.stroke();

    // Draw tulip decorations at corners
    drawTulipCorner(ctx, 12, 12, 0);
    drawTulipCorner(ctx, STRIP_WIDTH - 12, 12, Math.PI / 2);
    drawTulipCorner(ctx, STRIP_WIDTH - 12, STRIP_HEIGHT - 12, Math.PI);
    drawTulipCorner(ctx, 12, STRIP_HEIGHT - 12, -Math.PI / 2);

    // Load and draw photos
    let loaded = 0;
    const images = photos.map((src, i) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === photos.length) {
          drawPhotos(ctx, images);
          drawWatermark(ctx);
          setDownloadUrl(canvas.toDataURL("image/png"));
          setIsDrawing(false);
        }
      };
      img.src = src;
      return img;
    });
  }, [photos]);

  const drawPhotos = (ctx, images) => {
    images.forEach((img, i) => {
      const x = BORDER + (STRIP_WIDTH - BORDER * 2 - PHOTO_WIDTH) / 2;
      const y = BORDER + i * (PHOTO_HEIGHT + GAP);

      // Photo shadow
      ctx.shadowColor = "rgba(0,0,0,0.1)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;

      // Photo background
      ctx.fillStyle = "#FFFFFF";
      ctx.roundRect(x - 4, y - 4, PHOTO_WIDTH + 8, PHOTO_HEIGHT + 8, 8);
      ctx.fill();

      ctx.shadowColor = "transparent";

      // Clip and draw photo
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, PHOTO_WIDTH, PHOTO_HEIGHT, 6);
      ctx.clip();

      // Cover fit
      const imgAspect = img.width / img.height;
      const photoAspect = PHOTO_WIDTH / PHOTO_HEIGHT;
      let sx, sy, sw, sh;

      if (imgAspect > photoAspect) {
        sh = img.height;
        sw = sh * photoAspect;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = sw / photoAspect;
        sx = 0;
        sy = (img.height - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, x, y, PHOTO_WIDTH, PHOTO_HEIGHT);
      ctx.restore();
    });
  };

  const drawTulipCorner = (ctx, x, y, rotation) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Tulip petals
    ctx.fillStyle = "#B8A9C9";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-3, -8, 3, -8, 0, 0);
    ctx.fill();

    ctx.fillStyle = "#D4C8E2";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-6, -5, 0, -10, 0, 0);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(6, -5, 0, -10, 0, 0);
    ctx.fill();

    // Stem
    ctx.strokeStyle = "#A8B5A0";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 8);
    ctx.stroke();

    ctx.restore();
  };

  const drawWatermark = (ctx) => {
    ctx.fillStyle = "#7C5CBF";
    ctx.font = "italic 16px 'Playfair Display', Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Xeia", STRIP_WIDTH / 2, STRIP_HEIGHT - BORDER - WATERMARK_HEIGHT / 2);
  };

  const handleDownload = () => {
    if (!downloadUrl) return;

    const link = document.createElement("a");
    link.download = `xeia-photobooth-${Date.now()}.png`;
    link.href = downloadUrl;
    link.click();
  };

    return (
    <motion.div
      className="min-h-screen bg-gradient-cream flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-4 max-w-lg mx-auto w-full">
           <button
            onClick={onBack}
            className="flex items-center gap-2 text-warm-gray hover:text-charcoal transition-colors font-sans text-sm"
          >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-sans text-sm">Back</span>
        </button>
        <h1 className="flex-1 text-center font-serif text-xl text-charcoal pr-7">
          Your Strip
        </h1>
      </div>

      {/* Canvas preview */}
      <div className="flex-1 flex items-start justify-center px-4 pt-4 pb-8 overflow-y-auto">
        <div className="relative">
          {isDrawing && (
            <div className="absolute inset-0 flex items-center justify-center bg-cream/80 rounded-2xl">
              <div className="w-10 h-10 border-4 border-lilac-light border-t-purple rounded-full animate-spin" />
            </div>
          )}
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto rounded-2xl shadow-lg"
            style={{ maxHeight: "65vh" }}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="sticky bottom-0 bg-cream/90 backdrop-blur-sm border-t border-lilac-light/30 px-6 py-5">
        <div className="flex gap-4 max-w-lg mx-auto">
          <motion.button
            onClick={onRetake}
            className="btn-secondary flex-1"
            whileTap={{ scale: 0.96 }}
          >
            Retake
          </motion.button>
          <motion.button
            onClick={handleDownload}
            disabled={!downloadUrl}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.96 }}
          >
            Save to your device
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default PhotoStripTemplate;
