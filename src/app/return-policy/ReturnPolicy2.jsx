import React from 'react'
import { Box, Truck, RotateCw, CheckCircle } from 'lucide-react'

const ReturnPolicy2 = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-purple-500 to-pink-600 text-white'>
        <div className='container mx-auto px-6 py-16 md:py-20'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-bold'>Return Policy</h1>
            <p className='mt-4 text-lg md:text-xl'>
              Understand our customer-friendly return policy at Clothes2Wear.
            </p>
          </div>
        </div>
      </section>

      {/* Return Highlights */}
      <section className='container mx-auto px-6 py-12 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-8'>
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
      <section className='bg-gray-100 py-12 md:py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 text-center'>
            Detailed Return Policy
          </h2>
          <div className='mt-8 space-y-8'>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                RETURN POLICY
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                We appreciate your shopping with us! We are dedicated to
                providing high-quality clothing at great prices and aim to make
                the return process as straightforward as possible. If you need
                to return an item that doesn’t meet your expectations, please
                follow these steps: ensure the item is in its original, unworn
                condition with all tags attached, locate your receipt or order
                number, and initiate the return online through our website. For
                any questions or assistance, our customer service team is ready
                to help.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>RETURNS</h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                <strong>
                  How can I return an item that doesn&apos;t meet my
                  expectations?
                </strong>{' '}
                Email us at{' '}
                <a
                  href='mailto:contact@clothes2wear.com'
                  className='text-purple-500 underline'
                >
                  contact@clothes2wear.com
                </a>{' '}
                for requesting a return. If you wish to ask for a replacement
                and after thorough verification if the replacement is accepted
                by the concerned team, you will receive a return mailing label
                and instructions on how to send your merchandise. The returned
                goods will not be accepted if the request for replacement is not
                done beforehand.
              </p>
              <p className='text-gray-600 mt-4'>
                <strong>
                  What is the time frame allowed for returning items?
                </strong>{' '}
                Within five working days of delivery, items must be returned for
                exchange or a replacement. To qualify for a replacement, you
                must record an unboxing video upon receiving the product. The
                product must be in its original packaging, unworn, and
                undamaged.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                Condition of the Product
              </h3>
              <ul className='text-gray-600 mt-2 leading-relaxed list-disc list-inside'>
                <li>
                  Please handle clothing items with care during try-ons and
                  ensure they are returned in their original, unused condition,
                  free from any marks, odors, or damage.
                </li>
                <li>
                  Product tags or ticket attachments must be included when
                  returning items in their original packaging.
                </li>
                <li>
                  Since most of our items are hand-embroidered and delicate,
                  occasional displacement of beads or sequins may occur. This is
                  normal and not considered a fault.
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                Product Care
              </h3>
              <ul className='text-gray-600 mt-2 leading-relaxed list-disc list-inside'>
                <li>
                  For the initial wash, please make sure to use &apos;Dry
                  Clean&apos; only.
                </li>
                <li>
                  Items with heavy embroidery must be dry-cleaned exclusively.
                </li>
                <li>
                  Be aware that hand-dyeing methods may affect color permanence
                  and are not guaranteed.
                </li>
              </ul>
            </div>
            <div>
              <p className='text-gray-600 mt-2'>
                <strong>NOTE:</strong> If the conditions mentioned above are not
                fulfilled, the product will not be considered eligible for
                return or replacement. When in doubt, opt for dry cleaning to
                maintain garment quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className='container mx-auto px-6 py-8 text-center'>
        <p className='text-gray-600'>
          Last updated:{' '}
          <span className='font-semibold'>{new Date().toDateString()}</span>
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

export default ReturnPolicy2
