import React from 'react'
import { ShoppingBag, Smile, TrendingUp, Globe } from 'lucide-react'

const WhatWeDo = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white'>
        <div className='container mx-auto px-6 py-16 md:py-20'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-bold'>What We Do</h1>
            <p className='mt-4 text-lg md:text-xl'>
              Discover how Clothes2Wear makes fashion accessible, sustainable,
              and exciting for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className='container mx-auto px-6 py-12 md:py-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800'>
          Our Core Services
        </h2>
        <p className='text-center text-gray-600 mt-4'>
          From trendy apparel to a seamless shopping experience, here’s what we
          offer.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-8 mt-12'>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <ShoppingBag className='w-12 h-12 text-purple-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Trendy Apparel
            </h3>
            <p className='text-gray-600 mt-2'>
              We offer the latest fashion trends for men, women, and kids,
              ensuring you stay stylish all year round.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Smile className='w-12 h-12 text-indigo-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Customer Satisfaction
            </h3>
            <p className='text-gray-600 mt-2'>
              Our top priority is making you happy with premium quality products
              and excellent customer service.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <TrendingUp className='w-12 h-12 text-green-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Affordable Pricing
            </h3>
            <p className='text-gray-600 mt-2'>
              Enjoy high-quality clothing at prices that won&apos;t break the
              bank, with frequent sales and discounts.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Globe className='w-12 h-12 text-blue-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Pan-India Delivery
            </h3>
            <p className='text-gray-600 mt-2'>
              Bringing your favorite fashion pieces to your doorstep, anywhere
              in India.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className='bg-gray-100 py-12 md:py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800'>
            Our Mission
          </h2>
          <p className='text-center text-gray-600 mt-4'>
            Revolutionizing fashion to bring joy and comfort to every wardrobe.
          </p>
          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='flex flex-col bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
              <h3 className='text-xl font-semibold text-gray-800'>
                Sustainable Fashion
              </h3>
              <p className='text-gray-600 mt-2'>
                We prioritize environmentally friendly materials and ethical
                production methods to minimize our impact on the planet.
              </p>
            </div>
            <div className='flex flex-col bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
              <h3 className='text-xl font-semibold text-gray-800'>
                Community Support
              </h3>
              <p className='text-gray-600 mt-2'>
                Clothes2Wear actively supports local communities through job
                creation and charitable initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='container mx-auto px-6 py-12 md:py-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800'>
          Why Choose Clothes2Wear?
        </h2>
        <p className='text-center text-gray-600 mt-4'>
          A shopping experience like no other.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mt-12'>
          <div>
            <img
              src='https://via.placeholder.com/600x400'
              alt='Why Choose Us'
              className='rounded-lg shadow'
            />
          </div>
          <div className='flex flex-col justify-center'>
            <ul className='space-y-6'>
              <li className='flex items-start'>
                <span className='w-8 h-8 flex-shrink-0 bg-purple-500 text-white rounded-full flex items-center justify-center'>
                  ✓
                </span>
                <p className='ml-4 text-gray-700'>
                  Unmatched variety of styles and categories.
                </p>
              </li>
              <li className='flex items-start'>
                <span className='w-8 h-8 flex-shrink-0 bg-indigo-500 text-white rounded-full flex items-center justify-center'>
                  ✓
                </span>
                <p className='ml-4 text-gray-700'>
                  Fast and reliable global shipping options.
                </p>
              </li>
              <li className='flex items-start'>
                <span className='w-8 h-8 flex-shrink-0 bg-green-500 text-white rounded-full flex items-center justify-center'>
                  ✓
                </span>
                <p className='ml-4 text-gray-700'>
                  Seamless returns and refund policies.
                </p>
              </li>
              <li className='flex items-start'>
                <span className='w-8 h-8 flex-shrink-0 bg-blue-500 text-white rounded-full flex items-center justify-center'>
                  ✓
                </span>
                <p className='ml-4 text-gray-700'>
                  A customer-first approach in everything we do.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhatWeDo
