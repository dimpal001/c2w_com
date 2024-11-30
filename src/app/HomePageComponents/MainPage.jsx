'use client'

/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import TopSlider from './TopSlider'
import CategoryBar from '../Components/CategoryBar'
import ShowcaseSection from './ShowcaseSection'
import HeroSliderSection from './HeroSliderSection'
import TrendingNowSection from './TrendingNowSection'
import NewArrivalsSection from './NewArrivalsSection'

const MainPage = ({ showcases, heroSliders, trendingProducts }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {show && (
        <div>
          <TopSlider />
          <Header />
          <CategoryBar />
          <ShowcaseSection showcases={showcases} />
          <HeroSliderSection heroSliders={heroSliders} />
          <TrendingNowSection products={trendingProducts} />
          <NewArrivalsSection />
        </div>
      )}
    </div>
  )
}

export default MainPage
