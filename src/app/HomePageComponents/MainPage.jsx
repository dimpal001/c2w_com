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
import SocialLinkSection from './SocialLinkSection'
import BlogSection from './BlogSection'
import BestSellerSection from './BestSellerSection'
import Footer from '../Components/Footer'

const MainPage = ({
  showcases,
  heroSliders,
  trendingProducts,
  newArrivalsProducts,
  occasionProducts,
  exclusiveCollections,
  productWeekProducts,
  randomProducts,
  seasons,
  socialLinks,
  blogs,
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
      <ExclusiveCollectionsSection
        products={exclusiveCollections}
        randomProducts={randomProducts}
      />
      <ShopBySeasonSection seasons={seasons} />
      <FashionWeekSection products={productWeekProducts} />
      <SocialLinkSection socialLinks={socialLinks} />
      <BlogSection blogs={blogs} />
      <BestSellerSection />
      <Footer />
    </div>
  )
}

export default MainPage
