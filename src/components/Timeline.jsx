import { motion } from "framer-motion";
import { timeline } from "../data/timeline";
import TimelineCard from "./TimelineCard";
import { ease, duration, fadeUp } from "../utils/motion";

function Timeline({ onComplete }) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-cream py-12 px-6 sm:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-md mx-auto">
        <motion.h2
          className="font-serif text-2xl sm:text-3xl text-charcoal text-center mb-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Our Story
        </motion.h2>

        <div className="relative">
          {/* Vertical connector line - now with gradient */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" >
            <div className="h-full bg-gradient-to-b from-lilac-light/60 via-lilac-light/30 to-lilac-light/60" />
          </div>

          <div className="flex flex-col gap-14">
            {timeline.map((item, i) => (
              <TimelineCard
                key={item.id}
                date={item.date}
                title={item.title}
                caption={item.caption}
                image={item.image}
                index={i}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            onClick={onComplete}
            className="btn-primary"
            whileTap={{ scale: 0.96 }}
          >
            Continue
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Timeline;
