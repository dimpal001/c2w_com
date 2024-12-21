import React, { Suspense } from 'react'
import axios from 'axios'
import MainPage from './HomePageComponents/MainPage'
import { api } from './Components/api'

const fetchData = async () => {
  try {
    const endpoints = [
      '/api/customs/showcases/get',
      '/api/customs/hero-sliders/get',
      '/api/customs/trending/get',
      '/api/customs/new-arrivals/get',
      '/api/customs/shop-by-occasion/occasion',
      '/api/customs/exclusive-collections/get',
      '/api/customs/fashion-week/product-week',
      '/api/products/get/filter?searchQuery=&categoryId=&customerTypeId=&minPrice=&maxPrice=&color=&page=1',
      '/api/customs/shop-by-season/get',
      '/api/customs/social-links',
      '/api/customs/blogs',
    ]

    const requests = endpoints.map((endpoint) => axios.get(`${api}${endpoint}`))
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
      socialLinksRes,
      blogsRes,
    ] = await Promise.all(requests)

    return {
      showcases: showcasesRes.data.showcases || [],
      heroSliders: heroSlidersRes.data.heroSliders || [],
      trendingProducts: trendingProductsRes.data.trendingProducts || [],
      newArrivalsProducts: newArrivalsRes.data.newArrivals || [],
      occasionProducts: occasionProductsRes.data || [],
      exclusiveCollections:
        exclusiveCollectionRes.data.exclusiveCollections || [],
      productWeekProducts: productWeekRes.data || [],
      randomProducts: randomProductsRes.data.products || [],
      seasons: seasonsRes.data || [],
      socialLinks: socialLinksRes.data || [],
      blogs: blogsRes.data || [],
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to fetch data from the server.')
  }
}

const HomePage = async () => {
  let data

  try {
    data = await fetchData()
  } catch {
    return (
      <div className='w-screen bg-gradient-to-br from-green-400 to-blue-500 via-indigo-600 text-white flex justify-center items-center h-screen'>
        <p className='text-3xl font-semibold animate__animated animate__flip animate__slow'>
          Hello World
        </p>
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPage {...data} />
    </Suspense>
  )
}

export default HomePage
