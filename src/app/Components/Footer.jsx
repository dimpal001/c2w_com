import React from 'react'

const Footer = () => {
  return (
    <footer className=' text-black py-8'>
      <div>
        <div>
          <div className='h-3 bg-pink-500 w-[52%]'></div>
          <div className='h-3 bg-black w-[44%]'></div>
        </div>
        <div className='flex flex-col py-5 justify-center items-center p-3'>
          <p className='text-5xl max-sm:text-3xl font-extrabold'>
            Clothes2Wear
          </p>
          <p className='text-base max-sm:text-sm font-semibold'>
            Shop without looking at your pocket
          </p>
        </div>
        <div className='flex flex-col items-end'>
          <div className='h-3 bg-pink-500 w-[52%]'></div>
          <div className='h-3 bg-black w-[44%]'></div>
        </div>
      </div>

      {/* Main footer  */}
      <div className='max-w-screen-xl mt-10 mx-auto px-4 sm:px-6 md:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
          {/* Info Links */}
          <div>
            <h4 className='text-2xl font-extrabold mb-4'>Info links</h4>
            <ul className='space-y-2 text-base'>
              <li>
                <a href='/about' className='hover:underline'>
                  About us
                </a>
              </li>
              <li>
                <a href='/what-we-do' className='hover:underline'>
                  What we do
                </a>
              </li>
              <li>
                <a href='/contact' className='hover:underline'>
                  Contact us
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
          <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
            <h4 className='text-2xl font-extrabold mb-4'>
              Subscribe for a cookie.
            </h4>
            <p className='text-sm mb-4'>
              Enter your email address and get the latest updates from the
              clothes2wear fashion blog.
            </p>
            <div className='flex w-full items-center gap-5'>
              <input
                type='email'
                placeholder='Enter email address'
                className='bg-transparent w-full focus:outline-none border-slate-400 focus:border-b'
              />
              <button className='text-xs p-3 px-5 max-sm:px-3 rounded-lg bg-stone-500 text-white'>
                Subscribe
              </button>
            </div>
          </div>

          {/* Legal Links */}
          <div className='flex flex-col items-end max-sm:items-start'>
            <h4 className='text-2xl font-extrabold mb-4'>Legal</h4>
            <ul className='space-y-2 flex flex-col items-end max-sm:items-start text-base'>
              <li>
                <a href='/terms-and-conditions' className='hover:underline'>
                  Terms & conditions
                </a>
              </li>
              <li>
                <a href='/privacy-policy' className='hover:underline'>
                  Privacy policy
                </a>
              </li>
              <li>
                <a href='/refund-policy' className='hover:underline'>
                  Refund policy
                </a>
              </li>
              <li>
                <a href='/return-policy' className='hover:underline'>
                  Return policy
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
        <div className='mt-8 flex justify-between max-sm:flex-col-reverse'>
          <p className='text-xs text-center max-sm:pt-5'>
            2024 Clothes2Wear <br className='max-sm:hidden' /> All Rights
            Reserved.
          </p>
          <div className='flex items-center justify-center mt-4 space-x-4'>
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
