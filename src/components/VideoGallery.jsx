import { useState } from 'react'
import { motion } from 'framer-motion'
import { GALLERY_VIDEOS } from '../config'
import { FigmaSection } from './FigmaLayout.jsx'
import { useGatedVideo } from '../hooks/useGatedVideo.jsx'
import { shuffle } from '../utils'

const card = { rest:{}, hover:{} }
const imgMotion = { rest:{ scale:1 }, hover:{ scale:1.06, transition:{ duration:0.5, ease:[0.22,1,0.36,1] } } }
const shadeMotion = { rest:{ opacity:0 }, hover:{ opacity:1, transition:{ duration:0.38, ease:[0.22,1,0.36,1] } } }
const playMotion = { rest:{ scale:0.55, opacity:0 }, hover:{ scale:1, opacity:1, transition:{ type:'spring', stiffness:420, damping:20 } } }

export default function VideoGallery() {
  const [videos] = useState(() => shuffle(GALLERY_VIDEOS))
  const { requestVideo, gateUi, loading } = useGatedVideo()

  return (
    <FigmaSection id="gallery">
      <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, margin:'-12%' }} transition={{ duration:0.65, ease:[0.22,1,0.36,1] }} className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-700/85">في المطبخ</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-orange-950 lg:text-4xl">معرض الفيديوهات</h2>
        <p className="mx-auto mt-4 max-w-xl text-stone-600">مرّر المؤشر للتشغيل — اضغط للعرض بالشاشة الكاملة.</p>
      </motion.div>

      <ul className="mt-10 grid grid-cols-2 gap-5 xl:grid-cols-4">
        {videos.map((item, i) => (
          <motion.li key={item.id} initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:'-6%' }} transition={{ duration:0.5, delay:i*0.05, ease:[0.22,1,0.36,1] }} className="w-full">
            <motion.button type="button" variants={card} initial="rest" whileHover="hover" whileTap={{ scale:0.985 }}
              className="relative mx-auto w-full cursor-pointer overflow-hidden rounded-[14px] text-left xl:w-[270px] xl:rounded-2xl"
              onClick={() => !loading && requestVideo(item)}>
              <div className="glass-panel relative w-full overflow-hidden p-0">
                <span className="relative block h-[110px] w-full overflow-hidden bg-black/50 xl:h-[180px]">
                  <motion.img variants={imgMotion} src={item.thumb} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  <motion.div variants={shadeMotion} className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <motion.div variants={playMotion} className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-stone-900 shadow-[0_0_36px_rgba(249,115,22,0.5)] ring-2 ring-orange-300/70">
                      <svg className="ml-0.5 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </motion.div>
                  <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-medium tabular-nums text-white/95 backdrop-blur-sm">{item.duration}</span>
                </span>
                <span className="block px-3 py-2.5 font-display text-[15px] font-medium leading-snug text-orange-950 lg:px-4 lg:py-3 lg:text-lg">{item.title}</span>
              </div>
            </motion.button>
          </motion.li>
        ))}
      </ul>

      {gateUi}
    </FigmaSection>
  )
}
