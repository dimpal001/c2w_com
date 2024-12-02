/* eslint-disable react/prop-types */
import React from 'react'
import Header from '../Components/Header'
import TopSlider from './TopSlider'
import CategoryBar from '../Components/CategoryBar'
import ShowcaseSection from './ShowcaseSection'
import HeroSliderSection from './HeroSliderSection'
import TrendingNowSection from './TrendingNowSection'
import NewArrivalsSection from './NewArrivalsSection'
import ShopByOccasion from './ShopByOccasion'
import ExclusiveCollectionsSection from './ExclusiveCollectionsSection'
import ShopBySeasonSection from './ShopBySeasonSection'
import FashionWeekSection from './FashionWeekSection'

const MainPage = ({
  showcases,
  heroSliders,
  trendingProducts,
  newArrivalsProducts,
  occasionProducts,
  exclusiveCollections,
  productWeekProducts,
}) => {
  return (
    <div>
      <TopSlider />
      <Header />
      <CategoryBar />
      <ShowcaseSection showcases={showcases} />
      <HeroSliderSection heroSliders={heroSliders} />
      <TrendingNowSection products={trendingProducts} />
      <NewArrivalsSection products={newArrivalsProducts} />
      <ShopByOccasion occasions={occasionProducts} />
      <ExclusiveCollectionsSection products={exclusiveCollections} />
      <ShopBySeasonSection />
      <FashionWeekSection products={productWeekProducts} />
    </div>
  )
}

export default MainPage
