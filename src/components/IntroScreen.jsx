import { motion } from "framer-motion";
import { content } from "../data/content";
import Counter from "./Counter";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function IntroScreen({ onComplete }) {
    return (
    <motion.div
      className="min-h-screen bg-gradient-cream flex flex-col items-center justify-center px-responsive"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="flex flex-col items-center gap-8 text-center max-w-md"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="font-serif text-5xl sm:text-6xl text-purple tracking-wide"
          variants={fadeUp}
        >
          {content.appTitle}
        </motion.h1>

        <motion.p
          className="font-serif text-xl sm:text-2xl text-charcoal italic"
          variants={fadeUp}
        >
          {content.introLine}
        </motion.p>

        <motion.div variants={fadeUp} className="my-2">
          <Counter />
        </motion.div>

        <motion.p
          className="text-sm text-warm-gray font-sans tracking-wide"
          variants={fadeUp}
        >
          and counting
        </motion.p>

        <motion.button
          onClick={onComplete}
          className="btn-primary mt-6"
          variants={fadeUp}
          whileTap={{ scale: 0.96 }}
        >
          Tap to begin
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default IntroScreen;
