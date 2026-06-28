import { motion } from 'framer-motion'

const PIECES = ['🧅', '🥕', '🌿', '🧄', '🌶️']

export default function ChoppingKnife() {
  return (
    <div className="relative flex items-center justify-center py-6 overflow-hidden" aria-hidden>

      {/* lines */}
      <motion.div className="h-px flex-1 bg-gradient-to-r from-transparent to-orange-400/40"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 1 }} style={{ originX: 0 }} />

      <div className="relative mx-6 flex flex-col items-center">
        {/* flying ingredient pieces */}
        {PIECES.map((p, i) => (
          <motion.span key={p} className="pointer-events-none absolute text-sm"
            style={{ left: `${i * 14 - 28}px`, top: 0 }}
            animate={{ y: [0, -22, 0], x: [(i - 2) * 4, (i - 2) * 12, (i - 2) * 4], opacity: [0, 1, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 1.0, delay: i * 0.12, repeat: Infinity, ease: 'easeInOut' }}>
            {p}
          </motion.span>
        ))}

        {/* knife chopping */}
        <motion.span className="text-4xl select-none"
          animate={{ rotate: [-20, 10, -20], y: [0, 6, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top right' }}>
          🔪
        </motion.span>

        {/* cutting board */}
        <motion.span className="text-2xl -mt-1"
          animate={{ scaleX: [1, 1.04, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}>
          🪵
        </motion.span>
      </div>

      <motion.div className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-400/40"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 1 }} style={{ originX: 1 }} />
    </div>
  )
}
