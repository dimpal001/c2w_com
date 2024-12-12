import React from 'react'
import { Box, Truck, RotateCw, CheckCircle } from 'lucide-react'

const ReturnPolicy = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-purple-500 to-pink-600 text-white'>
        <div className='container mx-auto px-6 py-16 lg:py-20'>
          <div className='text-center'>
            <h1 className='text-4xl lg:text-5xl font-bold'>Return Policy</h1>
            <p className='mt-4 text-lg lg:text-xl'>
              Understand our customer-friendly return policy at Clothes2Wear.
            </p>
          </div>
        </div>
      </section>

      {/* Return Highlights */}
      <section className='container mx-auto px-6 py-12 lg:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Box className='w-12 h-12 text-purple-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Original Packaging
            </h3>
            <p className='text-gray-600 mt-2'>
              Products must be returned in their original condition and
              packaging.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Truck className='w-12 h-12 text-pink-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Free Returns
            </h3>
            <p className='text-gray-600 mt-2'>
              We offer free return shipping on eligible orders.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <RotateCw className='w-12 h-12 text-indigo-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Return Window
            </h3>
            <p className='text-gray-600 mt-2'>
              Return items within 30 days of delivery for a full refund.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <CheckCircle className='w-12 h-12 text-green-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Inspection Guarantee
            </h3>
            <p className='text-gray-600 mt-2'>
              Returns are inspected and processed within 5 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className='bg-gray-100 py-12 lg:py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 text-center'>
            Detailed Return Policy
          </h2>
          <div className='mt-8 space-y-8'>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                1. Eligibility for Returns
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                Products must be returned within 30 days of receipt. The item
                should be unused, unwashed, and in its original packaging with
                all tags intact.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                2. Non-Returnable Items
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                The following items are not eligible for return: final sale
                items, undergarments, customized items, and gift cards.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                3. Return Process
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                To initiate a return, visit our returns page at{' '}
                <a
                  href='https://clothes2wear.com/returns'
                  className='text-purple-500 underline'
                >
                  clothes2wear.com/returns
                </a>{' '}
                and follow the instructions provided. Once your return is
                approved, you will receive a prepaid return label.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                4. Refund Timeline
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                Refunds will be processed to your original payment method within
                5-7 business days after the returned item is inspected and
                approved.
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
            href='mailto:returns@clothes2wear.com'
            className='text-pink-500 underline'
          >
            returns@clothes2wear.com
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

export default ReturnPolicy
