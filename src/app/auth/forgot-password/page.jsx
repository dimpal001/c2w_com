'use client'

import React, { useEffect, useState } from 'react'
import 'animate.css'

import { ArrowRight, CircleAlert, CircleCheck } from 'lucide-react'
import Image from 'next/image'
import LoginCartImage from '../../../assets/login_cart.svg'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [isForgot, setIsForgot] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState(null)
  const [loginSuccess, setLoginSuccess] = useState(null)

  const validateFields = () => {
    setLoginSuccess('asdf')
    setPassword('ad')
    let valid = true
    let newErrors = { email: '', password: '' }

    if (!email) {
      newErrors.email = 'Email is required.'
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address.'
      valid = false
    }

    if (!password) {
      newErrors.password = 'Password is required.'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSignIn = async () => {
    setLoginError(null)
    try {
      setSubmitting(true)
      if (validateFields()) {
        setTimeout(() => {
          setLoginError('Incorrect login details!')
        }, 2000)
        console.log('Login successful')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  useEffect(() => {
    document.title = 'Sign In | Clothes2Wear'
  }, [])

  return (
    <div className='min-h-screen flex items-center max-sm:p-4 justify-center bg-[#faf6f3]'>
      <div
        className={`w-full relative animate__animated animate__fadeInUp animate__faster transition-all duration-500 max-w-4xl flex md:flex-row flex-col-reverse bg-white rounded-xl shadow-lg overflow-hidden`}
      >
        {/* Form Section */}
        <div className={`flex-1 p-10`}>
          <div className='text-center md:text-left'>
            <h1 className='text-2xl font-bold mb-4'>Logo</h1>
            <h2 className='text-lg text-gray-500 mb-2'>Welcome back !!!</h2>
            <h1 className='text-4xl font-extrabold text-black mb-8'>
              Forgot Password
            </h1>
          </div>

          <div>
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block text-gray-600 text-sm font-medium mb-2'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearError('email')
                }}
                placeholder='test@gmail.com'
                className={`w-full px-4 py-3 bg-[#FDF3E9] rounded-lg border focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-300'
                    : 'focus:ring-pink-300'
                } outline-none text-gray-800`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-2 flex items-center gap-1'>
                  <CircleAlert className='w-4 h-4' /> {errors.email}
                </p>
              )}
            </div>

            <button
              disabled={submitting}
              onClick={handleSignIn}
              className={`w-full ${
                submitting ? 'opacity-50' : 'opacity-100 hover:bg-pink-600'
              } bg-pink-500 text-white text-lg font-medium py-3 rounded-full flex items-center justify-center gap-2`}
            >
              {submitting ? (
                <>Please wait</>
              ) : (
                <>
                  Request OTP <ArrowRight className='w-5 h-5' />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Illustration Section */}
        <div className=' md:block flex-1 max-sm:p-10 max-sm:px-28 bg-[#FDF3E9] flex justify-center items-center'>
          <div className='relative flex justify-center items-center w-full h-full'>
            <Image
              src={LoginCartImage}
              width={250}
              height={250}
              alt='Login Image'
            />
          </div>
        </div>

        {/* Show error part  */}
        {loginError && (
          <div className='absolute animate__animated animate__fadeInRight animate__faster top-4 right-4 text-xs max-w-[300px] p-3 border-red-600 border rounded-lg bg-red-100 text-red-600'>
            <div className='flex items-center gap-1'>
              <CircleAlert className='text-red-600' size={16} />
              {loginError}
            </div>
          </div>
        )}
        {/* Show success part  */}
        {loginSuccess && (
          <div className='absolute animate__animated animate__fadeInRight animate__faster top-4 right-4 text-xs max-w-[300px] p-3 border-green-500 border rounded-lg bg-green-100 text-green-500'>
            <div className='flex items-center gap-1'>
              <CircleCheck className='text-green-500' size={16} />
              {loginSuccess}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
