import React from 'react'
import axios from 'axios'
import MainPage from './HomePageComponents/MainPage'

const HomePage = async () => {
  try {
    const [showcasesRes, heroSlidersRes, trendingProductsRes] =
      await Promise.all([
        axios.get('https://www.thebmim.com/api/customs/showcases/get'),
        axios.get('https://www.thebmim.com/api/customs/hero-sliders/get'),
        axios.get('https://www.thebmim.com/api/customs/trending/get'),
      ])

    const showcases = showcasesRes.data.showcases || []
    const heroSliders = heroSlidersRes.data.heroSliders || []
    const trendingProducts = trendingProductsRes.data.trendingProducts || []

    return (
      <div>
        <MainPage
          showcases={showcases}
          heroSliders={heroSliders}
          trendingProducts={trendingProducts}
        />
      </div>
    )
  } catch (error) {
    console.log('Error fetching data:', error)
    return <div>Error loading data.</div>
  }
}

export default HomePage
