'use client'

import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import CategoryMenu from './components/categories/CategoryMenu'
import ColorsMenu from './components/colors/ColorsMenu'
import SizeMenu from './components/sizes/SizeMenu'
import AnnouncementBar from './components/announcements/Announcement'
import LogosMenu from './components/logos/LogosMenu'
import CustomerTypeMenu from './components/customer-types/CustomerTypeMenu'

const Page = () => {
  useEffect(() => {
    document.title = 'Menu Management | Clothes2Wear'
  }, [])

  return (
    <Layout>
      <div className='p-6 bg-gray-100'>
        <h2 className='text-xl font-semibold mb-6 text-blue-800'>Menus</h2>
        <div>
          <SizeMenu />
          <ColorsMenu />
          <CustomerTypeMenu />
          <CategoryMenu />
          <AnnouncementBar />
          <LogosMenu />
        </div>
      </div>
    </Layout>
  )
}

export default Page
