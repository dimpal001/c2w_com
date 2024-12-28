import React from 'react'
import Header from '../Components/Header'
import ContactUs from './Contact'
import Footer from '../Components/Footer'

export const metadata = {
  title: 'Contact Us | Clothes2Wear',
  description:
    'Get in touch with Clothes2Wear for any queries, support, or feedback. We are here to assist you with your online shopping experience.',
  keywords:
    'Contact Clothes2Wear, customer support, fashion inquiries, online shopping help, feedback, Clothes2Wear contact details',
  author: 'Clothes2Wear',
  robots: 'index, follow',
  charset: 'UTF-8',
}

const page = () => {
  return (
    <div>
      <Header />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default page
