import React from 'react'
import axios from 'axios'
import MainPage from './HomePageComponents/MainPage'

const HomePage = async () => {
  try {
    const [
      showcasesRes,
      heroSlidersRes,
      trendingProductsRes,
      newArrivalsRes,
      occasionProductsRes,
      exclusiveCollectionRes,
      productWeekRes,
    ] = await Promise.all([
      axios.get('http://192.168.1.21:3000/api/customs/showcases/get'),
      axios.get('http://192.168.1.21:3000/api/customs/hero-sliders/get'),
      axios.get('http://192.168.1.21:3000/api/customs/trending/get'),
      axios.get('http://192.168.1.21:3000/api/customs/new-arrivals/get'),
      axios.get(
        'http://192.168.1.21:3000/api/customs/shop-by-occasion/occasion'
      ),
      axios.get(
        'http://192.168.1.21:3000/api/customs/exclusive-collections/get'
      ),
      axios.get(
        'http://192.168.1.21:3000/api/customs/fashion-week/product-week'
      ),
    ])

    const showcases = showcasesRes.data.showcases || []
    const heroSliders = heroSlidersRes.data.heroSliders || []
    const trendingProducts = trendingProductsRes.data.trendingProducts || []
    const newArrivalsProducts = newArrivalsRes.data.newArrivals || []
    const occasionProducts = occasionProductsRes.data || []
    const exclusiveCollections =
      exclusiveCollectionRes.data.exclusiveCollections || []
    const productWeekProducts = productWeekRes.data || []
    return (
      <div>
        <MainPage
          showcases={showcases}
          heroSliders={heroSliders}
          trendingProducts={trendingProducts}
          newArrivalsProducts={newArrivalsProducts}
          occasionProducts={occasionProducts}
          exclusiveCollections={exclusiveCollections}
          productWeekProducts={productWeekProducts}
        />
      </div>
    )
  } catch (error) {
    console.log('Error fetching data:', error)
    return <div>Error loading data.</div>
  }
}

export default HomePage
