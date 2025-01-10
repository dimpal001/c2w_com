'use client'

import { blogApi } from '@/app/admin_/components/apis'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSending(true)
      const response = await axios.post(`${blogApi}/newsletters`, {
        email,
      })

      setEmail('')
      enqueueSnackbar(
        response?.data?.message ||
          'You have successfully subscribed to our newsletter. Stay updated with the latest news and posts delivered straight to your inbox.',
        { variant: 'success', autoHideDuration: 7000 }
      )
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className='bg-pink-500 text-white shadow-md rounded-lg p-6'>
      <h2 className='text-xl font-bold mb-4'>Subscribe to our Newsletter</h2>
      <p className='text-gray-50 mb-4'>
        Get the latest posts delivered straight to your inbox!
      </p>
      <form>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Enter your email'
          className='w-full text-black px-4 py-2 border focus:ring-2 ring-black focus:outline-none rounded-md mb-4'
        />
        <button
          onClick={handleSubmit}
          disabled={sending}
          type='submit'
          className={`w-full ${
            sending && 'opacity-50 hover:bg-pink-600'
          } bg-pink-600 text-white flex justify-center items-center py-2 rounded-md hover:bg-pink-700 transition`}
        >
          {sending ? <Loader2 className='animate-spin' /> : 'Subscribe'}
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
