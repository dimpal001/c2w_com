import React from 'react'
import axios from 'axios'
import MainPage from './HomePageComponents/MainPage'

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

  canonical: 'https://www.clothes2wear.com',
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
      axios.get('https://www.thebmim.com/api/customs/social-links'),
      axios.get('https://www.thebmim.com/api/customs/blogs'),
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
          socialLinks={socialLinks}
          blogs={blogs}
        />
      </div>
    )
  } catch (error) {
    console.log('Error fetching data:', error)
    return <div>Error loading data.</div>
  }
}

export default HomePage
