/* eslint-disable react/prop-types */
import React from 'react'
import Header from '../Components/Header'
import TopSlider from './TopSlider'
import CategoryBar from '../Components/CategoryBar'
import ShowcaseSection from './ShowcaseSection'
import HeroSliderSection from './HeroSliderSection'
import TrendingNowSection from './TrendingNowSection'
import NewArrivalsSection from './NewArrivalsSection'

const MainPage = ({ showcases, heroSliders, trendingProducts }) => {
  return (
    <div>
      {/* <TopSlider />
      <Header />
      <CategoryBar /> */}
      <ShowcaseSection showcases={showcases} />
      <HeroSliderSection heroSliders={heroSliders} />
      <TrendingNowSection products={trendingProducts} />
      <NewArrivalsSection />
    </div>
  )
}

export default MainPage
