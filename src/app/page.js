import React from 'react'
import axios from 'axios'
import MainPage from './HomePageComponents/MainPage'
import Head from 'next/head'
import { api } from './Components/api'

const schemaData = {
  '@context': 'https://schema.org/',
  '@type': 'WebSite',
  name: 'Clothes2Wear',
  url: 'https://www.clothes2wear.com',
  description:
    'Clothes2Wear offers the latest trends in fashion, with the best deals on clothing, shoes, and accessories.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.clothes2wear.com/search',
    'query-input': 'required name=search_term_string',
  },
  logo: 'https://www.clothes2wear.com/logo.png',
  sameAs: [
    'https://www.facebook.com/clothes2wear',
    'https://twitter.com/clothes2wear',
    'https://www.instagram.com/clothes2wear',
    'https://www.linkedin.com/company/clothes2wear',
  ],
  mainEntityOfPage: 'https://www.clothes2wear.com',
  headline: 'Clothes2Wear | Trendy Fashion, Best Deals on Clothing',
}

export const metadata = {
  title: 'Clothes2Wear | Trendy Fashion, Best Deals on Clothing',
  description:
    'Clothes2Wear offers the latest fashion trends, clothing, shoes, and accessories for men and women at the best prices. Shop online now!',
  keywords:
    'clothing, fashion, online shopping, shoes, accessories, latest trends',
  robots: 'index, follow',
  author: 'Clothes2Wear',
  language: 'en',
  viewport: 'width=device-width, initial-scale=1',
  structuredData: schemaData,

  openGraph: {
    title: 'Clothes2Wear | Trendy Fashion, Best Deals on Clothing',
    description:
      'Clothes2Wear offers the latest fashion trends, clothing, shoes, and accessories for men and women at the best prices. Shop online now!',
    url: 'https://www.clothes2wear.com',
    type: 'website',
    site_name: 'Clothes2Wear',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.clothes2wear.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clothes2Wear Fashion Collection',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Clothes2Wear | Trendy Fashion, Best Deals on Clothing',
    description:
      'Clothes2Wear offers the latest fashion trends, clothing, shoes, and accessories for men and women at the best prices. Shop online now!',
    image: 'https://www.clothes2wear.com/twitter-card-image.jpg',
    creator: '@clothes2wear',
  },

  canonical: 'https://www.thebmim.com',
}

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
      socialLinksRes,
      blogsRes,
    ] = await Promise.all([
      axios.get(`${api}/api/customs/showcases/get`),
      axios.get(`${api}/api/customs/hero-sliders/get`),
      axios.get(`${api}/api/customs/trending/get`),
      axios.get(`${api}/api/customs/new-arrivals/get`),
      axios.get(`${api}/api/customs/shop-by-occasion/occasion`),
      axios.get(`${api}/api/customs/exclusive-collections/get`),
      axios.get(`${api}/api/customs/fashion-week/product-week`),
      axios.get(
        `${api}/api/products/get/filter?searchQuery=&categoryId=&customerTypeId=&minPrice=&maxPrice=&color=&page=1`
      ),
      axios.get(`${api}/api/customs/shop-by-season/get`),
      axios.get(`${api}/api/customs/social-links`),
      axios.get(`${api}/api/customs/blogs`),
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
    const socialLinks = socialLinksRes.data || []
    const blogs = blogsRes.data || []
    return (
      <>
        <Head>
          <link rel='canonical' href='https://www.thebmim.com' />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schemaData),
            }}
          />
        </Head>
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
          socialLinks={socialLinks}
          blogs={blogs}
        />
      </>
    )
  } catch (error) {
    console.log('Error fetching data:', error)
    return (
      <div className='w-screen bg-gradient-to-br from-green-400 to-blue-500 via-indigo-600 text-white flex justify-center items-center h-screen'>
        <p className='text-3xl font-semibold animate__animated animate__flip animate__slow'>
          Hello, world 👋
        </p>
      </div>
    )
  }
}

export default HomePage
