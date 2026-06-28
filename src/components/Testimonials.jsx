import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TESTIMONIALS } from '../config'
import { FigmaSection } from './FigmaLayout.jsx'

const INTERVAL_MS = 5200

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setIndex((n) => (n + 1) % TESTIMONIALS.length), INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  const active = TESTIMONIALS[index]

  return (
    <FigmaSection id="testimonials">
      <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-12%' }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-700/85">آراء من المطبخ</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-orange-950 lg:text-4xl">آراء المتابعين</h2>
      </motion.div>

      <div className="relative mx-auto mt-10 max-w-[500px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure key={active.id}
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel-strong min-h-[200px] w-full px-[30px] py-[30px] text-right lg:min-h-[220px]">
            <blockquote className="text-base leading-relaxed text-stone-700 lg:text-lg">"{active.quote}"</blockquote>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-orange-200/60 pt-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white">
                {active.name.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-orange-950">{active.name}</p>
                <p className="text-sm text-stone-500">{active.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button key={t.id} type="button"
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-orange-600' : 'w-2 bg-orange-300/60 hover:bg-orange-400'}`}
            aria-label={`testimonial ${i + 1}`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </FigmaSection>
  )
}
