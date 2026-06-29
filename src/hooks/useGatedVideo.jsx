import { useCallback, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import LoginModal from '../components/LoginModal.jsx'
import VideoPlayerModal from '../components/VideoPlayerModal.jsx'

export function useGatedVideo({ playerVariant = 'dark' } = {}) {
  const { isActive, loginWithMobile, verifyAccess } = useAuth()
  const [activeVideo, setActiveVideo] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [pendingVideo, setPendingVideo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const openVideo = useCallback((video) => setActiveVideo(video), [])
  const closeVideo = useCallback(() => setActiveVideo(null), [])

  const closeLogin = useCallback(() => {
    if (loading) return
    setShowLogin(false)
    setPendingVideo(null)
    setError(null)
  }, [loading])

  const requestVideo = useCallback(
    async (video) => {
      setError(null)

      if (isActive) {
        setLoading(true)
        const result = await verifyAccess()
        setLoading(false)

        if (result.active) {
          openVideo(video)
          return
        }

        if (result.redirectURL) {
          window.location.href = result.redirectURL
          return
        }
      }

      setPendingVideo(video)
      setShowLogin(true)
    },
    [isActive, verifyAccess, openVideo],
  )

  const handleLogin = useCallback(
    async (mobile) => {
      setLoading(true)
      setError(null)

      const result = await loginWithMobile(mobile)
      setLoading(false)

      if (result.active) {
        setShowLogin(false)
        if (pendingVideo) {
          openVideo(pendingVideo)
          setPendingVideo(null)
        }
        return
      }

      if (result.redirectURL) {
        window.location.href = result.redirectURL
        return
      }

      setError(result.error ?? 'فشل تسجيل الدخول.')
    },
    [loginWithMobile, pendingVideo, openVideo],
  )

  const gateUi = (
    <>
      <LoginModal
        open={showLogin}
        onClose={closeLogin}
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
      <VideoPlayerModal video={activeVideo} onClose={closeVideo} variant={playerVariant} />
    </>
  )

  return { requestVideo, gateUi, loading }
}
