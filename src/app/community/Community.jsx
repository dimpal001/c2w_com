import { Heart, MessageCircle, Share2, Users } from 'lucide-react'
import React from 'react'

const Community = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white'>
        <div className='container mx-auto px-6 py-16 md:py-20 text-center'>
          <h1 className='text-4xl md:text-5xl font-bold'>
            Join the Clothes2Wear Community
          </h1>
          <p className='mt-4 text-lg md:text-xl'>
            Be part of our growing family of fashion enthusiasts. Share,
            connect, and stay updated with the latest trends and deals!
          </p>
        </div>
      </section>

      {/* Why Join Section */}
      <section className='container mx-auto px-6 py-12 md:py-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800'>
          Why Join Our Community?
        </h2>
        <p className='text-center text-gray-600 mt-4'>
          Our community is all about connecting with like-minded people who
          share your love for fashion. Here&apos;s why you should join:
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-12 mt-12'>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition'>
            <Users className='w-16 h-16 text-indigo-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Connect with People
            </h3>
            <p className='text-gray-600 mt-2'>
              Meet other fashion lovers, share your style, and make lasting
              connections.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition'>
            <Heart className='w-16 h-16 text-pink-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Exclusive Offers
            </h3>
            <p className='text-gray-600 mt-2'>
              Get access to exclusive deals and discounts only available to our
              community members.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition'>
            <MessageCircle className='w-16 h-16 text-green-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Engage with Us
            </h3>
            <p className='text-gray-600 mt-2'>
              Join discussions, ask questions, and stay informed about the
              latest trends.
            </p>
          </div>
          <div className='flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition'>
            <Share2 className='w-16 h-16 text-yellow-500' />
            <h3 className='text-lg font-semibold text-gray-800 mt-4'>
              Share Your Style
            </h3>
            <p className='text-gray-600 mt-2'>
              Share your fashion tips, photos, and experiences with the
              community and inspire others.
            </p>
          </div>
        </div>
      </section>

      {/* Community Highlights Section */}
      <section className='bg-gray-100 py-12 md:py-16'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
            Community Highlights
          </h2>
          <p className='text-gray-600 mt-4'>
            Here are just a few of the amazing things happening in our
            community!
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-12 mt-12'>
            <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition'>
              <img
                src='https://via.placeholder.com/500x300'
                alt='Community Event'
                className='w-full h-56 object-cover rounded-lg'
              />
              <h3 className='text-xl font-semibold text-gray-800 mt-4'>
                Fashion Week Highlights
              </h3>
              <p className='text-gray-600 mt-2'>
                Our community members rocked the latest fashion trends during
                Fashion Week! Check out the highlights.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition'>
              <img
                src='https://via.placeholder.com/500x300'
                alt='Style Share'
                className='w-full h-56 object-cover rounded-lg'
              />
              <h3 className='text-xl font-semibold text-gray-800 mt-4'>
                Member Style Showcase
              </h3>
              <p className='text-gray-600 mt-2'>
                See how our members are styling the latest collections with
                their unique twist.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition'>
              <img
                src='https://via.placeholder.com/500x300'
                alt='Community Event'
                className='w-full h-56 object-cover rounded-lg'
              />
              <h3 className='text-xl font-semibold text-gray-800 mt-4'>
                Giveaway Winners
              </h3>
              <p className='text-gray-600 mt-2'>
                Congrats to our recent giveaway winners! Join the community for
                your chance to win next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      {/* <section className='py-12 md:py-16 bg-gradient-to-r from-teal-500 to-blue-500 text-white'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold'>Ready to Join Us?</h2>
          <p className='text-lg md:text-xl mt-4'>
            Become a part of the Clothes2Wear community today and stay ahead in
            the fashion game.
          </p>
          <div className='mt-8'>
            <a
              href='/signup'
              className='inline-block bg-teal-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-teal-700 transition'
            >
              Join Now
            </a>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default Community
