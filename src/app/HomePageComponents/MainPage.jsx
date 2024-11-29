import React from 'react'
import Header from '../Components/Header'
import TopSlider from './TopSlider'
import CategoryBar from '../Components/CategoryBar'
import ShowcaseSection from './ShowcaseSection'
import HeroSliderSection from './HeroSliderSection'
import TrendingNowSection from './TrendingNowSection'

const MainPage = () => {
  return (
    <div>
      <TopSlider />
      <Header />
      <CategoryBar />
      <ShowcaseSection />
      <HeroSliderSection />
      <TrendingNowSection />
    </div>
  )
}

export default MainPage
