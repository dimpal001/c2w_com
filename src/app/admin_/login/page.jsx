'use client'

import React, { useState } from 'react'
import { Lock, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useUserContext } from '@/app/context/UserContext'

const AdminLoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { setUser } = useUserContext()

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
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-200 to-white p-4'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center mb-6'>Admin Login</h2>

        {error && (
          <div className='text-red-500 text-center text-sm mb-4'>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* email Field */}
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <div className='flex items-center border border-gray-300 rounded-md px-2 mt-1'>
              <User size={20} className='text-gray-500' />
              <input
                id='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='ml-2 p-2 w-full outline-none border-none'
                placeholder='Enter your email'
              />
            </div>
          </div>

          {/* Password Field */}
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <div className='flex items-center border border-gray-300 rounded-md px-2 mt-1'>
              <Lock size={20} className='text-gray-500' />
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='ml-2 p-2 w-full outline-none border-none'
                placeholder='Enter your password'
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            disabled={submitting ? true : false}
            type='submit'
            className={`w-full p-[10px] text-white bg-blue-800 rounded-[4px] ${
              submitting && 'opacity-50'
            }`}
          >
            {submitting ? 'Please wait ...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage
