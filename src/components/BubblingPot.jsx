import { motion } from 'framer-motion'

export default function BubblingPot() {
  return (
    <div className="relative flex flex-col items-center justify-center py-6" aria-hidden>
      {/* bubbles rising */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="absolute text-xs"
          style={{ bottom: 48, left: `${38 + i * 6}%` }}
          animate={{ y: [0, -40], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 1.2, delay: i * 0.22, repeat: Infinity, ease: 'easeOut' }}
        >
          🫧
        </motion.span>
      ))}

      {/* steam */}
      {[-12, 0, 12].map((offset, i) => (
        <motion.div
          key={i}
          className="absolute h-8 w-0.5 rounded-full bg-orange-400/30"
          style={{ bottom: 72, left: `calc(50% + ${offset}px)` }}
          animate={{ y: [0, -30], opacity: [0.6, 0], scaleX: [1, 2.5] }}
          transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* pot shaking */}
      <motion.span
        className="text-5xl"
        animate={{ rotate: [-4, 4, -2, 2, 0], y: [0, -3, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        🫕
      </motion.span>

      {/* lines */}
      <div className="mt-3 flex w-full items-center gap-3">
        <motion.div className="h-px flex-1 bg-gradient-to-r from-transparent to-orange-400/40"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1 }} style={{ originX: 0 }} />
        <motion.span className="text-lg"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>🥄</motion.span>
        <motion.div className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-400/40"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1 }} style={{ originX: 1 }} />
      </div>
    </div>
  )
}
