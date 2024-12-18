'use client'

import React, { useEffect, useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
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

    // Basic validation
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
        setUser(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        if (response.data.user.role === 'ADMIN') {
          router.push('/admin_/dashboard')
        } else {
          router.push('/admin_/home')
        }
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500'>
      <div className='bg-white text-black p-8 rounded-xl shadow-xl w-full sm:max-w-md'>
        <h2 className='text-3xl unbounded font-extrabold  text-center mb-6'>
          Official Login
        </h2>

        {/* Error Message */}
        {error && <p className='text-red-400 text-center mb-4'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className='mb-5'>
            <label htmlFor='email' className='block text-sm font-medium '>
              Email
            </label>
            <div className='relative mt-1'>
              <input
                type='text'
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='pl-10 py-3 border-2 border-gray-300 rounded-lg w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
            </div>
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block text-sm font-medium '>
              Password
            </label>
            <div className='relative mt-1'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                className='pl-10 py-3 border-2 border-gray-300 rounded-lg w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(false)}
                  className='absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(true)}
                  className='absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className={`w-full ${
              submitting && 'opacity-60'
            } unbounded py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105`}
            disabled={submitting}
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className='flex justify-between items-center mt-4'>
          {/* Reset Password Link */}
          <p
            onClick={() => setShowResetPasswordModal(true)}
            className='text-sm text-black hover:underline cursor-pointer'
          >
            Forgot password?
          </p>
        </div>
        {showResetPasswordModal && (
          <ResetPasswordModal
            isOpen={true}
            onClose={() => setShowResetPasswordModal(false)}
            close={() => setShowResetPasswordModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default AdminLoginPage
