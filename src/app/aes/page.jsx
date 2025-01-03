'use client'

import React, { useState } from 'react'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

const Page = () => {
  const [data, setData] = useState('')
  const [key, setKey] = useState('')
  const [encryptedData, setEncryptedData] = useState('')

  const generateKey = () => {
    const array = new Uint8Array(32)
    window.crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
      ''
    )
  }

  const handleEncrypt = (data, key) => {
    if (!data || !key) {
      alert('Both data and key are required for encryption!')
      return
    }

    const encrypted = CryptoJS.AES.encrypt(data, key).toString()
    return encrypted
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const encrypted = handleEncrypt(data, key)
    try {
      const response = await axios.post('/api/aes', {
        data: encrypted,
        key,
      })
      enqueueSnackbar(response.data.message, { variant: 'success' })

      setEncryptedData(encrypted)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  return (
    <div className='flex justify-center bg-black items-center h-screen'>
      <div className='w-full max-w-md p-4 border bg-neutral-800 text-white rounded-lg shadow-lg'>
        <h1 className='text-2xl text-center mb-4'>AES Encryption</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='data' className='block text-sm font-medium '>
              Data to Encrypt
            </label>
            <input
              type='text'
              id='data'
              value={data}
              onChange={(e) => setData(e.target.value)}
              className='w-full p-2 border bg-transparent rounded-md'
              placeholder='Enter data to encrypt'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='key' className='block text-sm font-medium '>
              Secret Key
            </label>
            <input
              type='text'
              id='key'
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className='w-full p-2 border bg-transparent rounded-md'
              placeholder='Enter secret key'
            />
          </div>

          <button
            type='button'
            onClick={() => setKey(generateKey())}
            className='w-full p-2 bg-green-500 text-white rounded-md mb-4'
          >
            Generate Key
          </button>

          <button
            type='submit'
            className='w-full p-2 bg-blue-500 text-white rounded-md'
          >
            Encrypt
          </button>
        </form>

        {encryptedData && (
          <div className='mt-4'>
            <h2 className='text-lg font-medium'>Encrypted Data:</h2>
            <textarea
              className='w-full p-2 border bg-transparent rounded-md mt-2'
              value={encryptedData}
              readOnly
              rows='4'
            ></textarea>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
