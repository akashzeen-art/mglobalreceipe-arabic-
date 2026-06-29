import { useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function getVideoUrl(video) {
  return video?.videoUrl ?? video?.src ?? ''
}

export default function VideoPlayerModal({ video, onClose, variant = 'dark' }) {
  const close = useCallback(() => onClose?.(), [onClose])
  const url = getVideoUrl(video)

  useEffect(() => {
    if (!video) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [video, close])

  const isLight = variant === 'light'

  return (
    <AnimatePresence>
      {video && url && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className={`relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl ${
              isLight
                ? 'border border-orange-200/60 bg-brand-bg shadow-orange-900/20'
                : 'border border-white/15 bg-black/90'
            }`}
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              type="button"
              className={
                isLight
                  ? 'absolute right-3 top-3 z-[1] rounded-full border border-orange-300/60 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-900 backdrop-blur-md'
                  : 'absolute right-3 top-3 z-[1] rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-md'
              }
              onClick={close}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              إغلاق
            </motion.button>
            <video
              key={url}
              className="aspect-video w-full bg-black object-contain"
              src={url}
              controls
              controlsList="nodownload"
              autoPlay
              playsInline
            />
            <p
              className={
                isLight
                  ? 'border-t border-orange-200/50 px-4 py-3 text-sm text-stone-600'
                  : 'border-t border-white/10 px-4 py-3 text-sm text-white/70'
              }
            >
              {video.title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
