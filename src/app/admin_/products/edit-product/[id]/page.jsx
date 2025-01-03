'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import ProductForm from '../../components/ProductForm'
import { use } from 'react'
import axios from 'axios'
import Loading from '@/app/admin_/components/Loading'
import { enqueueSnackbar } from 'notistack'

// eslint-disable-next-line react/prop-types
const Page = ({ params }) => {
  const { id } = use(params)
  const storedUser = localStorage.getItem('user')
  const [showForm, setShowForm] = useState(true)
  const user = JSON.parse(storedUser)

  const [formData, setFormData] = useState({
    title: '',
    customerTypeId: '',
    sellerCode: '',
    sizeChartId: '',
    fabricId: '',
    longTailKeyword: '',
    categories: [],
    subcategories: [],
    isReturnable: false,
    isCODAvailable: false,
    estimatedDeliveryDay: 0,
    displayPrice: 0,
    isActive: false,
    description: '',
    summary: '',
    userId: user?.id,
    images: [],
    inventory: [],
    similarProducts: [],
    discounts: [],
    tags: [],
    returnPolicy: '',
    productId: '',
  })

  const [productDetails, setProductDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [thumbnailImage, setThumbnailImage] = useState(null)
  const [imageSetting, setImageSetting] = useState(false)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/products/get/single`, {
          params: { id },
        })
        setThumbnailImage(response.data.thumbnailUrl)
        setProductDetails(response.data)
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data?.message || 'Failed to handle task!'
        )
      } finally {
        setLoading(false)
      }
    }
    fetchProductDetails()
  }, [id])

  useEffect(() => {
    if (productDetails) {
      setFormData({
        title: productDetails.title || '',
        customerTypeId: productDetails.customerTypeId || '',
        categories: productDetails.categories || [],
        isReturnable: productDetails.isReturnable || false,
        isCODAvailable: productDetails.isCODAvailable || false,
        estimatedDeliveryDay: productDetails.estimatedDeliveryDay || 0,
        isActive: productDetails.isActive || false,
        description: productDetails.description || '',
        summary: productDetails.summary || '',
        userId: productDetails.userId || user.id,
        images: productDetails.images || [],
        inventory: productDetails.inventory || [],
        similarProducts: productDetails.similarProducts || [],
        tags: productDetails.tags || [],
        discounts: productDetails.discounts || [],
        productId: productDetails.id,
        displayPrice: productDetails.displayPrice,
        returnPolicy: productDetails.returnPolicy,
        subcategories: productDetails.subcategories,
        longTailKeyword: productDetails.longTailKeyword,
        sellerCode: productDetails.sellerCode,
        sizeChartId: productDetails.sizeChartId,
        fabricId: productDetails.fabricId,
      })
    }

    setTimeout(() => {
      setShowForm(false)
    }, 1000)
  }, [productDetails, user.id])

  useEffect(() => {
    document.title = 'Edit Product | Clothes2Wear'
  }, [])

  const handleSetThumbnail = async (imageUrl) => {
    try {
      setImageSetting(true)

      const response = await axios.patch(
        '/api/products/update/make-thumbnail',
        {
          id: productDetails?.id,
          imageUrl: imageUrl,
        }
      )
      setThumbnailImage(imageUrl)

      enqueueSnackbar(response?.data?.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setImageSetting(false)
    }
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-screen'>
        <h2 className='text-xl font-semibold mb-4 text-blue-800'>
          Edit Product {productDetails && `(#${productDetails.styleId})`}
        </h2>
        {loading || showForm ? (
          <Loading />
        ) : (
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            type={'edit'}
            thumbnailImage={thumbnailImage}
            handleSetThumbnail={handleSetThumbnail}
            imageSetting={imageSetting}
          />
        )}
      </div>
    </Layout>
  )
}

export default Page
