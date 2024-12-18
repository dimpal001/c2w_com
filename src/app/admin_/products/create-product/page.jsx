'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import ProductForm from '../components/ProductForm'

// eslint-disable-next-line react/prop-types
const Page = ({ productId }) => {
  const [user, setUser] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    customerTypeId: '',
    sellerCode: '',
    longTailKeyword: '',
    categories: [],
    subcategories: [],
    isReturnable: false,
    isCODAvailable: false,
    estimatedDeliveryDay: 0,
    discounts: [],
    displayPrice: 0,
    isActive: false,
    description: '',
    summary: '',
    userId: user?.id || '123',
    images: [],
    inventory: [],
    returnPolicy: '',
    similarProducts: [],
    tags: [],
  })

  useEffect(() => {
    document.title = 'Create Product | Clothes2Wear'
  }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)

      setFormData((prevData) => ({
        ...prevData,
        userId: parsedUser.id,
      }))
    }
  }, [])

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-screen'>
        <h2 className='text-xl font-semibold mb-4 text-blue-800'>
          Create Product
        </h2>
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          productId={productId}
        />
      </div>
    </Layout>
  )
}

export default Page
