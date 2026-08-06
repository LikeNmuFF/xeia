import { motion } from "framer-motion";
import { ease, duration } from "../utils/motion";

function TimelineCard({ date, title, caption, image, index }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      className="group flex flex-col items-center text-center px-4 sm:px-0"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: duration.entrance, 
        ease: ease.smooth,
        delay: index * 0.1
      }}
      whileHover={{ y: -5 }}
    >
      <div className="w-full max-w-sm">
        <div className="card-base card-hover p-4 sm:p-5 mb-4 shadow-sm">
          {/* Timeline connector dot */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple border-3 border-cream z-10" />
          
          <div className="relative overflow-hidden rounded-xl mb-4">
            <img
              src={image}
              alt={title}
              className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Image overlay with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <p className="font-sans text-xs text-gold uppercase tracking-widest mb-1">
            {formattedDate}
          </p>

          <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-2">
            {title}
          </h3>

          <p className="font-sans text-sm text-warm-gray leading-relaxed max-w-xs mx-auto">
            {caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default TimelineCard;
