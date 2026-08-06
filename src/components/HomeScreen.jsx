import { motion } from "framer-motion";
import { useMemo } from "react";
import Counter from "./Counter";
import { container, item } from "../utils/motion";

function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      color: i % 4 === 0 ? '#D4C8E2' : i % 4 === 1 ? '#E8D5B7' : i % 4 === 2 ? '#F9E4E4' : '#A8B5A0'
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: 0.3
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(particle.id) * 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

const navItems = [
  {
    id: "timeline",
    label: "Replay our story",
    icon: "📖",
  },
  {
    id: "finale",
    label: "Read your letter again",
    icon: "💌",
  },
  {
    id: "gallery",
    label: "Our gallery",
    icon: "🖼️",
  },
  {
    id: "photobooth",
    label: "Photobooth",
    icon: "📸",
  },
];

function HomeScreen({ onNavigate }) {
    return (
    <motion.div
      className="min-h-screen bg-gradient-cream flex flex-col items-center px-responsive py-10 sm:py-14 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-lilac/8 rounded-full blur-[120px] pointer-events-none"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <FloatingParticles />

      <div className="w-full max-w-md flex flex-col items-center gap-8 relative z-10">
        {/* Logo + Title */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/logo.png"
            alt="Xeia"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-sm"
          />
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-tight">
            Xeia
          </h1>
        </motion.div>

        {/* Live counter */}
        <motion.div
          className="relative p-6 rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(253,246,236,0.9), rgba(248,240,245,0.9))",
            boxShadow: "0 8px 32px rgba(124,92,191,0.15), inset 0 1px 0 rgba(255,255,255,0.6)"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="absolute inset-0 rounded-3xl p-[2px]"
            style={{
              background: "linear-gradient(135deg, #D4C8E2, #E8D5B7, #F9E4E4, #A8B5A0)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude"
            }}
          />
          <div className="relative z-10">
            <Counter />
          </div>
        </motion.div>

        {/* Navigation grid */}
        <motion.div
          className="w-full grid grid-cols-2 gap-3 sm:gap-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
           {navItems.map((navItem) => (
             <motion.button
               key={navItem.id}
               onClick={() => onNavigate(navItem.id)}
               variants={item}
               className="group flex flex-col items-center gap-2.5 card-padding card-base card-hover card-interactive"
               whileTap={{ scale: 0.97 }}
             >
               <span
                 className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-200"
                 role="img"
                 aria-label={navItem.label}
               >
                 {navItem.icon}
               </span>
               <span className="font-sans text-xs sm:text-sm text-charcoal/80 font-medium text-center leading-snug">
                 {navItem.label}
               </span>
             </motion.button>
           ))}
        </motion.div>

        {/* Footer tagline */}
        <motion.p
          className="font-serif text-xs text-warm-gray/60 italic text-center mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Our little corner of the world
        </motion.p>
      </div>
    </motion.div>
  );
}

export default HomeScreen;
