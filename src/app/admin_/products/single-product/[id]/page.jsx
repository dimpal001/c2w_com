/* eslint-disable react/prop-types */
'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import axios from 'axios'
import Loading from '@/app/admin_/components/Loading'
import { use } from 'react'
import Image from 'next/image'
import Button from '@/app/admin_/components/Button'
import { useRouter } from 'next/navigation'
import { Heart, ShoppingBasket, ShoppingCart } from 'lucide-react'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import { deleteImageFromCDN } from '../../../../../../utils/deleteImageFromCDN'
import { cdnPath } from '@/app/Components/cdnPath'

const ProductDetailsPage = ({ params }) => {
  const { id } = use(params)

  const [productDetails, setProductDetails] = useState(null)
  const [customerTypes, setCustomerTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [copiedText, setCopiedText] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const fetchCustomerTypes = async () => {
    try {
      const response = await axios.get('/api/admin/menu/?type=customer-types')
      setCustomerTypes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const router = useRouter()

  useEffect(() => {
    document.title = 'Product Details | Clothes2Wear'
  }, [])

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/products/get/single`, {
          params: { id },
        })
        setProductDetails(response.data)
      } catch (error) {
        console.error('Error fetching product details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCustomerTypes()
    fetchProductDetails()
  }, [id])

  const handleProductDelete = async () => {
    try {
      await Promise.all(
        productDetails.images.map(async (image) => {
          // console.log(image.imageUrl)
          await deleteImageFromCDN(image.imageUrl)
        })
      )
      const response = await axios.delete(`/api/products/delete`, {
        data: { id: productDetails.id },
      })

      setShowDeleteModal(false)
      enqueueSnackbar(response.data.message, { variant: 'success' })
      router.push('/admin_/products/product-list')
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-screen'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>
            Product Details
          </h2>
          <div className='flex items-center gap-2'>
            <Button
              onClick={() =>
                router.push(
                  `/admin_/products/edit-product/${productDetails.id}`
                )
              }
              label={'Edit Product'}
            />
            <Button
              onClick={() =>
                router.push(
                  `/admin_/products/reviews?productId=${productDetails?.styleId}`
                )
              }
              label={'Reviews'}
            />
            <Button
              onClick={() => setShowDeleteModal(true)}
              label={'Delete Product'}
              variant='error'
            />
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className='bg-white p-6 rounded-lg shadow-md'>
            {productDetails ? (
              <>
                {/* General Info  */}
                <div className='mb-3'>
                  <div className='py-3 flex flex-col gap-4'>
                    <h3 className='text-lg font-semibold text-blue-800'>
                      General Information
                    </h3>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
                          <th className='p-2 w-[40%] text-left border-r border-white'>
                            Title
                          </th>
                          <th className='p-2 text-center border-r w-[27%] border-white'>
                            Product ID
                          </th>
                          <th className='p-2 text-center border-r w-[27%] border-white'>
                            Hyper Link
                          </th>
                          <th className='p-2 text-center border-r w-[27%] border-white'>
                            Display Price
                          </th>
                          <th className='p-2 text-center border-r w-[27%] border-white'>
                            Customer Type
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-left p-3 border'>
                            {productDetails.title}
                          </td>
                          <td className='text-center p-3 border'>
                            {productDetails.styleId}
                          </td>
                          <td className='p-3 border font-semibold text-blue-800 text-center'>
                            <p
                              onClick={() => {
                                const linkToCopy = `https://clothes2wear.com/product/${productDetails?.slug}`
                                navigator.clipboard
                                  .writeText(linkToCopy)
                                  .then(() => {
                                    setCopiedText(true)
                                    setTimeout(() => setCopiedText(false), 5000)
                                  })
                                  .catch((err) => {
                                    console.error('Failed to copy: ', err)
                                  })
                              }}
                              className={`${
                                copiedText ? 'text-green-600' : 'text-blue-800'
                              } font-semibold cursor-pointer`}
                            >
                              {copiedText === true
                                ? 'Link copied'
                                : 'Copy Link'}
                            </p>
                          </td>
                          <td className='p-3 border text-center'>
                            ₹{productDetails.displayPrice.toFixed(2)}
                          </td>
                          <td className='p-3 border capitalize text-center'>
                            {customerTypes.length > 0 &&
                              customerTypes.find(
                                (item) =>
                                  item.id === productDetails?.customerTypeId
                              )?.name}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='mb-3 flex gap-3 flex-wrap'>
                  {productDetails.images.map((item, index) => (
                    <div key={index} className='flex flex-col'>
                      <Image
                        className='border rounded-md shadow-md shadow-blue-800'
                        src={cdnPath + item.imageUrl}
                        width={240}
                        height={300}
                        alt=''
                      />
                      <div className='flex p-2 justify-center'>
                        <strong>Alt: &nbsp;</strong> {item?.altText}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='mb-3'>
                  <div className='py-3 flex flex-col gap-4'>
                    <h3 className='text-lg font-semibold text-blue-800'></h3>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
                          <th className='p-2 text-left border-r border-white'>
                            Returnable
                          </th>
                          <th className='p-2 text-center border-r border-white'>
                            Status
                          </th>
                          <th className='p-2 text-center border-r border-white'>
                            Estimated delivery day
                          </th>
                          <th className='p-2 text-center border-r border-white'>
                            Available COD
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-left p-3 border'>
                            {productDetails.isReturnable
                              ? 'Returnable'
                              : 'Not returnable'}
                          </td>
                          <td
                            className={`text-center p-3 font-semibold border ${
                              productDetails.isActive
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            {productDetails.isActive ? 'Active' : 'Not active'}
                          </td>
                          <td className='p-3 border text-center'>
                            {productDetails.estimatedDeliveryDay}
                          </td>
                          <td className='p-3 border text-center'>
                            {productDetails.isCODAvailable
                              ? 'Available'
                              : 'Not available'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary & Description */}
                <div className='mb-3'>
                  <div className='py-3 flex flex-col gap-4'>
                    <h3 className='text-lg font-semibold text-blue-800'>
                      Summary
                    </h3>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
                          <th className='p-2 text-left'>Summary</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-left p-3 border'>
                            {productDetails.summary}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <h3 className='text-lg font-semibold text-blue-800'>
                      Description
                    </h3>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
                          <th className='p-2 text-left'>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-left p-3 border'>
                            {productDetails.description}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <h3 className='text-lg font-semibold text-blue-800'>
                      Return Policy
                    </h3>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
                          <th className='p-2 text-left'>Return Policy</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-left p-3 border'>
                            {productDetails.returnPolicy}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Category & Tags  */}
                <div className='mb-3'>
                  <h3 className='text-lg font-semibold text-blue-800'>
                    Categories & Tags
                  </h3>
                  <div className='py-3 flex'>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border-r border border-blue-800 text-white'>
                          <th className='p-2 text-left border-r border-white'>
                            Categories
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productDetails.categories.map((item, index) => (
                          <tr key={index}>
                            <td className='text-left capitalize p-3 border'>
                              <span className='capitalize'>{item.name}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
                          <th className='p-2 text-left'>Tags</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-left p-3 text-wrap border'>
                            {productDetails.tags
                              ? productDetails.tags.map((tag, index) => (
                                  <span key={index}>
                                    {tag}
                                    {index < productDetails.tags.length - 1 &&
                                      ', '}
                                  </span>
                                ))
                              : 'No tags'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Category & Tags  */}
                <div className='mb-3'>
                  <h3 className='text-lg font-semibold text-blue-800'>
                    Long tail keyword
                  </h3>
                  <div className='py-3 flex'>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border-r border border-blue-800 text-white'>
                          <th className='p-2 text-left border-r border-white'>
                            Keyword
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-left capitalize p-3 border'>
                            <span className='capitalize'>
                              {productDetails?.longTailKeyword}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Product Variants  */}
                <div className='mb-3'>
                  <div className='py-3 flex flex-col gap-3'>
                    <h3 className='text-lg font-semibold text-blue-800'>
                      Product Variants
                    </h3>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
                          <th className='p-2 text-left border-r border-white'>
                            Size
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            MRP
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Price
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Stock
                          </th>
                          <th className='p-2 text-left border-r border-white w-40'>
                            Minimum Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productDetails.inventory.map((item, index) => (
                          <tr key={index}>
                            <td className='text-left p-3 uppercase border'>
                              {item?.size?.name}
                            </td>
                            <td className='text-left p-3 border'>
                              ₹{item.mrp.toFixed(2)}
                            </td>
                            <td className='text-left p-3 border'>
                              ₹{item.price.toFixed(2)}
                            </td>
                            <td className='text-left p-3 border'>
                              {item.stock}
                            </td>
                            <td className='text-left p-3 border'>
                              {item.minQuantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Similar Products  */}
                <div className='mb-3'>
                  <div className='py-3 flex flex-col gap-3'>
                    <h3 className='text-lg font-semibold text-blue-800'>
                      Similar Products
                    </h3>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
                          <th className='p-2 text-left border-r border-white'>
                            Product
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Title
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Display Price
                          </th>
                          <th className='p-2 text-center border-r border-white'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productDetails.similarProducts.map((item, index) => (
                          <tr key={index}>
                            <td className='text-left p-2 uppercase border'>
                              <Image
                                src={cdnPath + item?.thumbnailUrl}
                                width={40}
                                height={50}
                                alt='Product image'
                                className='border rounded-sm'
                              />
                            </td>
                            <td className='text-left p-3 border'>
                              {item.title}
                            </td>
                            <td className='text-left p-3 border'>
                              ₹{item.displayPrice.toFixed(2)}
                            </td>
                            <td className='text-left p-3 border'>
                              <div className='justify-center flex'>
                                <Button
                                  onClick={() =>
                                    router.push(
                                      `/admin_/products/single-product/${item.id}`
                                    )
                                  }
                                  label={'Details'}
                                  variant='warning'
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Discounts  */}
                <div className='mb-3'>
                  <div className='py-3 flex flex-col gap-3'>
                    <h3 className='text-lg font-semibold text-blue-800'>
                      Allowed Discounts
                    </h3>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
                          <th className='p-2 text-left border-r border-white'>
                            Coupon Code
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Discount
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Amount
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Minimum Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productDetails.discounts.map((item, index) => (
                          <tr key={index}>
                            <td className='text-left p-2 uppercase border'>
                              {item.code}
                            </td>
                            <td className='text-left p-3 border'>
                              {item.description}
                            </td>
                            <td className='text-left p-3 border'>
                              {item.type === 'FIXED' ? '₹' : ''}
                              {item.type === 'FIXED'
                                ? item.amount.toFixed(2)
                                : item.amount}
                              {item.type === 'PERCENTAGE' ? '%' : ''}
                            </td>
                            <td className='text-left p-3 border'>
                              {item?.minPrice && (
                                <span>₹{item?.minPrice?.toFixed(2)}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Product Creator  */}
                <div className='mb-3'>
                  <div className='py-3 flex flex-col gap-3'>
                    <h3 className='text-lg font-semibold text-blue-800'>
                      Product Creator
                    </h3>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
                          <th className='p-2 text-left border-r border-white'>
                            User Name
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            User Email
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Created at
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Updated at
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-left p-3 border'>
                            {productDetails.user.firstName +
                              ' ' +
                              productDetails.user.lastName}
                          </td>
                          <td className='text-left p-3 border'>
                            {productDetails.user.email}
                          </td>
                          <td className='text-left p-3 border'>
                            {new Date(
                              productDetails.createdAt
                            ).toLocaleString()}
                          </td>
                          <td className='text-left p-3 border'>
                            {new Date(
                              productDetails.updatedAt
                            ).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Additional Information  */}
                <div className='mt-7'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    <div className='bg-blue-50 p-6 rounded-xl shadow-md text-blue-800 flex items-center space-x-4'>
                      <ShoppingCart size={32} />
                      <div>
                        <p className='text-sm'>Include Carts</p>
                        <p className='text-xl font-bold'>
                          {productDetails?._count?.cartItems}
                        </p>
                      </div>
                    </div>
                    <div className='bg-blue-50 p-6 rounded-xl shadow-md text-blue-800 flex items-center space-x-4'>
                      <Heart size={32} />
                      <div>
                        <p className='text-sm'>Include Wishlist</p>
                        <p className='text-xl font-bold'>
                          {productDetails?._count?.wishlistItems}
                        </p>
                      </div>
                    </div>
                    <div className='bg-blue-50 p-6 rounded-xl shadow-md text-blue-800 flex items-center space-x-4'>
                      <ShoppingBasket size={32} />
                      <div>
                        <p className='text-sm'>Total Orders</p>
                        <p className='text-xl font-bold'>
                          {productDetails?._count?.orderItems}
                        </p>
                      </div>
                    </div>
                    <div className='bg-blue-50 p-6 rounded-xl shadow-md text-blue-800 flex items-center space-x-4'>
                      <ShoppingBasket size={32} />
                      <div>
                        <p className='text-sm'>Total Views</p>
                        <p className='text-xl font-bold'>
                          {productDetails?.views}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p className='text-gray-700'>Product details not available.</p>
            )}
          </div>
        )}
        {showDeleteModal && (
          <DeleteModal
            isOpen={true}
            onClose={() => setShowDeleteModal(false)}
            onDelete={handleProductDelete}
          />
        )}
      </div>
    </Layout>
  )
}

export default ProductDetailsPage
