'use client'

import { api } from '@/app/Components/api'
import { cdnPath } from '@/app/Components/cdnPath'
import { useUserContext } from '@/app/context/UserContext'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import axios from 'axios'
/* eslint-disable react/prop-types */
import {
  ArrowRight,
  Forward,
  Heart,
  Link,
  Loader2,
  Minus,
  Plus,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'
import ProductInfo from './ProductInfo'

const DisplayPorductSection = ({ product }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(product?.thumbnailUrl || '')
  const [selectedQuantity, setSelectedQuantity] = useState(
    product?.inventory[0].minQuantity
  )

  const { user } = useUserContext()
  const router = useRouter()

  const [selectedInventory, setSelectedInventory] = useState(
    product?.inventory[0]
  )
  const [submitting, setSubmitting] = useState(false)

  const handleBuyNowClick = async () => {
    const selectedSizeId = selectedInventory?.size?.id
    const totalPrice = selectedInventory?.price * selectedQuantity

    const orderItems = [
      {
        productId: product.id,
        quantity: selectedQuantity,
        price: totalPrice,
        sizeId: selectedSizeId,
      },
    ]

    try {
      setSubmitting(true)
      const response = await axios.post('/api/orders/create', {
        userId: user.id,
        totalPrice,
        orderItems,
      })

      if (response.status === 200) {
        router.push(`/checkout?id=${response.data.orderId}`)
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='flex max-sm:flex-col'>
      {/* Image Section  */}
      <div className='flex max-sm:flex-col-reverse gap-4 max-sm:gap-2 lg:w-[55%]'>
        <div
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className='flex max-sm:flex-row flex-col gap-3 max-sm:gap-2 lg:max-h-[600px] scrollbar-hide overflow-scroll'
        >
          {product?.images?.length > 0 &&
            product?.images?.map((image, index) => (
              <ProductImage
                key={index}
                image={image}
                onClick={() => setThumbnailUrl(image?.imageUrl)}
              />
            ))}
        </div>
        <div>
          <ThumbnailImage image={thumbnailUrl} />
        </div>
      </div>
      {/* Data Section  */}
      <div className='py-5 lg:w-[47%] flex-col flex gap-3 justify-start'>
        <h1 className='font-bold text-2xl max-sm:text-xl'>{product?.title}</h1>
        <p className='text-sm text-neutral-600'>{product?.summary}</p>
        <p className='text-base'>
          Style No. <strong>{product?.styleId}</strong>
        </p>
        <div>
          <button className='rounded-md cursor-default p-1 text-sm px-4 bg-pink-300 font-semibold'>
            Best Seller
          </button>
        </div>

        {/* Product inventory  */}
        <div className='flex justify-between'>
          <div>
            {product && (
              <ProductInventorySection
                product={product}
                selectedInventory={selectedInventory}
                setSelectedInventory={setSelectedInventory}
                selectedQuantity={selectedQuantity}
                setSelectedQuantity={setSelectedQuantity}
              />
            )}
            <p className='text-sm mt-2'>
              Est. Delivery by:{' '}
              {new Date(
                new Date().setDate(
                  new Date().getDate() + product.estimatedDeliveryDay
                )
              ).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className='h-full flex flex-col justify-between'>
            <Heart
              className='text-pink-500 fill-pink-500 cursor-pointer'
              size={27}
            />
            <Dropdown>
              <DropdownTrigger>
                <Forward className='text-pink-500 cursor-pointer' size={27} />
              </DropdownTrigger>
              <DropdownMenu className='p-3' aria-label='Static Actions'>
                <DropdownItem>
                  <div
                    onClick={() => {
                      const linkToCopy = `${api}/p/${product?.affiliateId}`
                      navigator.clipboard.writeText(linkToCopy)
                    }}
                    className='flex items-center gap-2'
                  >
                    <Link size={15} />
                    <p>Copy Link</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className='h-[1px] w-[60%] my-3 bg-neutral-300'></div>

        {/* Product info collapsible card */}
        <div className='mb-1 flex flex-col gap-2'>
          <ProductInfo
            title={'Product description'}
            data={product.description}
          />
          <ProductInfo title={'Return Policy'} data={product.returnPolicy} />
        </div>

        {/* Similar Product  */}
        <div>
          {/* <p className='text-xl font-semibold'>Similar Product</p> */}
          <div className='flex gap-4 py-2 flex-wrap'>
            {product?.images?.length > 0 &&
              product?.images?.map((image, index) => (
                <SimilarProductImage key={index} image={image} />
              ))}
          </div>
        </div>

        {/* Buy button  */}

        <div className='py-3 w-[90%] max-sm:fixed z-20 max-sm:px-5 max-sm:gap-3 max-sm:bg-white max-sm:w-full bottom-0 left-0 right-0 flex justify-between gap-4'>
          <button className='rounded-lg py-2 w-full font-semibold uppercase bg-pink-200'>
            add to cart
          </button>
          <button
            disabled={submitting}
            onClick={handleBuyNowClick}
            className={`rounded-lg ${
              submitting && 'opacity-60'
            } py-2 w-full flex justify-center items-center font-semibold bg-pink-400 uppercase`}
          >
            {submitting ? (
              <Loader2 className='text-white animate-spin' />
            ) : (
              <div className='flex justify-center items-center gap-5'>
                buy now
                <div className='bg-white  px-3 py-1 rounded-lg'>
                  <ArrowRight className='rounded-lg text-pink-600' />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const ProductImage = ({ image, onClick }) => {
  return (
    <div onClick={onClick} className='cursor-pointer'>
      <img
        src={cdnPath + image.imageUrl}
        alt={image.altText}
        className='w-[130px] h-[160px] max-sm:w-[50px] max-sm:h-[70px] rounded-lg'
      />
    </div>
  )
}

const ProductInventorySection = ({
  product,
  selectedInventory,
  setSelectedInventory,
  selectedQuantity,
  setSelectedQuantity,
}) => {
  // Handle quantity change (increase or decrease)
  const handleQuantityChange = (operation) => {
    if (
      operation === 'increase' &&
      selectedQuantity < selectedInventory.stock
    ) {
      setSelectedQuantity((prev) => prev + 1)
    }
    if (
      operation === 'decrease' &&
      selectedQuantity > selectedInventory.minQuantity
    ) {
      setSelectedQuantity((prev) => prev - 1)
    }
  }

  // Handle inventory change
  const handleInventoryChange = (event) => {
    const selectedSizeId = event.target.value
    const newInventory = product.inventory.find(
      (inv) => inv.size.id === selectedSizeId
    )
    setSelectedInventory(newInventory)
    setSelectedQuantity(newInventory.minQuantity)
  }

  return (
    <div>
      <div className='mt-2'>
        {/* Select for inventory size */}
        <div className='flex items-center gap-5 mb-2'>
          <select
            value={selectedInventory?.size?.id}
            onChange={handleInventoryChange}
            className='px-3 py-2 border rounded-md'
          >
            {product.inventory.map((inv) => (
              <option key={inv.id} value={inv?.size?.id}>
                {inv?.size?.name.toUpperCase()}
              </option>
            ))}
          </select>

          <div className='flex items-center gap-4 mt-2'>
            {/* Decrease Quantity */}
            <button
              onClick={() => handleQuantityChange('decrease')}
              className='text-gray-500 hover:text-gray-600'
              disabled={selectedQuantity <= selectedInventory.minQuantity}
            >
              <Minus className='w-5 h-5' />
            </button>

            {/* Display Selected Quantity */}
            <p className='text-lg font-semibold'>{selectedQuantity}</p>

            {/* Increase Quantity */}
            <button
              onClick={() => handleQuantityChange('increase')}
              className='text-gray-500 hover:text-gray-600'
              disabled={selectedQuantity >= selectedInventory.stock}
            >
              <Plus className='w-5 h-5' />
            </button>
          </div>
        </div>

        <div className='flex gap-8 items-center'>
          <strike className='text-2xl strik'>₹{selectedInventory.mrp}/-</strike>
          <span className='text-3xl font-semibold'>
            {' '}
            ₹{selectedInventory.price}/-
          </span>
        </div>
      </div>
    </div>
  )
}

const SimilarProductImage = ({ image }) => {
  return (
    <div>
      <img
        src={cdnPath + image.imageUrl}
        alt={image.altText}
        className='w-[80px] h-[100px] rounded-lg'
      />
    </div>
  )
}

const ThumbnailImage = ({ image }) => {
  return (
    <img
      src={cdnPath + image}
      alt={image.altText}
      className='lg:w-[500px] object-fill rounded-lg lg:h-[600px] max-sm:w-[353px] max-sm:h-[420px]'
    />
  )
}

export default DisplayPorductSection
