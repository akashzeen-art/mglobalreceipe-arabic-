import { useCallback, useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Preloader from './components/Preloader.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import CookingParticles from './components/CookingParticles.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import HomePage from './pages/HomePage.jsx'
import AccountPage from './pages/AccountPage.jsx'

const VISITED_KEY = 'ar_cooking_visited'

export default function App() {
  const isFirstVisit = useMemo(() => !localStorage.getItem(VISITED_KEY), [])
  const [showPreloader, setShowPreloader] = useState(isFirstVisit)

  const onPreloaderComplete = useCallback(() => {
    localStorage.setItem(VISITED_KEY, '1')
    setShowPreloader(false)
  }, [])

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    const onPageShow = () => window.scrollTo(0, 0)
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  return (
    <div className="relative min-h-svh bg-brand-bg text-brand-text antialiased">

      {/* preloader — first visit only */}
      {showPreloader && <Preloader onComplete={onPreloaderComplete} />}

      <CookingParticles />

      <div className="relative z-10">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
    </div>
  )
}
