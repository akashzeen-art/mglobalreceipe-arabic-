import { motion } from 'framer-motion'
import { FigmaSection } from './FigmaLayout.jsx'

const ABOUT_IMG = '/potrait_cooking.png'

const FLOATING = [
  { emoji: '🔥', top: '10%', left: '5%', delay: 0 },
  { emoji: '🧄', top: '20%', left: '85%', delay: 0.6 },
  { emoji: '🌿', top: '75%', left: '8%', delay: 1.2 },
  { emoji: '🫙', top: '80%', left: '88%', delay: 1.8 },
]

export default function About() {
  return (
    <FigmaSection id="about">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {FLOATING.map(({ emoji, top, left, delay }) => (
          <motion.span key={emoji + left} className="absolute text-2xl opacity-20" style={{ top, left }}
            animate={{ y: [0, -14, 0], rotate: [0, 6, -3, 0] }}
            transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}>
            {emoji}
          </motion.span>
        ))}
      </div>

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div className="relative order-2 lg:order-1"
          initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <div className="overflow-hidden rounded-[14px] lg:rounded-[20px]">
            <motion.img src={ABOUT_IMG} alt="" loading="lazy" decoding="async"
              className="h-[240px] w-full object-cover lg:h-[420px] lg:w-[560px] lg:max-w-full"
              whileHover={{ scale: 1.03 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
          </div>
          <div className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />
        </motion.div>

        <motion.div className="order-1 max-w-[500px] space-y-6 lg:order-2 lg:justify-self-end"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-700/85">قصتنا</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-orange-950 lg:text-4xl">شغف بالطبخ، بكل سهولة</h2>
          <p className="text-lg leading-relaxed text-stone-600">نحن نهتم بالوضوح: كيف تتحرك الحرارة في المقلاة، كيف يوقظ الملح الحمضيات، وكيف تفتح بعض التقنيات عشرات الأطباق. طبخ هذا موجود لتتعلم بثقة.</p>
          <p className="text-lg leading-relaxed text-stone-600">وصفات عربية أصيلة، إيقاع مدروس، ولا أسرار مخفية. إذا كنت فضولياً، فأنت بالفعل تنتمي لهذا المطبخ.</p>
        </motion.div>
      </div>
    </FigmaSection>
  )
}
