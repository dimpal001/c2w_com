import React from 'react'
import { Lock, Eye, ShieldCheck, Globe } from 'lucide-react'

const PrivacyPolicy = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-purple-500 to-pink-600 text-white'>
        <div className='container mx-auto px-6 py-16 md:py-20'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-bold'>Privacy Policy</h1>
            <p className='mt-4 text-lg md:text-xl'>
              Learn how we collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Highlights */}
      <section className='container mx-auto px-6 py-12 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-8'>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Lock className='w-12 h-12 text-purple-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Secure Data
            </h3>
            <p className='text-gray-600 mt-2'>
              Your personal information is encrypted and stored securely.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Eye className='w-12 h-12 text-pink-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Transparency
            </h3>
            <p className='text-gray-600 mt-2'>
              We are open about how we use your data and ensure transparency.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <ShieldCheck className='w-12 h-12 text-indigo-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Data Protection
            </h3>
            <p className='text-gray-600 mt-2'>
              Our systems are designed to protect your data from unauthorized
              access.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Globe className='w-12 h-12 text-teal-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Global Compliance
            </h3>
            <p className='text-gray-600 mt-2'>
              We comply with international privacy standards and laws.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className='bg-gray-100 py-12 md:py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 text-center'>
            Our Privacy Practices
          </h2>
          <div className='mt-8 space-y-8'>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                1. Information Collection
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                We collect personal information such as your name, email
                address, and payment details to provide our services
                effectively. This information is obtained through forms,
                cookies, and third-party integrations.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                2. Use of Information
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                Your information is used to process orders, improve our
                services, and send promotional offers. We do not sell your data
                to third parties.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                3. Data Sharing
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                We share data with trusted partners such as payment processors
                and delivery services, ensuring they adhere to strict privacy
                standards.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                4. Your Rights
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                You have the right to access, modify, or delete your personal
                data. Contact us to exercise your rights.
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
          If you have any questions, email us at{' '}
          <a
            href='mailto:support@clothes2wear.com'
            className='text-pink-500 underline'
          >
            support@clothes2wear.com
          </a>
          .
        </p>
      </section>
    </div>
  )
}

export default PrivacyPolicy
