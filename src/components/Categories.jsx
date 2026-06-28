import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CATEGORY_GRID } from '../config'
import { FigmaSection } from './FigmaLayout.jsx'

const card = { rest:{}, hover:{} }
const titleV = { rest:{ y:10, opacity:0.88 }, hover:{ y:0, opacity:1, transition:{ duration:0.4, ease:[0.22,1,0.36,1] } } }
const subtitleV = { rest:{ y:6, opacity:0 }, hover:{ y:0, opacity:1, transition:{ duration:0.35, delay:0.06, ease:[0.22,1,0.36,1] } } }
const imgV = { rest:{ scale:1 }, hover:{ scale:1.1, transition:{ duration:0.65, ease:[0.22,1,0.36,1] } } }
const shadeV = { rest:{ opacity:0.55 }, hover:{ opacity:0.92, transition:{ duration:0.4 } } }

export default function Categories() {
  return (
    <FigmaSection id="categories">
      <motion.div initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, margin:'-12%' }} transition={{ duration:0.65, ease:[0.22,1,0.36,1] }} className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-700/85">تصفح حسب النوع</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-orange-950 lg:text-4xl">تصنيفات الطبخ</h2>
        <p className="mx-auto mt-4 max-w-lg text-stone-600">صور غنية، تصفح واكتشف عالم من النكهات.</p>
      </motion.div>

      <ul className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
        {CATEGORY_GRID.map((c) => (
          <motion.li key={c.id}
            initial={{ opacity:0, y:48 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.35 }}
            transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}>
            <Link to={`/category/${c.id}`} className="block rounded-[14px] outline-none focus-visible:ring-2 focus-visible:ring-orange-400 lg:rounded-2xl">
              <motion.div variants={card} initial="rest" whileHover="hover"
                className="glass-panel relative h-[220px] w-full cursor-pointer overflow-hidden rounded-[14px] lg:h-[260px] lg:rounded-2xl"
                whileTap={{ scale:0.99 }} transition={{ type:'spring', stiffness:380, damping:26 }}>
                <motion.img variants={imgV} src={c.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <motion.div variants={shadeV} className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <motion.h3 variants={titleV} className="font-display text-2xl font-semibold text-white">{c.name}</motion.h3>
                  <motion.p variants={subtitleV} className="mt-1 text-sm text-white/70">شاهد الفيديوهات</motion.p>
                </div>
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </FigmaSection>
  )
}
