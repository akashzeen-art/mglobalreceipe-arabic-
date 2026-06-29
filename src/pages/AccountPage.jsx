import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'
import { COUNTRY_CODE } from '../services/authApi.js'
import LoginModal from '../components/LoginModal.jsx'
import Footer from '../components/Footer.jsx'

function DetailRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1 border-b border-orange-100/80 py-4 sm:flex-row sm:items-center sm:justify-between">
      <dt className="text-sm font-medium text-stone-500">{label}</dt>
      <dd className="text-sm font-semibold text-orange-950" dir="ltr">
        {value}
      </dd>
    </div>
  )
}

export default function AccountPage() {
  const { session, isActive, loginWithMobile } = useAuth()
  const [showLogin, setShowLogin] = useState(!isActive)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleLogin(mobile) {
    setLoading(true)
    setError(null)

    const result = await loginWithMobile(mobile)
    setLoading(false)

    if (result.active) {
      setShowLogin(false)
      return
    }

    if (result.redirectURL) {
      window.location.href = result.redirectURL
      return
    }

    setError(result.error ?? 'فشل تسجيل الدخول.')
  }

  function handleUnsubscribe() {
    if (session?.unsubUrl) {
      window.location.href = session.unsubUrl
    }
  }

  return (
    <>
      <main className="min-h-[60svh] px-5 py-12 lg:px-[max(20px,calc((100vw-1200px)/2))] lg:py-16">
        <div className="mx-auto max-w-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-700/85">حسابي</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-orange-950">إدارة الاشتراك</h1>

            {isActive && session ? (
              <div className="glass-panel-strong mt-8 px-6 py-6">
                <dl>
                  <DetailRow label="رقم الجوال" value={`+${session.msisdn}`} />
                  <DetailRow label="حالة الاشتراك" value="نشط" />
                  <DetailRow label="تاريخ التفعيل" value={session.actDate} />
                  <DetailRow label="تاريخ التجديد" value={session.renewDate} />
                  <DetailRow label="السعر" value={session.pricePoint} />
                  <DetailRow label="الصلاحية" value={session.validity ? `${session.validity} يوم` : null} />
                </dl>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleUnsubscribe}
                    className="inline-flex h-12 w-full items-center justify-center rounded-[14px] border border-red-300/70 bg-red-50 text-sm font-semibold text-red-800 transition hover:bg-red-100"
                  >
                    Unsubscribe
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-panel mt-8 px-6 py-8 text-center">
                <p className="text-stone-600">سجّل الدخول برقم جوالك (+{COUNTRY_CODE}) للوصول إلى المحتوى.</p>
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-[14px] bg-gradient-to-r from-orange-600 to-orange-500 px-8 text-sm font-semibold text-white"
                >
                  تسجيل الدخول
                </button>
              </div>
            )}

            <p className="mt-8 text-center text-sm text-stone-500">
              <Link to="/" className="font-medium text-orange-800 hover:underline">
                العودة إلى الرئيسية
              </Link>
            </p>
          </motion.div>
        </div>
      </main>

      <LoginModal
        open={showLogin && !isActive}
        onClose={() => setShowLogin(false)}
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />

      <Footer />
    </>
  )
}
