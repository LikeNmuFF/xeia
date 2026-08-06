import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease, duration } from "../utils/motion";

const loveResponses = [
  { max: 20, text: "Hmm, okay..." },
  { max: 40, text: "Getting warmer..." },
  { max: 60, text: "Now we're talking!" },
  { max: 80, text: "You're making me blush..." },
  { max: 99, text: "Almost there..." },
  { max: 100, text: "That's exactly how much I love you too! 💜" },
];

function ConfettiParticle({ index }) {
  const colors = ["#B8A9C9", "#7C5CBF", "#D4C8E2", "#FDF6EC", "#A8B5A0"];
  const color = colors[index % colors.length];

  const randomX = useMemo(() => (Math.random() - 0.5) * 250, []);
  const randomY = useMemo(() => -(Math.random() * 200 + 80), []);
  const randomRotate = useMemo(() => Math.random() * 540 - 270, []);
  const randomScale = useMemo(() => Math.random() * 0.4 + 0.4, []);
  const randomDelay = useMemo(() => Math.random() * 0.2, []);
  const isCircle = useMemo(() => index % 3 === 0, [index]);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
      animate={{
        x: randomX,
        y: randomY,
        opacity: [1, 1, 0],
        scale: randomScale,
        rotate: randomRotate,
      }}
      transition={{
        duration: 2,
        delay: randomDelay,
        ease: "easeOut",
      }}
      style={{
        width: isCircle ? 8 : 5,
        height: isCircle ? 8 : 12,
        borderRadius: isCircle ? "50%" : "2px",
        backgroundColor: color,
      }}
    />
  );
}

function InteractiveMoment({ onComplete }) {
  const [value, setValue] = useState(0);

  const getResponse = useCallback((val) => {
    for (const tier of loveResponses) {
      if (val <= tier.max) return tier.text;
    }
    return loveResponses[loveResponses.length - 1].text;
  }, []);

  const responseText = useMemo(() => getResponse(value), [value, getResponse]);
  const isComplete = value === 100;

  const progressPercent = value;
  const fillWidth = `${progressPercent}%`;

    return (
    <motion.div
      className="min-h-screen bg-gradient-cream flex flex-col items-center justify-center px-responsive relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Confetti burst at 100 */}
      <AnimatePresence>
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <ConfettiParticle key={i} index={i} />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-sm flex flex-col items-center gap-10">
        {/* Title */}
        <motion.h2
          className="font-serif text-2xl sm:text-3xl text-charcoal text-center leading-snug"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          How much do you love me?
        </motion.h2>

        {/* Slider area */}
        <div className="w-full flex flex-col items-center gap-6">
          {/* Custom slider track */}
          <div className="w-full relative h-12 flex items-center">
            {/* Background track */}
            <div className="absolute w-full h-3 rounded-full bg-lilac-light/60" />

            {/* Filled track */}
            <motion.div
              className="absolute h-3 rounded-full shadow-[0_0_12px_rgba(124,92,191,0.4)]"
              style={{
                background: "linear-gradient(90deg, #D4C8E2, #B8A9C9, #7C5CBF)",
                width: fillWidth,
              }}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Glow behind thumb */}
            <motion.div
              className="absolute h-8 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(124,92,191,0.3) 0%, transparent 70%)",
                width: 40,
                left: `calc(${fillWidth} - 20px)`,
              }}
              animate={{ scale: value > 0 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            />

             {/* Range input */}
             <input
               type="range"
               min="0"
               max="100"
               value={value}
               onChange={(e) => setValue(Number(e.target.value))}
               className="absolute w-full h-12 appearance-none bg-transparent cursor-pointer z-10
                 [&::-webkit-slider-thumb]:appearance-none
                 [&::-webkit-slider-thumb]:w-10
                 [&::-webkit-slider-thumb]:h-10
                 [&::-webkit-slider-thumb]:rounded-full
                 [&::-webkit-slider-thumb]:bg-gradient-to-br
                 [&::-webkit-slider-thumb]:from-purple
                 [&::-webkit-slider-thumb]:to-lilac-dark
                 [&::-webkit-slider-thumb]:border-4
                 [&::-webkit-slider-thumb]:border-white
                 [&::-webkit-slider-thumb]:shadow-[0_0_16px_rgba(124,92,191,0.6)]
                 [&::-webkit-slider-thumb]:transition-all
                 [&::-webkit-slider-thumb]:duration-200
                 [&::-webkit-slider-thumb]:hover:shadow-[0_0_24px_rgba(124,92,191,0.8)]
                 [&::-webkit-slider-thumb]:active:scale-110
                 [&::-webkit-slider-thumb]:active:rotate-12
                 [&::-moz-range-thumb]:appearance-none
                 [&::-moz-range-thumb]:w-10
                 [&::-moz-range-thumb]:h-10
                 [&::-moz-range-thumb]:rounded-full
                 [&::-moz-range-thumb]:bg-gradient-to-br
                 [&::-moz-range-thumb]:from-purple
                 [&::-moz-range-thumb]:to-lilac-dark
                 [&::-moz-range-thumb]:border-4
                 [&::-moz-range-thumb]:border-white
                 [&::-moz-range-thumb]:shadow-[0_0_16px_rgba(124,92,191,0.6)]
                 [&::-moz-range-track]:appearance-none
                 [&::-moz-range-track]:bg-transparent
                 [&::-moz-range-track]:h-3"
               aria-label="Love meter"
             />
          </div>

          {/* Value display */}
          <motion.span
            className="font-serif text-5xl sm:text-6xl text-purple font-bold tabular-nums"
            key={value}
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: duration.fast, ease: ease.smooth }}
          >
            {value}
          </motion.span>
        </div>

         {/* Response text */}
         <div className="h-16 flex items-center justify-center">
           <AnimatePresence mode="wait">
             <motion.p
               key={responseText}
               className={`font-serif text-lg sm:text-xl text-center italic ${
                 isComplete ? "text-purple text-2xl sm:text-3xl font-semibold" : "text-warm-gray"
               }`}
               initial={{ opacity: 0, y: 8 }}
               animate={{ 
                 opacity: 1, 
                 y: 0,
                 scale: isComplete ? [1, 1.1, 1] : 1
               }}
               exit={{ opacity: 0, y: -8 }}
               transition={{ 
                 duration: isComplete ? 0.6 : 0.25,
                 ease: isComplete ? "easeOut" : "easeInOut"
               }}
             >
               {responseText}
             </motion.p>
           </AnimatePresence>
         </div>

         {/* Continue button */}
         <AnimatePresence>
           {isComplete && (
             <motion.button
               onClick={onComplete}
               className="btn-primary mt-2"
               initial={{ opacity: 0, y: 12 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.4, delay: 0.8 }}
               whileTap={{ scale: 0.96 }}
             >
               Continue
             </motion.button>
           )}
         </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default InteractiveMoment;
