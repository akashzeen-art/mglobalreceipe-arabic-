import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COUNTRY_CODE } from '../services/authApi.js'

export default function LoginModal({ open, onClose, onSubmit, loading, error }) {
  const [mobile, setMobile] = useState('')

  useEffect(() => {
    if (!open) setMobile('')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && !loading && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, loading, onClose])

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(mobile)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[400] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !loading && onClose()}
        >
          <motion.div
            className="glass-panel-strong w-full max-w-md px-6 py-8 text-right"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-700/85">تسجيل الدخول</p>
            <h2 id="login-title" className="mt-3 font-display text-2xl font-bold text-orange-950">
              أدخل رقم جوالك
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              أدخل رقمك للوصول إلى محتوى الوصفات والفيديوهات.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="login-mobile" className="mb-2 block text-sm font-medium text-stone-700">
                  رقم الجوال
                </label>
                <div className="flex overflow-hidden rounded-[14px] border border-orange-200/70 bg-white/90 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-300/40">
                  <span className="flex items-center border-l border-orange-200/70 bg-orange-50 px-4 text-sm font-semibold text-orange-900">
                    +{COUNTRY_CODE}
                  </span>
                  <input
                    id="login-mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    required
                    disabled={loading}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/[^\d\s]/g, ''))}
                    placeholder="6XX XXX XXX"
                    className="h-12 min-w-0 flex-1 bg-transparent px-4 text-base text-brand-text outline-none placeholder:text-stone-400"
                    dir="ltr"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row-reverse">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-[14px] bg-gradient-to-r from-orange-600 to-orange-500 text-sm font-semibold text-white shadow-lg shadow-orange-900/20 disabled:opacity-60"
                >
                  {loading ? 'جاري التحقق...' : 'متابعة'}
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={onClose}
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-[14px] border border-orange-200/70 bg-white/80 text-sm font-medium text-stone-700 disabled:opacity-60"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
