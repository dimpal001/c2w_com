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
      randomProductsRes,
      seasonsRes,
    ] = await Promise.all([
      axios.get('https://www.thebmim.com/api/customs/showcases/get'),
      axios.get('https://www.thebmim.com/api/customs/hero-sliders/get'),
      axios.get('https://www.thebmim.com/api/customs/trending/get'),
      axios.get('https://www.thebmim.com/api/customs/new-arrivals/get'),
      axios.get(
        'https://www.thebmim.com/api/customs/shop-by-occasion/occasion'
      ),
      axios.get(
        'https://www.thebmim.com/api/customs/exclusive-collections/get'
      ),
      axios.get(
        'https://www.thebmim.com/api/customs/fashion-week/product-week'
      ),
      axios.get(
        'https://www.thebmim.com/api/products/get/filter?searchQuery=&categoryId=&customerTypeId=&minPrice=&maxPrice=&color=&page=1'
      ),
      axios.get('https://www.thebmim.com/api/customs/shop-by-season/get'),
    ])

    const showcases = showcasesRes.data.showcases || []
    const heroSliders = heroSlidersRes.data.heroSliders || []
    const trendingProducts = trendingProductsRes.data.trendingProducts || []
    const newArrivalsProducts = newArrivalsRes.data.newArrivals || []
    const occasionProducts = occasionProductsRes.data || []
    const exclusiveCollections =
      exclusiveCollectionRes.data.exclusiveCollections || []
    const productWeekProducts = productWeekRes.data || []
    const randomProducts = randomProductsRes.data.products || []
    const seasons = seasonsRes.data || []
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
          randomProducts={randomProducts}
          seasons={seasons}
        />
      </div>
    )
  } catch (error) {
    console.log('Error fetching data:', error)
    return <div>Error loading data.</div>
  }
}

export default HomePage
