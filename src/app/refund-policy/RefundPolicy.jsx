import React from 'react'
import { RotateCw, CreditCard, ShoppingBag, HelpCircle } from 'lucide-react'

const RefundPolicy = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-green-500 to-blue-600 text-white'>
        <div className='container mx-auto px-6 py-16 lg:py-20'>
          <div className='text-center'>
            <h1 className='text-4xl lg:text-5xl font-bold'>Refund Policy</h1>
            <p className='mt-4 text-lg lg:text-xl'>
              Learn about our hassle-free refund process at Clothes2Wear.
            </p>
          </div>
        </div>
      </section>

      {/* Refund Highlights */}
      <section className='container mx-auto px-6 py-12 lg:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <RotateCw className='w-12 h-12 text-green-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Easy Returns
            </h3>
            <p className='text-gray-600 mt-2'>
              Return items within 15 days for a hassle-free refund.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <CreditCard className='w-12 h-12 text-blue-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Quick Refunds
            </h3>
            <p className='text-gray-600 mt-2'>
              Refunds are processed within 5-7 business days.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <ShoppingBag className='w-12 h-12 text-indigo-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Product Condition
            </h3>
            <p className='text-gray-600 mt-2'>
              Ensure items are unused and in original packaging.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <HelpCircle className='w-12 h-12 text-teal-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Support
            </h3>
            <p className='text-gray-600 mt-2'>
              Contact us for assistance at{' '}
              <a
                href='mailto:support@clothes2wear.com'
                className='text-blue-500 underline'
              >
                support@clothes2wear.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className='bg-gray-100 py-12 lg:py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 text-center'>
            Detailed Refund Policy
          </h2>
          <div className='mt-8 space-y-8'>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                1. Eligibility for Refund
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                Items must be returned within 15 days of delivery. Products
                should be in unused condition with all original tags, labels,
                and packaging intact.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                2. Non-Refundable Items
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                The following items are not eligible for refunds: gift cards,
                items on final sale, and damaged or used products.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                3. Refund Process
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                Once we receive the returned item, it will be inspected.
                Approved refunds will be processed within 5-7 business days to
                your original payment method.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                4. Return Shipping
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                Customers are responsible for return shipping costs unless the
                product is defective or the wrong item was shipped.
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
          For questions, reach out to us at{' '}
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

export default RefundPolicy
