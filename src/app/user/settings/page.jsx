import Header from '@/app/Components/Header'
import React from 'react'
import SettingsPage from './SettingsPage'
import Footer from '@/app/Components/Footer'

export const metadata = {
  title: 'Account Settings | Clothes2Wear',
}

const page = () => {
  return (
    <div>
      <Header />
      <SettingsPage />
      <Footer />
    </div>
  )
}

export default page
