import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import About from '../components/About.jsx'
import Benefits from '../components/Benefits.jsx'
import Categories from '../components/Categories.jsx'
import CookingDivider from '../components/CookingDivider.jsx'
import BubblingPot from '../components/BubblingPot.jsx'
import ChoppingKnife from '../components/ChoppingKnife.jsx'
import SpiceSprinkle from '../components/SpiceSprinkle.jsx'
import FeaturedRecipes from '../components/FeaturedRecipes.jsx'
import Footer from '../components/Footer.jsx'
import Hero from '../components/Hero.jsx'
import VideoGallery from '../components/VideoGallery.jsx'

export default function HomePage() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/' || !hash) return
    const id = hash.replace('#', '')
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [hash, pathname])

  return (
    <>
      <main>
        <Hero />
        <ChoppingKnife />
        <FeaturedRecipes />
        <BubblingPot />
        <Categories />
        <SpiceSprinkle />
        <VideoGallery />
        <CookingDivider />
        <About />
        <ChoppingKnife />
        <Benefits />
        <BubblingPot />
      </main>
      <Footer />
    </>
  )
}
