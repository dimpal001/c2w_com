'use client'

import React, { useEffect, useState } from 'react'
import 'animate.css'

import { ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import LoginCartImage from '../../../assets/login_cart.svg'
import { enqueueSnackbar } from 'notistack'
import Loading from '@/app/admin_/components/Loading'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import LogoImg from '../../../assets/img.webp'
import { useUserContext } from '@/app/context/UserContext'

export default function OtpPage() {
  const searchParams = useSearchParams()
  const path = searchParams.get('dvx')
  const [otp, setOtp] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [checking, setChecking] = useState(true)

  const router = useRouter()
  const { setUser } = useUserContext()

  useEffect(() => {
    document.title = 'Enter OTP | Clothes2Wear'
  }, [])

  const handleCheck = async () => {
    try {
      const response = await axios.post(
        '/api/auth/verify-otp/check-token',
        {},
        {
          withCredentials: true,
        }
      )
      if (response.status === 200) {
        setChecking(false)
      }
    } catch (error) {
      router.push('/')
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    handleCheck()
  }, [])

  const handleSubmit = async () => {
    const email = localStorage.getItem('email')
    try {
      setSubmitting(true)
      const response = await axios.post(
        path ? path : '/api/auth/verify-otp',
        {
          email,
          otp,
        },
        { withCredentials: true }
      )
      if (response.status === 201) {
        enqueueSnackbar(response.data.message, { variant: 'success' })
        router.push('/auth/new-password')
      }
      if (response.status === 202) {
        enqueueSnackbar(response.data.message, { variant: 'success' })
        router.push('/auth/full-name')
      }
      if (response.status === 200) {
        setUser(response.data.iser)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        enqueueSnackbar(response.data.message, { variant: 'success' })
        router.push('/')
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleResendOtp = async () => {
    const email = localStorage.getItem('email')
    try {
      setResending(true)
      const response = await axios.post('/api/auth/resend-otp', {
        email,
      })
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setResending(false)
    }
  }

  if (checking) {
    return <Loading />
  }

  return (
    <div className='min-h-screen flex items-center max-sm:p-4 justify-center bg-[#faf6f3]'>
      <div
        className={`w-full relative animate__animated animate__fadeInUp animate__faster transition-all duration-500 max-w-4xl flex md:flex-row flex-col-reverse bg-white rounded-xl shadow-lg overflow-hidden`}
      >
        {/* Form Section */}
        <form className={`flex-1 p-10`}>
          <div className='text-center md:text-left'>
            <h1 className='text-2xl font-bold mb-4 hidden'>Logo</h1>
            <div className='flex justify-center mb-3'>
              <Image
                layout='intrinsic'
                className='md:w-52 max-sm:w-52'
                src={LogoImg}
                alt='Logo'
              />
            </div>
            <h2 className='text-lg text-gray-500 mb-2'>Welcome back !!!</h2>
            <h1 className='text-4xl font-extrabold text-black mb-8'>
              Submit OTP
            </h1>
          </div>

          <div>
            <div className='mb-3'>
              <label
                htmlFor='otp'
                className='block text-gray-600 text-sm font-medium mb-2'
              >
                Enter OTP
              </label>
              <input
                type='number'
                id='otp'
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value)
                }}
                placeholder='6 digits OTP'
                className={`w-full px-4 py-3 bg-[#FDF3E9] rounded-lg border focus:ring-2 outline-none focus:ring-pink-300 text-gray-800`}
              />
            </div>

            <div className='my-3 flex justify-center items-center'>
              {resending ? (
                <Loader2 className='animate-spin text-pink-500' />
              ) : (
                <p
                  onClick={handleResendOtp}
                  className='font-semibold text-pink-500 hover:underline cursor-pointer'
                >
                  Resend OTP
                </p>
              )}
            </div>

            <button
              type='submit'
              disabled={submitting}
              onClick={handleSubmit}
              className={`w-full ${
                submitting ? 'opacity-50' : 'opacity-100 hover:bg-pink-600'
              } bg-pink-500 text-white text-lg font-medium py-3 rounded-full flex items-center justify-center gap-2`}
            >
              {submitting ? (
                <>Please wait</>
              ) : (
                <>
                  Submit OTP <ArrowRight className='w-5 h-5' />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Illustration Section */}
        <div className='max-sm:hidden md:block flex-1 max-sm:p-10 max-sm:px-28 bg-[#FDF3E9] flex justify-center items-center'>
          <div className='relative flex justify-center items-center w-full h-full'>
            <Image
              src={LoginCartImage}
              width={250}
              height={250}
              alt='Login Image'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
