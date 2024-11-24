'use client'

import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import ButtonData from './components/button/ButtonData'
import SearchHintData from './components/search-hint/SearchHintData'
import TrendingLinkData from './components/trending-link/TrendingLinkData'
import ArrivalsLinkData from './components/arrivals-link/ArrivalsLinkData'

const Page = () => {
  useEffect(() => {
    document.title = 'Design Configuration | Clothes2Wear'
  }, [])

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>
            Design Configuration
          </h2>
        </div>

        <div className='flex flex-col gap-2'>
          <ButtonData />
          <SearchHintData />
          <TrendingLinkData />
          <ArrivalsLinkData />y
        </div>
      </div>
    </Layout>
  )
}

export default Page
