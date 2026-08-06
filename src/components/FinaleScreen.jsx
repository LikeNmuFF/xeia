import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { content } from "../data/content";
import { ease, duration } from "../utils/motion";

function TulipPetal({ index, delay }) {
  const colors = ["#B8A9C9", "#D4C8E2", "#7C5CBF", "#FDF6EC"];
  const color = colors[index % colors.length];
  const angle = (index / 8) * 360;
  const radians = (angle * Math.PI) / 180;

  return (
    <motion.div
      className="absolute"
      style={{
        width: 16,
        height: 24,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        backgroundColor: color,
        transformOrigin: "bottom center",
        left: `calc(50% + ${Math.cos(radians) * 18}px - 8px)`,
        top: `calc(50% + ${Math.sin(radians) * 18}px - 24px)`,
      }}
      initial={{ opacity: 0, scale: 0, rotate: angle - 90 }}
      animate={{ opacity: 0.7, scale: 1, rotate: angle - 90 }}
      transition={{ 
        duration: 0.6, 
        delay: delay + index * 0.05,
        ease: ease.smooth 
      }}
    />
  );
}

function CelebrationParticle({ index }) {
  const colors = ["#B8A9C9", "#7C5CBF", "#D4C8E2", "#FDF6EC", "#A8B5A0"];
  const color = colors[index % colors.length];
  const angle = (index / 30) * 360;
  const radians = (angle * Math.PI) / 180;
  const distance = 80 + Math.random() * 120;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: 6 + Math.random() * 6,
        height: 6 + Math.random() * 6,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        backgroundColor: color,
        left: "50%",
        top: "40%",
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
      animate={{
        x: Math.cos(radians) * distance,
        y: Math.sin(radians) * distance,
        opacity: [1, 1, 0],
        scale: [0, 1.2, 0.6],
      }}
      transition={{ 
        duration: 1.2, 
        delay: 1.2 + index * 0.03, 
        ease: ease.smooth 
      }}
    />
  );
}

function TulipPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 8,
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360,
      color: i % 3 === 0 ? "#FDF6EC" : i % 3 === 1 ? "#F9E4E4" : "#E8D5B7",
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: "-20px",
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            borderRadius: "50% 50% 50% 0%",
            backgroundColor: petal.color,
            transform: `rotate(${petal.rotation}deg)`,
            opacity: 0.7,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(petal.id) * 30],
            rotate: [petal.rotation, petal.rotation + 360],
            opacity: [0.7, 0.7, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function FinaleScreen({ onComplete }) {
  const [phase, setPhase] = useState("tulip"); // "tulip" → "message"

  const finaleParagraphs = useMemo(
    () => content.finaleMessage.split("\n\n"),
    []
  );

  const isText = content.finaleMediaType === "text";

    return (
    <motion.div
      className="min-h-screen bg-gradient-cream flex flex-col items-center justify-center px-responsive py-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Celebration particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <CelebrationParticle key={i} index={i} />
        ))}
      </div>

      {/* Falling tulip petals */}
      <TulipPetals />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(253,246,236,0.6) 100%)",
        }}
      />

      <AnimatePresence mode="wait">
        {phase === "tulip" ? (
          <motion.div
            key="tulip"
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tulip motif */}
            <div className="relative w-24 h-24">
              {/* Petals */}
              {Array.from({ length: 8 }).map((_, i) => (
                <TulipPetal key={i} index={i} delay={0.2} />
              ))}
              {/* Center */}
              <motion.div
                className="absolute w-4 h-4 rounded-full bg-gold"
                style={{ left: "calc(50% - 8px)", top: "calc(50% - 8px)" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
            </div>

            <motion.p
              className="font-serif text-lg text-warm-gray italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              A moment for us...
            </motion.p>

            {/* Auto-transition to message after delay */}
            <motion.div
              onAnimationComplete={() => setPhase("message")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2.2, duration: 0 }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="message"
            className="w-full max-w-lg flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.entrance, ease: ease.smooth }}
          >
            {/* Decorative top line */}
            <motion.div
              className="w-12 h-px bg-lilac"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />

            {/* Letter header */}
            <motion.p
              className="font-serif text-lg sm:text-xl text-lilac-dark italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              For you, Erica Joy
            </motion.p>

             {/* Letter body */}
             {isText ? (
               <div className="flex flex-col gap-5">
                 {finaleParagraphs.map((para, i) => (
                   <motion.p
                     key={i}
                     className="font-serif text-base sm:text-lg text-charcoal leading-relaxed text-center"
                     initial={{ opacity: 0, y: 12, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     transition={{ 
                       delay: 0.7 + i * 0.2, 
                       duration: duration.slow,
                       ease: ease.smooth 
                     }}
                     whileHover={{ scale: 1.01 }}
                   >
                     {para}
                   </motion.p>
                 ))}
               </div>
             ) : (
               <motion.div
                 className="w-full rounded-xl overflow-hidden shadow-purple-md"
                 initial={{ opacity: 0, y: 12, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 transition={{ delay: 0.7, duration: 0.6, ease: ease.smooth }}
                 whileHover={{ scale: 1.01 }}
               >
                 {content.finaleMediaType === "video" ? (
                   <video
                     src={content.finaleMediaSrc}
                     controls
                     className="w-full"
                     playsInline
                   />
                 ) : (
                   <audio src={content.finaleMediaSrc} controls className="w-full" />
                 )}
               </motion.div>
             )}

            {/* Decorative bottom line */}
            <motion.div
              className="w-12 h-px bg-lilac"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            />

             {/* Signature with glow */}
             <motion.div
               className="mt-12 text-center"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.5, duration: 1, ease: ease.smooth }}
             >
               <motion.p
                 className="font-serif text-xl sm:text-2xl text-purple/80 italic"
                 style={{
                   textShadow: "0 0 20px rgba(124,92,191,0.3)",
                 }}
                 whileHover={{ 
                   textShadow: "0 0 30px rgba(124,92,191,0.5)",
                   scale: 1.01
                 }}
                 transition={{ duration: 0.3 }}
               >
                 "Every love story is beautiful, but ours is my favorite."
               </motion.p>
               <motion.div 
                 className="mt-6 flex items-center justify-center gap-3 text-rose/60"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1.8, duration: 0.5 }}
               >
                 <motion.div 
                   whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                   transition={{ duration: 0.3 }}
                 >
                   <Heart className="w-4 h-4 fill-current" />
                 </motion.div>
                 <span className="font-sans text-sm tracking-widest uppercase">
                   With love, always
                 </span>
                 <motion.div 
                   whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                   transition={{ duration: 0.3 }}
                 >
                   <Heart className="w-4 h-4 fill-current" />
                 </motion.div>
               </motion.div>
             </motion.div>

             {/* Continue button */}
             <motion.button
               onClick={onComplete}
               className="btn-primary mt-4"
               initial={{ opacity: 0, y: 12 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 2.6, duration: 0.5 }}
               whileTap={{ scale: 0.96 }}
             >
               Continue to our home
             </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FinaleScreen;
