'use client'

import React, { useEffect, useState } from 'react'
import { Eye, EyeOff, Lock, Mail, Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useUserContext } from '@/app/context/UserContext'
import ResetPasswordModal from '../home/ResetPasswordModal'

const AdminLoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { setUser } = useUserContext()

  useEffect(() => {
    window.document.title = 'Login | Clothes2Wear'
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please fill in both fields.')
      return
    }

    try {
      setSubmitting(true)

      const response = await axios.post('/api/admin/login', {
        email,
        password,
      })

      if (response.status === 200) {
        const sessionExpiryTimestamp = Math.floor(Date.now() / 1000) + 10
        document.cookie = `sessionExpiredTime=${sessionExpiryTimestamp}; path=/;`

        const logoutTime = Math.floor(Date.now() / 1000) + 8 * 3600
        localStorage.setItem('logoutTime', logoutTime)

        setUser(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        if (response.data.user.role === 'ADMIN') {
          router.push('/admin_/dashboard')
        } else {
          router.push('/admin_/home')
        }
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='flex h-screen w-full'>
      {/* text content  */}
      <div className='flex items-center text-white p-24 lg:w-[55%] bg-blue-700'>
        <div>
          <Store className='w-20 h-20 mb-6' />
          <h1 className='text-4xl font-bold mb-4'>Clothes2Wear Admin Portal</h1>
          <p className='text-lg mb-4 leading-relaxed'>
            Welcome to the admin portal of Clothes2Wear! Please log in to access
            your dashboard and manage platform operations efficiently.
          </p>
          <p className='text-lg leading-relaxed'>
            This portal is for authorized staff and admin users only. Ensure
            your credentials remain secure.
          </p>
        </div>
      </div>

      {/* form content  */}
      <div className='text-black lg:w-[45%] p-24 px-28 w-full flex flex-col justify-center'>
        <h2 className='text-5xl font-extrabold text-gray-800'>
          Welcome Back 👋
        </h2>
        <p className=' text-gray-600 mb-8'>
          Log in to your account to manage and monitor the platform.
        </p>

        {error && (
          <p className='text-red-600 bg-red-100 rounded-lg text-center p-3 mb-4'>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email Address
            </label>
            <div className='relative mt-2'>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50'
                required
              />
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            </div>
          </div>

          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <div className='relative mt-2'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                className='w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50'
                required
              />
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(false)}
                  className='absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(true)}
                  className='absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                />
              )}
            </div>
          </div>

          <button
            type='submit'
            className={`w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform ${
              submitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
            }`}
            disabled={submitting}
          >
            {submitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className='flex justify-between items-center mt-4 text-sm'>
          <p
            onClick={() => setShowResetPasswordModal(true)}
            className='text-indigo-600 cursor-pointer hover:underline'
          >
            Forgot password?
          </p>
        </div>

        {showResetPasswordModal && (
          <ResetPasswordModal
            isOpen={true}
            onClose={() => setShowResetPasswordModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default AdminLoginPage
