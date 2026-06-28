import { motion } from 'framer-motion'

const SPICES = ['🌶️', '🧄', '🫒', '🌿', '🧂', '🍋']

export default function CookingDivider() {
  return (
    <div className="relative flex items-center justify-center py-2 overflow-hidden" aria-hidden>
      {/* line left */}
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-transparent to-orange-400/40"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
      />

      {/* center pan + steam */}
      <div className="relative mx-4 flex flex-col items-center">
        {/* steam wisps */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute -top-5 h-5 w-0.5 rounded-full bg-orange-400/40"
            style={{ left: `${i * 8 - 8}px` }}
            animate={{ y: [0, -14], opacity: [0.5, 0], scaleX: [1, 1.8] }}
            transition={{ duration: 1.4, delay: i * 0.3, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}

        {/* sizzling pan */}
        <motion.span
          className="text-2xl"
          animate={{ rotate: [-3, 3, -3], scale: [1, 1.08, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🍳
        </motion.span>
      </div>

      {/* line right */}
      <motion.div
        className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-400/40"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 1 }}
      />

      {/* floating spice dots */}
      {SPICES.map((s, i) => (
        <motion.span
          key={s}
          className="pointer-events-none absolute text-base opacity-0"
          style={{ left: `${10 + i * 15}%` }}
          animate={{ y: [0, -28], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: 'easeOut' }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  )
}
