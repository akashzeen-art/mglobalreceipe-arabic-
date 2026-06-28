import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../components/Footer.jsx'
import { filterCategoryVideos, getCategoryDetail, getVideosForCategory } from '../data/videos.js'
import { shuffle } from '../utils'

const FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'popular', label: 'الأكثر شيوعاً' },
  { id: 'newest', label: 'الأحدث' },
  { id: 'quick', label: 'وصفات سريعة' },
]

const card = { rest: {}, hover: {} }

const imgMotion = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const shadeMotion = {
  rest: { opacity: 0.4 },
  hover: { opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

const playMotion = {
  rest: { scale: 0.85, opacity: 0.75 },
  hover: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  },
}

const listParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

function CategoryPageInner({ slug }) {
  const meta = getCategoryDetail(slug)
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  const [baseList] = useState(() => shuffle(getVideosForCategory(slug)))
  const displayed = useMemo(
    () => filterCategoryVideos(baseList, filter),
    [baseList, filter],
  )

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close])

  if (!meta) return null

  return (
    <>
      <motion.main
        className="min-h-svh"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="px-5 pb-24 pt-[60px] lg:px-[max(20px,calc((100vw-1200px)/2))] lg:pb-28 lg:pt-[100px]">
          <div className="mx-auto w-full max-w-[1200px]">
            <header className="glass-panel-strong rounded-[14px] px-5 py-6 lg:rounded-2xl lg:px-8 lg:py-8">
              <Link
                to="/#categories"
                className="inline-flex items-center gap-2 text-sm font-medium text-orange-700 transition hover:text-orange-900"
              >
                <span aria-hidden>→</span>
                التصنيفات
              </Link>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5"
              >
                <h1 className="font-display text-2xl font-bold tracking-tight text-orange-950 lg:text-4xl">
                  {meta.title}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600 lg:text-lg">
                  {meta.description}
                </p>
              </motion.div>
            </header>

            <div className="mt-10 flex flex-wrap gap-2 lg:mt-10">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ${
                    filter === f.id
                      ? 'border-orange-500/60 bg-orange-100 text-orange-900 shadow-[0_0_24px_-8px_rgba(234,88,12,0.3)]'
                      : 'border-orange-200/60 bg-orange-50/60 text-stone-600 backdrop-blur-md hover:border-orange-400/60 hover:text-orange-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <motion.ul
              key={`${slug}-${filter}`}
              className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6"
              variants={listParent}
              initial="hidden"
              animate="show"
            >
              {displayed.map((item) => (
                <motion.li key={item.id} variants={listItem} className="w-full">
                  <motion.button
                    type="button"
                    variants={card}
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.985 }}
                    className="relative mx-auto w-full cursor-pointer overflow-hidden rounded-[14px] text-left xl:w-[270px] xl:rounded-2xl"
                    onClick={() => setActive(item)}
                  >
                    <div className="glass-panel relative w-full overflow-hidden p-0 shadow-lg shadow-black/20 ring-1 ring-white/5">
                      <span className="relative block h-[180px] w-full overflow-hidden bg-black/50 xl:h-[220px]">
                        <motion.img
                          variants={imgMotion}
                          src={item.thumbnail}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                        <motion.div
                          variants={shadeMotion}
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-orange-900/15"
                        />
                        <motion.div
                          variants={playMotion}
                          className="pointer-events-none absolute inset-0 flex items-center justify-center"
                        >
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-stone-900 shadow-[0_0_40px_rgba(249,115,22,0.45)] ring-2 ring-orange-300/70">
                            <svg
                              className="ml-0.5 h-6 w-6"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </motion.div>
                        <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-medium tabular-nums text-white/95 backdrop-blur-sm">
                          {item.duration}
                        </span>
                      </span>
                      <span className="block h-[56px] px-3 py-2.5 font-display text-[13px] font-medium leading-snug text-orange-950 line-clamp-2 lg:px-4 lg:py-3 lg:text-[14px]">
                        {item.title}
                      </span>
                    </div>
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>

            {displayed.length === 0 && (
              <p className="mt-12 text-center text-stone-500">لا توجد فيديوها لهذا التصفية بعد.</p>
            )}
          </div>
        </div>
      </motion.main>

      <Footer />

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={close}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-orange-200/60 bg-brand-bg shadow-2xl shadow-orange-900/20"
              initial={{ opacity: 0, scale: 0.9, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 18 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                type="button"
                className="absolute right-3 top-3 z-[1] rounded-full border border-orange-300/60 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-900 backdrop-blur-md"
                onClick={close}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.88)' }}
                whileTap={{ scale: 0.96 }}
              >
                إغلاق
              </motion.button>
              <video
                key={active.videoUrl}
                className="aspect-video w-full bg-black object-contain"
                src={active.videoUrl}
                controls
                controlsList="nodownload"
                autoPlay
                playsInline
              />
              <p className="border-t border-orange-200/50 px-4 py-3 text-sm text-stone-600">{active.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  if (!slug || !getCategoryDetail(slug)) {
    return <Navigate to="/" replace />
  }
  return <CategoryPageInner key={slug} slug={slug} />
}
