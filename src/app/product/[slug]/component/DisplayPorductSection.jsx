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
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const DisplayPorductSection = ({ product }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(product?.thumbnailUrl || '')
  const [selectedQuantity, setSelectedQuantity] = useState(
    product?.inventory[0].minQuantity
  )

  const [addingCart, setAddingCart] = useState(false)
  const [addingWishList, setAddingWishList] = useState(false)
  const [showFull, setShowFull] = useState(false)

  const { user, setUser } = useUserContext()
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
        userId: user?.id,
        totalPrice,
        orderItems,
      })

      if (response.status === 200) {
        router.push(`/checkout?id=${response.data.orderId}`)
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/auth/signin')
      return
    }

    try {
      setAddingCart(true)
      const response = await axios.post('/api/cart/add', {
        userId: user?.id,
        productId: product.id,
        quantity: parseInt(product.inventory[0].minQuantity),
      })
      const newCartItem = {
        ...response.data.cartItem,
      }

      const updatedUser = {
        ...user,
        cartItems: [...user.cartItems, newCartItem],
      }

      setUser(updatedUser)

      localStorage.setItem('user', JSON.stringify(updatedUser))

      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setAddingCart(false)
    }
  }

  const handleAddWishList = async () => {
    if (!user) {
      router.push('/auth/signin')
      return
    }

    try {
      setAddingWishList(true)

      const response = await axios.post('/api/wishlist/add', {
        userId: user?.id,
        productId: product.id,
      })

      const { wishlistItem, message } = response.data

      let updatedUser

      if (response.status === 200) {
        updatedUser = {
          ...user,
          wishlistItem: [...user.wishlistItem, wishlistItem],
        }
      } else if (response.status === 201) {
        updatedUser = {
          ...user,
          wishlistItem: user?.wishlistItem.filter(
            (item) => item.productId !== product.id
          ),
        }
      }

      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))

      enqueueSnackbar(message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Something went wrong!',
        {
          variant: 'error',
        }
      )
    } finally {
      setAddingWishList(false)
    }
  }

  return (
    <div className='flex max-sm:flex-col gap-3'>
      {/* Image Section  */}
      <div className='flex max-sm:flex-col-reverse md:pl-10 gap-8 max-sm:gap-2 md:w-[54%]'>
        <div
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className='flex max-sm:flex-row flex-col gap-3 max-sm:gap-2 md:max-h-[600px] scrollbar-hide overflow-scroll'
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

      <div className='w-full sm:hidden flex gap-2 items-center'>
        {product?.images.length > 0 &&
          Array.from(
            new Set(product.images.map((item) => item?.color?.code))
          ).map((color, index) => (
            <span
              onClick={() => {
                const selectedImage = product.images.find(
                  (item) => item.color.code === color
                )
                setThumbnailUrl(selectedImage?.imageUrl)
              }}
              key={index}
              style={{
                background: `${color}`,
              }}
              className='rounded-lg w-11 h-11 border-2 cursor-pointer'
            ></span>
          ))}
      </div>

      {/* Data Section  */}
      <div className='py-5 md:w-[46%] flex-col flex gap-3 justify-start'>
        <h1 className='font-bold text-2xl max-sm:text-xl'>{product?.title}</h1>
        <p className='text-sm text-neutral-600'>
          <span
            className='text-sm'
            dangerouslySetInnerHTML={{
              __html: showFull
                ? product?.summary
                : product?.summary.slice(0, 120),
            }}
          />
          {/* {showFull ? product?.summary : product?.summary.slice(0, 200)}{' '} */}
          <span
            onClick={() => setShowFull(!showFull)}
            className='font-semibold text-pink-500 cursor-pointer'
          >
            {showFull ? ' show less' : ' ...show full'}
          </span>
        </p>
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
            {addingWishList ? (
              <Loader2 size={27} className='text-pink-600 animate-spin' />
            ) : (
              <Heart
                onClick={handleAddWishList}
                className={`text-pink-500 cursor-pointer ${
                  user?.wishlistItem?.some(
                    (item) => item.productId === product.id
                  ) && 'fill-pink-500'
                }`}
                size={27}
              />
            )}
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

        <div className='w-full max-sm:hidden flex gap-2 items-center'>
          {product?.images.length > 0 &&
            Array.from(
              new Set(product.images.map((item) => item?.color?.code))
            ).map((color, index) => (
              <span
                onClick={() => {
                  const selectedImage = product.images.find(
                    (item) => item.color.code === color
                  )
                  setThumbnailUrl(selectedImage?.imageUrl)
                }}
                key={index}
                style={{
                  background: `${color}`,
                }}
                className='rounded-lg w-11 h-11 border-2 cursor-pointer'
              ></span>
            ))}
        </div>

        {/* Product info collapsible card */}
        <div className='mb-1 flex flex-col gap-2'>
          <ProductInfo
            isDangerouslySetInnerHTML={true}
            title={'Product description'}
            data={product.description}
          />
          <ProductInfo
            title={'Return Policy'}
            isDangerouslySetInnerHTML={true}
            data={product.returnPolicy}
          />
        </div>

        {/* Similar Product  */}
        <div>
          {/* <p className='text-xl font-semibold'>Similar Product</p> */}
          <div className='flex gap-4 py-2 flex-wrap'>
            {product?.similarProducts?.length > 0 &&
              product?.similarProducts?.map((product, index) => (
                <SimilarProductImage
                  key={index}
                  product={product}
                  onClick={() => router.push(`/product/${product.slug}`)}
                />
              ))}
          </div>
        </div>

        {/* Buy button  */}

        <div className='py-3 w-[90%] max-sm:fixed z-30 max-sm:px-5 max-sm:gap-3 max-sm:bg-white max-sm:w-full bottom-0 left-0 right-0 flex justify-between gap-4'>
          <button
            disabled={
              addingCart ||
              user?.cartItems?.some((item) => item.productId === product.id)
            }
            onClick={handleAddToCart}
            className={`rounded-lg ${
              addingCart && 'opacity-60'
            } py-2 w-full font-semibold bg-pink-200`}
          >
            {addingCart
              ? 'Adding...'
              : user?.cartItems?.some((item) => item.productId === product.id)
              ? 'ADDED'
              : 'ADD TO CART'}
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
        className='w-[130px] h-[160px] object-cover border max-sm:w-[50px] max-sm:h-[70px] rounded-lg'
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

const SimilarProductImage = ({ product, onClick }) => {
  return (
    <div onClick={onClick} className='cursor-pointer'>
      <img
        src={cdnPath + product?.thumbnailUrl}
        alt={product?.altText}
        className='w-[80px] h-[100px] rounded-lg'
      />
    </div>
  )
}

const ThumbnailImage = ({ image }) => {
  return (
    <Zoom>
      {/* <ImageMagnifier imageUrl={cdnPath + image} /> */}
      <img
        src={cdnPath + image}
        alt={image.altText}
        className='md:w-[500px] border object-cover rounded-lg md:h-[600px] max-sm:w-[353px] max-sm:h-[420px]'
      />
    </Zoom>
  )
}

export default DisplayPorductSection
