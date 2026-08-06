import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../data/content";
import { ease, duration, fadeUp, fadeIn } from "../utils/motion";

function LoginScreen({ onUnlock }) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [shaking, setShaking] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState(false);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("dev") === "true") {
      setUnlocking(true);
      setTimeout(() => onUnlock(), 800);
    }
  }, [onUnlock]);

  const [unlockYear, unlockMonth, unlockDay] = content.unlockDate
    .split("-")
    .map(Number);

  const handleInput = (value, setter, nextRef, maxLength) => {
    const cleaned = value.replace(/\D/g, "").slice(0, maxLength);
    setter(cleaned);
    setError(false);
    if (cleaned.length === maxLength && nextRef?.current) {
      nextRef.current.focus();
    }
  };

  const handleKeyDown = (e, prevRef) => {
    if (e.key === "Backspace" && !e.target.value && prevRef?.current) {
      prevRef.current.focus();
    }
  };

  const handleSubmit = () => {
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const y = parseInt(year, 10);

    if (m === unlockMonth && d === unlockDay && y === unlockYear) {
      setUnlocking(true);
      setTimeout(() => onUnlock(), 800); // Faster unlock
    } else {
      setShaking(true);
      setError(true);
      setTimeout(() => {
        setShaking(false);
        setMonth("");
        setDay("");
        setYear("");
        setError(false);
        monthRef.current?.focus();
      }, 600);
    }
  };

  const inputClass = `w-[5rem] sm:w-28 h-16 sm:h-[4.5rem] text-center text-xl sm:text-2xl font-serif
    bg-white/60 backdrop-blur-md border-[1.5px] rounded-2xl
    focus:border-purple focus:bg-white/80 focus:ring-2 focus:ring-purple/15
    focus:outline-none transition-all duration-300 ease-out
    placeholder:text-lilac/60 placeholder:text-lg
    ${error ? "border-rose animate-shake" : "border-lilac-light/60"}`;

    return (
    <motion.div
      className="min-h-screen bg-gradient-cream flex flex-col items-center justify-center px-responsive relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Subtle background tulip watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <img src="/logo.png" alt="" className="w-[500px] h-[500px] object-contain" />
      </div>

      <AnimatePresence mode="wait">
        {!unlocking ? (
          <motion.div
            key="form"
            className={`flex flex-col items-center gap-6 sm:gap-8 relative z-10 ${
              shaking ? "animate-shake" : ""
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Logo */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-2"
            >
              <div className="absolute w-40 h-40 bg-lilac/20 rounded-full blur-3xl pointer-events-none" />
              <img
                src="/logo.png"
                alt="Xeia"
                className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-md"
              />
            </motion.div>

            {/* Prompt */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-serif text-lg sm:text-xl text-charcoal/80 text-center leading-relaxed max-w-[280px]"
            >
              When did it all start?
            </motion.p>

            {/* Date inputs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex gap-2.5 sm:gap-3 items-center"
            >
              <input
                ref={monthRef}
                type="text"
                inputMode="numeric"
                placeholder="MM"
                value={month}
                onChange={(e) => handleInput(e.target.value, setMonth, dayRef, 2)}
                onKeyDown={(e) => handleKeyDown(e, null)}
                className={inputClass}
                autoFocus
              />
              <span className="text-lilac/40 text-xl font-light select-none">/</span>
              <input
                ref={dayRef}
                type="text"
                inputMode="numeric"
                placeholder="DD"
                value={day}
                onChange={(e) => handleInput(e.target.value, setDay, yearRef, 2)}
                onKeyDown={(e) => handleKeyDown(e, monthRef)}
                className={inputClass}
              />
              <span className="text-lilac/40 text-xl font-light select-none">/</span>
              <input
                ref={yearRef}
                type="text"
                inputMode="numeric"
                placeholder="YYYY"
                value={year}
                onChange={(e) =>
                  handleInput(e.target.value, setYear, null, 4)
                }
                onKeyDown={(e) => {
                  handleKeyDown(e, dayRef);
                  if (e.key === "Enter") handleSubmit();
                }}
                className={`${inputClass} w-[5.5rem] sm:w-28`}
              />
            </motion.div>

            {/* Error hint */}
            <motion.div
              className="h-5 flex items-center"
              initial={false}
              animate={{ opacity: error ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="font-sans text-xs text-rose tracking-wide">
                Try again
              </p>
            </motion.div>

             {/* Submit button */}
             <motion.button
               variants={fadeUp}
               initial="hidden"
               animate="visible"
               onClick={handleSubmit}
               className="btn-primary mt-1"
               whileTap={{ scale: 0.96 }}
             >
               <span className="relative z-10">Unlock</span>
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
             </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="unlocking"
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.img
              src="/logo.png"
              alt="Xeia"
              className="w-20 h-20 object-contain"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.div
              className="w-10 h-10 rounded-full border-[2.5px] border-lilac-light border-t-purple animate-spin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.p
              className="font-serif text-base text-warm-gray italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Opening our story...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LoginScreen;
