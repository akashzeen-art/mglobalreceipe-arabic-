import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { to: '/', label: 'الرئيسية' },
  { to: '/#explore', label: 'استكشف' },
  { to: '/#categories', label: 'التصنيفات' },
]

const linkClass =
  'group relative py-1 text-[15px] font-medium leading-none text-stone-700 transition-colors hover:text-orange-800'

function NavLink({ to, label }) {
  return (
    <Link to={to} className={linkClass} onClick={() => window.scrollTo(0, 0)}>
      <span className="relative z-10">{label}</span>
      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const closeMenu = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && closeMenu()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeMenu])

  return (
    <motion.header
      className={`sticky top-0 z-[120] border-b transition-colors duration-500 ${
        scrolled
          ? 'border-orange-200/60 bg-brand-bg/80 shadow-md shadow-orange-900/10 backdrop-blur-2xl'
          : 'border-transparent bg-transparent'
      }`}
      initial={false}
    >
      <div className="px-5 lg:px-[max(20px,calc((100vw-1200px)/2))]">
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 md:h-20">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/" onClick={closeMenu} aria-label="الرئيسية">
              <img
                src="/logo/4.png"
                alt="Global Recipe"
                className="h-8 w-auto md:h-10"
              />
            </Link>
          </motion.div>

          <ul className="hidden items-center gap-10 md:flex">
            {LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} label={label} />
              </li>
            ))}
          </ul>

          <motion.button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-orange-300/60 bg-orange-50/80 text-orange-900 backdrop-blur-md md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">القائمة</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </nav>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-nav"
            className="overflow-hidden border-t border-orange-200/50 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-0.5 px-5 py-4">
              {LINKS.map(({ to, label }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={to}
                    className="block rounded-[14px] px-4 py-3 text-[15px] font-medium text-stone-700 transition hover:bg-orange-100/70"
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
