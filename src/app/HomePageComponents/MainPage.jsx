/* eslint-disable react/prop-types */
import React, { lazy, Suspense } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CategoryBar from '../Components/CategoryBar'
import TopSlider from './TopSlider'

// Lazy loading sections for improved performance
const ShowcaseSection = lazy(() => import('./ShowcaseSection'))
const HeroSliderSection = lazy(() => import('./HeroSliderSection'))
const TrendingNowSection = lazy(() => import('./TrendingNowSection'))
const NewArrivalsSection = lazy(() => import('./NewArrivalsSection'))
const ShopByOccasion = lazy(() => import('./ShopByOccasion'))
const ExclusiveCollectionsSection = lazy(() =>
  import('./ExclusiveCollectionsSection')
)
const ShopBySeasonSection = lazy(() => import('./ShopBySeasonSection'))
const FashionWeekSection = lazy(() => import('./FashionWeekSection'))
const SocialLinkSection = lazy(() => import('./SocialLinkSection'))
const BlogSection = lazy(() => import('./BlogSection'))
const BestSellerSection = lazy(() => import('./BestSellerSection'))

// Skeleton Loader for fallback during lazy loading
const SkeletonLoader = ({ text }) => (
  <div className='skeleton-loader'>{text || 'Loading...'}</div>
)

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
      {/* Static Components */}
      <TopSlider />
      <Header />
      <CategoryBar />

      {/* Lazy Loaded Sections with Fallback */}
      <Suspense fallback={<SkeletonLoader text='Loading Showcase...' />}>
        <ShowcaseSection showcases={showcases} />
      </Suspense>
      <Suspense fallback={<SkeletonLoader text='Loading Hero Slider...' />}>
        <HeroSliderSection heroSliders={heroSliders} />
      </Suspense>
      <Suspense fallback={<SkeletonLoader text='Loading Trending Now...' />}>
        <TrendingNowSection products={trendingProducts} />
      </Suspense>
      <Suspense fallback={<SkeletonLoader text='Loading New Arrivals...' />}>
        <NewArrivalsSection products={newArrivalsProducts} />
      </Suspense>
      <Suspense
        fallback={<SkeletonLoader text='Loading Shop by Occasion...' />}
      >
        <ShopByOccasion occasions={occasionProducts} />
      </Suspense>
      <Suspense
        fallback={<SkeletonLoader text='Loading Exclusive Collections...' />}
      >
        <ExclusiveCollectionsSection
          products={exclusiveCollections}
          randomProducts={randomProducts}
        />
      </Suspense>
      <Suspense fallback={<SkeletonLoader text='Loading Shop by Season...' />}>
        <ShopBySeasonSection seasons={seasons} />
      </Suspense>
      <Suspense fallback={<SkeletonLoader text='Loading Fashion Week...' />}>
        <FashionWeekSection products={productWeekProducts} />
      </Suspense>
      <Suspense fallback={<SkeletonLoader text='Loading Social Links...' />}>
        <SocialLinkSection socialLinks={socialLinks} />
      </Suspense>
      <Suspense fallback={<SkeletonLoader text='Loading Blogs...' />}>
        <BlogSection blogs={blogs} />
      </Suspense>
      <Suspense fallback={<SkeletonLoader text='Loading Best Sellers...' />}>
        <BestSellerSection />
      </Suspense>

      {/* Static Footer */}
      <Footer />
    </div>
  )
}

export default MainPage
