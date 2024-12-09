'use client'

import React, { useEffect } from 'react'

const LandingPage = () => {
  useEffect(() => {
    document.title = 'Hello World'
  }, [])

  return (
    <div className='w-screen bg-gradient-to-br from-green-400 to-blue-500 via-indigo-600 text-white flex justify-center items-center h-screen'>
      <p className='text-3xl font-semibold animate__animated animate__flip animate__slow'>
        Hello, world 👋
      </p>
    </div>
  )
}

export default LandingPage
