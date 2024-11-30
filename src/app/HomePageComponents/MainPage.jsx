import React from 'react'
import Header from '../Components/Header'
import TopSlider from './TopSlider'
import CategoryBar from '../Components/CategoryBar'
import ShowcaseSection from './ShowcaseSection'
import HeroSliderSection from './HeroSliderSection'

const MainPage = () => {
  return (
    <div>
      <TopSlider />
      <Header />
      <CategoryBar />
      <ShowcaseSection />
      <HeroSliderSection />
    </div>
  )
}

export default MainPage
