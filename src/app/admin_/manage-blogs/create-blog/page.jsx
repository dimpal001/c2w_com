'use client'

import React from 'react'
import Layout from '../../components/Layout'
import CustomEditor from '../components/CustomEditor'

const page = () => {
  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Create Blog</h2>
          <div className='flex items-center gap-2'></div>
        </div>
        <div>
          <CustomEditor />
        </div>
      </div>
    </Layout>
  )
}

export default page
