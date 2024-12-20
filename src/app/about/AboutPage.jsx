import React from 'react'
import { ShoppingBag, Smile, Users } from 'lucide-react'
import ShoppingImg from '../../assets/woman.png'
import Image from 'next/image'

const AboutPage = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-pink-600 to-indigo-500 text-white'>
        <div className='container mx-auto px-6 py-16 md:py-20'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-bold'>About Us</h1>
            <p className='mt-4 text-lg md:text-xl'>
              Discover the story behind our brand and our mission to deliver the
              best online shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='container mx-auto px-6 py-12 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
              Our Mission
            </h2>
            <p className='mt-4 text-gray-600 leading-relaxed'>
              At <span>Clothes2Wear</span>, we aim to make online shopping as
              seamless and enjoyable as possible. We curate the best products,
              offer unbeatable prices, and ensure that your needs are our top
              priority.
            </p>
          </div>
          <div className='w-full flex justify-center'>
            <Image
              width={300}
              height={300}
              src={ShoppingImg}
              alt='Our Mission'
              className='rounded-lg'
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='bg-gray-100 py-12 md:py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 text-center'>
            What We Value
          </h2>
          <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
              <div className='flex items-center space-x-3'>
                <ShoppingBag className='w-10 h-10 text-indigo-500' />
                <h3 className='text-lg font-semibold text-gray-800'>
                  Quality Products
                </h3>
              </div>
              <p className='mt-2 text-gray-600'>
                Only the best products, handpicked for you, ensuring the highest
                standards.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
              <div className='flex items-center space-x-3'>
                <Smile className='w-10 h-10 text-green-500' />
                <h3 className='text-lg font-semibold text-gray-800'>
                  Customer Satisfaction
                </h3>
              </div>
              <p className='mt-2 text-gray-600'>
                We are here for you at every step, ensuring a delightful
                shopping experience.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
              <div className='flex items-center space-x-3'>
                <Users className='w-10 h-10 text-pink-500' />
                <h3 className='text-lg font-semibold text-gray-800'>
                  Community Focus
                </h3>
              </div>
              <p className='mt-2 text-gray-600'>
                Building a strong, vibrant community of shoppers and partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='container mx-auto px-6 py-12 md:py-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 text-center'>
          Meet Our Team
        </h2>
        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
          <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <img
              src={`https://picsum.photos/451/520`}
              alt={`Team Member `}
              className='w-24 h-24 mx-auto rounded-full shadow-md'
            />
            <h3 className='mt-4 text-lg font-semibold text-gray-800'>
              Member 1
            </h3>
            <p className='text-gray-600'>CEO & Founder</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <img
              src={`https://picsum.photos/573/520`}
              alt={`Team Member `}
              className='w-24 h-24 mx-auto rounded-full shadow-md'
            />
            <h3 className='mt-4 text-lg font-semibold text-gray-800'>
              Member 2
            </h3>
            <p className='text-gray-600'>Co-Founder</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
            <img
              src={`https://picsum.photos/641/451`}
              alt={`Team Member `}
              className='w-24 h-24 mx-auto rounded-full shadow-md'
            />
            <h3 className='mt-4 text-lg font-semibold text-gray-800'>
              Member 3
            </h3>
            <p className='text-gray-600'>Sales Head</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
