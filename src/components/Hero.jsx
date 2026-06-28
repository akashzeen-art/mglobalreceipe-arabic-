import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const floatTransition = (delay = 0, duration = 5.2) => ({ duration, repeat: Infinity, ease: 'easeInOut', delay })

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 36, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } } }

const HERO_VIDEO = '/video/20260414-1200-20.4588034.mp4'

function PanAnimation({ onDone }) {
  return (
    <motion.div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-end justify-center" style={{ width: 180, height: 180 }}>
          <motion.div className="absolute text-5xl" style={{ bottom: 72, left: '50%', x: '-50%', transformOrigin: 'center' }}
            animate={{ y: [0, -100, 0], rotateX: [0, 180, 360] }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1], onComplete: onDone }}>🍳</motion.div>
          <motion.div className="absolute text-[110px] leading-none select-none" style={{ bottom: 0, left: '50%', x: '-50%' }}
            animate={{ rotate: [-10, 10, -6, 6, -3, 3, 0] }} transition={{ duration: 1.0, delay: 0.4, ease: 'easeInOut' }}>🍳</motion.div>
        </div>
        <div className="flex gap-3">
          {[0, 0.2, 0.4].map((d, i) => (
            <motion.div key={i} className="h-8 w-1 rounded-full bg-orange-300/60"
              animate={{ y: [0, -24], opacity: [0.7, 0], scaleX: [1, 2] }}
              transition={{ duration: 0.9, delay: d, repeat: 2, ease: 'easeOut' }} />
          ))}
        </div>
        <motion.p className="font-display text-lg font-semibold text-orange-100"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>يلا نطبخ! 🔥</motion.p>
      </div>
    </motion.div>
  )
}

function HeroVideoPlayer() {
  const [playing, setPlaying] = useState(true)
  const videoRef = useRef(null)

  function toggle() {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play(); setPlaying(true) }
  }

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-2xl shadow-2xl shadow-orange-900/20 ring-2 ring-orange-300/30"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-video w-full bg-black/10">
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          className="h-full w-full rounded-2xl object-cover"
          playsInline
          autoPlay
          muted
          loop
          onEnded={() => setPlaying(false)}
        />

        {/* play/pause overlay */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
            <motion.button
              type="button"
              onClick={toggle}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-orange-800 shadow-[0_0_40px_rgba(249,115,22,0.5)] ring-4 ring-orange-300/60"
              whileHover={{ scale: 1.1, boxShadow: '0 0 60px rgba(249,115,22,0.7)' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="ml-1 h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </div>
        )}

        {/* pause button when playing */}
        {playing && (
          <motion.button
            type="button"
            onClick={toggle}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* label */}
      <div className="glass-panel rounded-b-2xl rounded-t-none border-t-0 px-4 py-3">
        <p className="text-sm font-semibold text-orange-900">🍳 شاهد وصفة اليوم</p>
        <p className="text-xs text-stone-500 mt-0.5">اضغط للتشغيل</p>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const [showPan, setShowPan] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.15])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 72])

  function handleExplore(e) { e.preventDefault(); setShowPan(true) }
  function handleDone() { setShowPan(false); document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <section id="home" ref={ref} className="relative flex min-h-[90dvh] items-center overflow-hidden lg:min-h-[100dvh]">
      <AnimatePresence>{showPan && <PanAnimation onDone={handleDone} />}</AnimatePresence>

      {/* floating emojis */}
      <motion.div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ y: parallaxY }} aria-hidden>
        {[
          { emoji: '🍋', left: '3%',  top: '15%', delay: 0,   size: 'text-4xl' },
          { emoji: '🌿', left: '94%', top: '20%', delay: 0.8, size: 'text-3xl' },
          { emoji: '🫒', left: '5%',  top: '75%', delay: 1.4, size: 'text-3xl' },
          { emoji: '✨', left: '92%', top: '78%', delay: 2.1, size: 'text-4xl' },
          { emoji: '🌶️', left: '50%', top: '8%',  delay: 2.5, size: 'text-2xl' },
        ].map(({ emoji, left, top, delay, size }) => (
          <motion.span key={emoji + left} className={`absolute ${size} opacity-25`} style={{ left, top }}
            animate={{ y: [0, -16, 0], rotate: [0, 4, -2, 0] }} transition={floatTransition(delay)}>{emoji}</motion.span>
        ))}
      </motion.div>

      <div className="relative z-[1] w-full px-5 py-16 lg:px-[max(20px,calc((100vw-1200px)/2))] lg:py-24">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* video player — left on desktop */}
            <motion.div
              className="order-2 lg:order-1"
              style={{ opacity: contentOpacity }}
            >
              <HeroVideoPlayer />
            </motion.div>

            {/* text — right on desktop */}
            <motion.div
              className="order-1 text-center lg:order-2 lg:text-right"
              style={{ opacity: contentOpacity, y: contentY }}
            >
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.p variants={item} className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-orange-700/90">
                  طبخ سينمائي
                </motion.p>
                <motion.h1 variants={item} className="font-display text-[36px] font-bold leading-tight tracking-tight text-orange-950 drop-shadow-sm lg:text-[56px] lg:leading-[64px]">
                  أتقن فن الطبخ العربي
                </motion.h1>
                <motion.p variants={item} className="mt-5 text-base leading-relaxed text-stone-700 lg:text-[18px] lg:leading-[1.6]">
                  اكتشف النكهات والوصفات من قلب المطبخ العربي.
                </motion.p>
                <motion.div variants={item} className="mt-8 flex justify-center lg:justify-end">
                  <motion.a href="#explore" onClick={handleExplore}
                    className="inline-flex h-12 w-full max-w-none items-center justify-center rounded-[14px] bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 text-[15px] font-semibold text-white shadow-[0_0_40px_-6px_rgba(234,88,12,0.45)] lg:h-14 lg:w-[200px] lg:max-w-[200px] lg:text-base"
                    whileHover={{ scale: 1.045, boxShadow: '0 0 56px -4px rgba(249,115,22,0.78)' }}
                    whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 380, damping: 22 }}>
                    ابدأ الاستكشاف
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
