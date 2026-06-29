import { motion } from 'framer-motion'
import { FigmaSection } from './FigmaLayout.jsx'

const ITEMS = [
  { title: 'تعلّم في أي وقت ومكان', detail: 'بسرعتك ومطبخك — دروس تناسب جدولك الحقيقي.', icon: <motion.span className="text-3xl" animate={{ rotate:[-5,5,-5], y:[0,-4,0] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}>⏰</motion.span> },
  { title: 'من المبتدئ إلى المتقدم', detail: 'الأساسيات أولاً — ثم العمق حين تكون مستعداً.', icon: <motion.span className="text-3xl" animate={{ rotate:[0,10,-10,0] }} transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}>👨‍🍳</motion.span> },
  { title: 'يعمل على جميع الأجهزة', detail: 'تصميم متجاوب للجوال والجهاز اللوحي وسطح المكتب.', icon: <motion.span className="text-3xl" animate={{ y:[0,-6,0] }} transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }}>🍽️</motion.span> },
]

export default function Benefits() {
  return (
    <FigmaSection id="benefits">
      <motion.div initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, margin:'-12%' }} transition={{ duration:0.65, ease:[0.22,1,0.36,1] }} className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-700/85">لماذا يبقى الطهاة</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-orange-950 lg:text-4xl">المميزات</h2>
      </motion.div>

      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6" style={{ perspective:'1100px' }}>
        {ITEMS.map((item, i) => (
          <motion.li key={item.title} initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:'-8%' }} transition={{ duration:0.55, delay:i*0.08, ease:[0.22,1,0.36,1] }} className="min-h-0">
            <motion.div className="glass-panel group relative flex h-[160px] flex-col overflow-hidden rounded-[14px] p-6 lg:h-[200px] lg:rounded-2xl"
              whileHover={{ rotateX:3, rotateY:-4, scale:1.02 }} whileTap={{ scale:0.99 }}>
              <motion.div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-400/40 bg-orange-400/10">
                {item.icon}
              </motion.div>
              <h3 className="font-display text-base font-semibold leading-snug text-orange-950 lg:text-lg">{item.title}</h3>
              <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-stone-600 lg:text-sm">{item.detail}</p>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </FigmaSection>
  )
}
