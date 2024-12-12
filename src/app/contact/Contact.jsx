import React from 'react'
import { Phone, MapPin, Mail } from 'lucide-react'

const ContactUs = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-blue-500 to-teal-500 text-white'>
        <div className='container mx-auto px-6 py-16 lg:py-20'>
          <div className='text-center'>
            <h1 className='text-4xl lg:text-5xl font-bold'>Contact Us</h1>
            <p className='mt-4 text-lg lg:text-xl'>
              We would love to hear from you! Reach out to us for any inquiries
              or assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className='container mx-auto px-6 py-12 lg:py-16'>
        <h2 className='text-3xl lg:text-4xl font-bold text-center text-gray-800'>
          Get in Touch
        </h2>
        <p className='text-center text-gray-600 mt-4'>
          Our team is here to help! Choose the best method to contact us.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12'>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-xl transition'>
            <Phone className='w-12 h-12 text-teal-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Call Us
            </h3>
            <p className='text-gray-600 mt-2'>Reach us at: +1 234 567 890</p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-xl transition'>
            <MapPin className='w-12 h-12 text-blue-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Visit Us
            </h3>
            <p className='text-gray-600 mt-2'>
              123 Maligaon, Guwahati, Assam, India
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-xl transition'>
            <Mail className='w-12 h-12 text-purple-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Email Us
            </h3>
            <p className='text-gray-600 mt-2'>contact@clothes2wear.com</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className='bg-gray-100 py-12 lg:py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl lg:text-4xl font-bold text-center text-gray-800'>
            Send Us a Message
          </h2>
          <p className='text-center text-gray-600 mt-4'>
            Have a question? Fill out the form below, and our team will get back
            to you as soon as possible.
          </p>
          <div className='mt-8'>
            <form className='max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    className='block text-gray-700 font-semibold'
                    htmlFor='name'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    placeholder='Enter your full name'
                    className='mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  />
                </div>
                <div>
                  <label
                    className='block text-gray-700 font-semibold'
                    htmlFor='email'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    placeholder='Enter your email'
                    className='mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                  />
                </div>
              </div>
              <div>
                <label
                  className='block text-gray-700 font-semibold'
                  htmlFor='message'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  rows='6'
                  placeholder='Write your message'
                  className='mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                ></textarea>
              </div>
              <div className='text-center'>
                <button
                  type='submit'
                  className='w-full py-3 px-6 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-300'
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactUs
