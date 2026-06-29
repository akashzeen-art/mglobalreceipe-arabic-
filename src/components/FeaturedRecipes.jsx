import { useState } from 'react'
import { motion } from 'framer-motion'
import { FEATURED_RECIPES } from '../config'
import { FigmaSection } from './FigmaLayout.jsx'
import { useGatedVideo } from '../hooks/useGatedVideo.jsx'
import { shuffle } from '../utils'

const imgMotion = { rest: { scale: 1 }, hover: { scale: 1.08, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }
const shadeMotion = { rest: { opacity: 0.4 }, hover: { opacity: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } } }
const playMotion = { rest: { scale: 0.85, opacity: 0.75 }, hover: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 20 } } }

export default function FeaturedRecipes() {
  const [recipes] = useState(() => shuffle(FEATURED_RECIPES))
  const { requestVideo, gateUi, loading } = useGatedVideo()

  return (
    <FigmaSection id="explore">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-12%' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-orange-700/85">مختارة لك</p>
        <h2 className="mt-3 text-center font-display text-3xl font-bold text-orange-950 lg:text-4xl">وصفات مميزة</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-base text-stone-600">
          تصفح بين أشهى الأطباق — كل وصفة مصممة للوضوح والنكهة.
        </p>
      </motion.div>

      <div className="mt-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          {recipes.map((recipe, i) => (
            <motion.article key={recipe.id}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel group relative h-[280px] overflow-hidden rounded-[14px] lg:h-[320px] lg:rounded-2xl cursor-pointer"
              variants={{ rest: {}, hover: {} }} initial="rest" whileHover="hover" whileTap={{ scale: 0.985 }}
              onClick={() => !loading && requestVideo(recipe)}>
              <div className="relative h-[220px] w-full shrink-0 overflow-hidden lg:h-[260px]">
                <motion.img src={recipe.image} alt="" loading="lazy" decoding="async"
                  className="h-full w-full object-cover"
                  variants={imgMotion} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <motion.div variants={shadeMotion} className="pointer-events-none absolute inset-0 bg-black/30" />
                <motion.div variants={playMotion} className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-stone-900 shadow-[0_0_36px_rgba(249,115,22,0.5)] ring-2 ring-orange-300/70">
                    <svg className="ml-0.5 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </motion.div>
                <span className="absolute left-3 top-3 rounded-full bg-orange-500/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  {recipe.tag}
                </span>
              </div>
              <div className="relative flex flex-1 flex-col px-3 py-1.5">
                <h3 className="font-display text-xs font-semibold leading-snug text-orange-950 lg:text-sm line-clamp-2">{recipe.title}</h3>
                <p className="mt-0.5 text-[0.65rem] text-stone-500">{recipe.time}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {gateUi}
    </FigmaSection>
  )
}
