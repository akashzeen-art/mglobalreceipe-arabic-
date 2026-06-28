import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const PRELOADER_VIDEO = 'https://vz-60dece12-bb8.b-cdn.net/7d7efad5-e59f-4e42-b53e-14190f9dd352/play_360p.mp4'
const DISPLAY_MS = 6000
const FADE_MS = 1000

export default function Preloader({ onComplete }) {
  const [fading, setFading] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), DISPLAY_MS)
    const t2 = setTimeout(() => onComplete?.(), DISPLAY_MS + FADE_MS)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[500] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* full-screen preloader video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={PRELOADER_VIDEO}
        autoPlay
        muted
        playsInline
        loop
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* centered content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-5"
        >
          <img
            src="/logo/4.png"
            alt="Global Recipe"
            className="h-20 w-auto drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)] sm:h-28"
          />
          <p className="text-base font-medium tracking-wide text-white/80">
            أتقن فن الطبخ العربي 🍳
          </p>
        </motion.div>

        {/* progress bar */}
        <motion.div className="h-[3px] w-48 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: DISPLAY_MS / 1000, ease: 'linear' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
