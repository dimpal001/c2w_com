import React from 'react'
import { ShieldCheck, ClipboardList, Mail, FileText } from 'lucide-react'

const TermsAndConditions = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-tl from-pink-500 to-teal-500 text-white'>
        <div className='container mx-auto px-6 py-16 lg:py-20'>
          <div className='text-center'>
            <h1 className='text-4xl lg:text-5xl font-bold'>
              Terms & Conditions
            </h1>
            <p className='mt-4 text-lg lg:text-xl'>
              Learn more about our policies and your responsibilities as a
              valued customer.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Overview */}
      <section className='container mx-auto px-6 py-12 lg:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <ShieldCheck className='w-12 h-12 text-teal-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              User Protection
            </h3>
            <p className='text-gray-600 mt-2'>
              Your data is secure with us, and we adhere to strict privacy
              standards.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <ClipboardList className='w-12 h-12 text-blue-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              User Responsibility
            </h3>
            <p className='text-gray-600 mt-2'>
              Ensure compliance with our guidelines when using our services.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <FileText className='w-12 h-12 text-indigo-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Terms Updates
            </h3>
            <p className='text-gray-600 mt-2'>
              Stay updated with changes to our terms and conditions.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <Mail className='w-12 h-12 text-pink-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Contact Us
            </h3>
            <p className='text-gray-600 mt-2'>
              Reach out for any queries or support at{' '}
              <a
                href='mailto:support@shopease.com'
                className='text-teal-500 underline'
              >
                support@clothes2wear.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className='bg-gray-100 py-12 lg:py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 text-center'>
            Our Terms in Detail
          </h2>
          <div className='mt-8 space-y-8'>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                1. Introduction
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                By accessing our website, you agree to abide by the terms and
                conditions outlined here. If you disagree with any part of the
                terms, please discontinue using our site.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                2. User Responsibilities
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                You are responsible for maintaining the confidentiality of your
                account information and ensuring its security. Any unauthorized
                activity on your account is your responsibility.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                3. Privacy Policy
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                We value your privacy and are committed to protecting your
                personal data. For more details, please read our Privacy Policy.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>
                4. Limitation of Liability
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                Our platform is provided as is without any warranties or
                guarantees. We are not liable for any damages arising from the
                use of our services.
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
      </section>
    </div>
  )
}

export default TermsAndConditions
