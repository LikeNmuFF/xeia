import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ease, duration } from "../utils/motion";
import { content } from "../data/content";

function Counter({ compact = false }) {
  const [elapsed, setElapsed] = useState(getElapsed());

  function getElapsed() {
    const start = new Date(content.startDate);
    const now = new Date();
    const diffMs = now - start;

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;
    const hours = totalHours % 24;

    return { months, days, hours };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsed());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <motion.span
        className="font-serif text-gold inline-block"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: duration.normal, ease: ease.smooth }}
      >
        {elapsed.months}mo {elapsed.days}d
      </motion.span>
    );
  }

  return (
    <div className="flex items-baseline gap-2 sm:gap-3 justify-center flex-wrap">
      <TimeUnit value={elapsed.months} label="months" />
      <TimeUnit value={elapsed.days} label="days" />
      <TimeUnit value={elapsed.hours} label="hours" />
    </div>
  );
}

function TimeUnit({ value, label }) {
  const digits = String(value).split('');
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex overflow-hidden">
        {digits.map((digit, index) => (
          <motion.span
            key={`${label}-${index}`}
            className="font-serif text-3xl sm:text-4xl text-gold leading-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.05, 
              duration: duration.fast,
              ease: ease.smooth 
            }}
          >
            {digit}
          </motion.span>
        ))}
      </div>
      <span className="text-xs sm:text-sm text-warm-gray mt-1 font-sans tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

export default Counter;
