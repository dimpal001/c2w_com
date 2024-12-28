'use client'

import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubscribe = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailRegex.test(email)) {
      enqueueSnackbar('Invalid email format!', { variant: 'error' })
      return
    }

    if (email.length < 5) {
      enqueueSnackbar('Email is too short', { variant: 'error' })
      return
    }

    if (email.length > 100) {
      enqueueSnackbar('Email is too long!', { variant: 'error' })
      return
    }

    try {
      setSending(true)
      const response = await axios.post('/api/newsletter', {
        email,
      })

      setEmail('')

      enqueueSnackbar(response?.data?.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || 'Unable to subscribe', {
        variant: 'error',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <footer className='bg-gray-900 text-white py-12'>
      {/* Top Decorative Strips */}
      <div>
        <div>
          <div className='h-3 bg-pink-500 w-[52%]'></div>
          <div className='h-3 bg-black w-[44%]'></div>
        </div>
        <div className='flex flex-col py-5 justify-center items-center p-3'>
          <p className='text-4xl sm:text-5xl font-extrabold'>Clothes2Wear</p>
          <p className='text-sm sm:text-xl font-semibold'>
            Shop without looking at your pocket
          </p>
        </div>
        <div className='flex flex-col items-end'>
          <div className='h-3 bg-pink-500 w-[52%]'></div>
          <div className='h-3 bg-black w-[44%]'></div>
        </div>
      </div>

      {/* Footer Content */}
      <div className='max-w-screen-xl mx-auto px-4 mt-10 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'>
          {/* Info Links Section */}
          <div className=''>
            <h4 className='text-2xl sm:text-3xl font-semibold mb-4 text-pink-500'>
              Info Links
            </h4>
            <ul className='space-y-3 text-base sm:text-lg'>
              <li>
                <a href='/about' className='hover:underline'>
                  About Us
                </a>
              </li>
              <li>
                <a href='/what-we-do' className='hover:underline'>
                  What We Do
                </a>
              </li>
              <li>
                <a href='/contact' className='hover:underline'>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='/community' className='hover:underline'>
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Subscription Section */}
          <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <h4 className='text-2xl sm:text-3xl font-semibold mb-4 text-pink-500'>
              Subscribe for Updates
            </h4>
            <p className='text-xs sm:text-sm mb-6'>
              Enter your email address to receive the latest updates and fashion
              news from Clothes2Wear.
            </p>
            <div className='flex flex-col sm:flex-row items-center gap-4'>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Enter your email'
                className='w-full sm:w-[70%] p-3 bg-transparent border-b-2 border-gray-500 text-white focus:outline-none'
              />
              <button
                disabled={sending}
                onClick={handleSubscribe}
                className='mt-3 sm:mt-0 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600'
              >
                {sending ? <Loader2 className='animate-spin' /> : 'Subscribe'}
              </button>
            </div>
          </div>

          {/* Legal Links Section */}
          <div className=''>
            <h4 className='text-2xl lg:text-end sm:text-3xl font-semibold mb-4 text-pink-500'>
              Legal
            </h4>
            <ul className='space-y-3 text-base sm:text-lg lg:flex flex-col items-end'>
              <li>
                <a href='/terms-and-conditions' className='hover:underline'>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href='/privacy-policy' className='hover:underline'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='/refund-policy' className='hover:underline'>
                  Refund Policy
                </a>
              </li>
              <li>
                <a href='/return-policy' className='hover:underline'>
                  Return Policy
                </a>
              </li>
              <li>
                <a href='/discount-policy' className='hover:underline'>
                  Discount Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className='mt-10 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm'>
          <p className='text-center sm:text-left'>
            &copy; 2024 Clothes2Wear. All rights reserved.
          </p>
          <div className='flex justify-center items-center gap-6 mt-4 sm:mt-0'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
              alt='Visa'
              className='w-8 h-8'
            />
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg'
              alt='Mastercard'
              className='w-8 h-5'
            />
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/4/49/RuPay_Logo.jpg'
              alt='Rupay'
              className='w-9 h-5'
            />
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/6/6f/UPI_logo.svg'
              alt='UPI'
              className='w-8 h-8'
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
