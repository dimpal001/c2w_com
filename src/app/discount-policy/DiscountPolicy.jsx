import React from 'react'
import { Tag, Percent, Gift, Info } from 'lucide-react'

const DiscountPolicy = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-green-500 to-blue-600 text-white'>
        <div className='container mx-auto px-6 py-16 md:py-20'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-bold'>Discount Policy</h1>
            <p className='mt-4 text-lg md:text-xl'>
              Learn how discounts and promotional offers work at Clothes2Wear.
            </p>
          </div>
        </div>
      </section>

      {/* Discount Highlights */}
      <section className='container mx-auto px-6 py-12 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-8'>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Tag className='w-12 h-12 text-green-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Exclusive Coupons
            </h3>
            <p className='text-gray-600 mt-2'>
              Use promo codes during checkout to enjoy exclusive discounts.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Percent className='w-12 h-12 text-blue-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Seasonal Offers
            </h3>
            <p className='text-gray-600 mt-2'>
              Get up to 50% off during festive seasons and special events.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Gift className='w-12 h-12 text-pink-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Loyalty Rewards
            </h3>
            <p className='text-gray-600 mt-2'>
              Earn rewards points and redeem them for additional discounts.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Info className='w-12 h-12 text-purple-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Terms Apply
            </h3>
            <p className='text-gray-600 mt-2'>
              Read the terms carefully to know how to apply discounts correctly.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className='bg-gray-100 py-12 md:py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 text-center'>
            Detailed Discount Policy
          </h2>
          <div className='mt-8 space-y-8'>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                1. Eligibility for Discounts
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                Discounts are applicable only to purchases made directly through
                our website at{' '}
                <a
                  href='https://clothes2wear.com'
                  className='text-blue-500 underline'
                >
                  clothes2wear.com
                </a>
                . Offers may vary based on regions, product categories, and
                seasons.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                2. Using Promo Codes
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                Promo codes must be entered during checkout to claim discounts.
                Codes cannot be applied after an order is placed.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                3. Combining Discounts
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                Only one discount or promo code can be used per order. Discounts
                cannot be combined with other offers unless explicitly
                mentioned.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                4. Refunds on Discounted Products
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                If a product purchased with a discount is returned, the refund
                will be based on the discounted price, not the original price.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className='container mx-auto px-6 py-8 text-center'>
        <p className='text-gray-600'>
          Last updated: <span className='font-semibold'>December 11, 2024</span>
        </p>
        <p className='mt-2 text-gray-600'>
          For questions, contact us at{' '}
          <a
            href='mailto:support@clothes2wear.com'
            className='text-green-500 underline'
          >
            support@clothes2wear.com
          </a>{' '}
          or visit our website at{' '}
          <a
            href='https://clothes2wear.com'
            className='text-blue-500 underline'
          >
            clothes2wear.com
          </a>
          .
        </p>
      </section>
    </div>
  )
}

export default DiscountPolicy
