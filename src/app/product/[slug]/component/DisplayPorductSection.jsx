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
  Forward,
  Heart,
  Link,
  Loader2,
  Minus,
  MoveDown,
  Plus,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import ProductInfo from './ProductInfo'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import ImageMagnifier from './ImageMagnifier'

const faqs = `<div style="max-width: 800px; margin: 0 auto; padding: 20px;">

    <div style="margin-bottom: 15px;">
        <strong style="font-size: 18px;">What is the return policy?</strong>
        <p style="padding: 10px;  color: #555;">Our return policy allows returns within 30 days of purchase. Items must be in original condition with all tags attached.</p>
    </div>

    <div style="margin-bottom: 15px;">
        <strong style="font-size: 18px;">How can I track my order?</strong>
        <p style="padding: 10px;  color: #555;">Once your order has shipped, you will receive a tracking number via email or SMS. You can track your order through the link provided.</p>
    </div>

    <div style="margin-bottom: 15px;">
        <strong style="font-size: 18px;">Do you offer free shipping?</strong>
        <p style="padding: 10px;  color: #555;">We offer free shipping on orders over $50 within the United States. International shipping fees apply.</p>
    </div>

    <div style="margin-bottom: 15px;">
        <strong style="font-size: 18px;">Can I change my order after placing it?</strong>
        <p style="padding: 10px;  color: #555;">We process orders quickly, so once placed, it’s difficult to make changes. However, you can contact our customer service team as soon as possible, and we will try our best to assist you.</p>
    </div>

    <div style="margin-bottom: 15px;">
        <strong style="font-size: 18px;">What payment methods do you accept?</strong>
        <p style="padding: 10px;  color: #555;">We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.</p>
    </div>

    <div style="margin-bottom: 15px;">
        <strong style="font-size: 18px;">How do I return an item?</strong>
        <p style="padding: 10px;  color: #555;">To return an item, please visit our Returns Center on the website, or contact our customer service team for assistance.</p>
    </div>

    <div style="margin-bottom: 15px;">
        <strong style="font-size: 18px;">Are your products genuine?</strong>
        <p style="padding: 10px;  color: #555;">Yes, all our products are 100% genuine and come directly from authorized suppliers and manufacturers.</p>
    </div>
</div>
`

const DisplayPorductSection = ({ product }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(product?.thumbnailUrl || '')
  const [selectedColor, setSelectedColor] = useState(
    product?.images[0].colorId || ''
  )
  const [selectedQuantity, setSelectedQuantity] = useState(
    product?.inventory[0].minQuantity
  )

  const [addingCart, setAddingCart] = useState(false)
  const [addingWishList, setAddingWishList] = useState(false)

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
        colorId: selectedColor,
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
        colorId: selectedColor,
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

  useEffect(() => {
    console.log(selectedColor)
    console.log(product?.images)
  }, [])

  return (
    <div className='flex max-sm:flex-col gap-3 lg:gap-8'>
      {/* Image Section  */}
      <div className='flex max-sm:flex-col-reverse md:pl-10 gap-8 max-sm:gap-2 md:w-[54%]'>
        <div className='flex max-sm:flex-row flex-col gap-3 max-sm:gap-2 md:max-h-[900px] scrollbar-hide overflow-scroll'>
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
                setSelectedColor(selectedImage?.colorId)
                setThumbnailUrl(selectedImage?.imageUrl)
              }}
              key={index}
              style={{
                background: `${color}`,
              }}
              className={`rounded-lg ${
                selectedColor ===
                product?.images.find((item) => item.color.code === color)
                  .colorId
                  ? 'ring-2 ring-black'
                  : 'ring-0'
              } w-11 h-11 cursor-pointer`}
            ></span>
          ))}
      </div>

      {/* Data Section  */}
      <div className='py-5 max-sm:py-2 md:w-[46%] flex-col flex gap-3 justify-start'>
        <div className='flex flex-col gap-1 lg:gap-2'>
          <h1 className='font-bold text-2xl leading-[27px] max-sm:leading-[20px] max-sm:text-lg'>
            {product?.title}
          </h1>
          <p className='text-base max-sm:text-sm'>
            Seller Code. <strong>{product?.sellerCode}</strong>
          </p>
          <p className='text-base max-sm:text-sm'>
            Style No. <strong>{product?.styleId}</strong>
          </p>
        </div>
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
                  setSelectedColor(selectedImage?.colorId)
                  setThumbnailUrl(selectedImage?.imageUrl)
                }}
                key={index}
                style={{
                  background: `${color}`,
                }}
                className={`rounded-lg ${
                  selectedColor ===
                  product?.images.find((item) => item.color.code === color)
                    .colorId
                    ? 'ring-2 ring-black'
                    : 'ring-0'
                } w-11 h-11 cursor-pointer`}
              ></span>
            ))}
        </div>

        {/* Buy button  */}
        <div className='py-3 w-full max-sm:fixed z-30 max-sm:px-5 max-sm:gap-2 max-sm:text-sm max-sm:bg-white max-sm:w-full bottom-0 left-0 right-0 flex justify-between gap-4'>
          <button
            className={` p-2 rounded-lg max-sm:px-3 max-sm:p-1 px-4 bg-pink-200`}
          >
            {addingWishList ? (
              <Loader2 className='text-pink-600 w-10 h-10 max-sm:w-8 max-sm:h-8 animate-spin' />
            ) : (
              <Heart
                onClick={handleAddWishList}
                className={`text-pink-500 fill-white cursor-pointer ${
                  user?.wishlistItem?.some(
                    (item) => item.productId === product.id
                  ) && 'fill-pink-500 h-10 w-10 max-sm:w-8 max-sm:h-8'
                }`}
              />
            )}
          </button>
          <Dropdown>
            <DropdownTrigger>
              <button className='p-2 px-4 max-sm:p-1 bg-pink-200 rounded-lg'>
                <Forward className='text-pink-500 cursor-pointer w-8 h-8 max-sm:w-7 max-sm:h-7' />
              </button>
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
          <button
            disabled={
              addingCart ||
              user?.cartItems?.some((item) => item.productId === product.id)
            }
            onClick={handleAddToCart}
            className={`rounded-lg ${
              addingCart && 'opacity-60'
            } py-2 w-full max-sm:p-1 font-semibold bg-pink-200`}
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
            } py-2 max-sm:p-2 w-full flex justify-center items-center font-semibold bg-pink-400 uppercase`}
          >
            {submitting ? (
              <Loader2 className='text-white animate-spin' />
            ) : (
              <div className='flex justify-center items-center gap-5'>
                buy now
              </div>
            )}
          </button>
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

        {/* Product info collapsible card */}
        <div className='mb-1 flex flex-col gap-2'>
          <ProductInfo
            isDangerouslySetInnerHTML={true}
            title={'Product Specification'}
            data={product.summary}
          />
          <ProductInfo
            isDangerouslySetInnerHTML={true}
            title={'Product Description'}
            data={product.description}
          />
          <ProductInfo
            title={'Return Policy'}
            isDangerouslySetInnerHTML={true}
            data={product.returnPolicy}
          />

          <ProductInfo
            title={'FAQs'}
            isDangerouslySetInnerHTML={true}
            data={faqs}
          />
        </div>
      </div>
    </div>
  )
}

const ProductImage = ({ image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='cursor-pointer w-[130px] h-[180px] max-sm:w-[50px] max-sm:h-[70px]'
    >
      <img
        src={cdnPath + image.imageUrl}
        alt={image.altText}
        className='w-[130px] h-[180px] object-cover border max-sm:w-[50px] max-sm:h-[70px] rounded-lg'
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

        <div className='flex gap-8 py-2 items-center'>
          {selectedInventory?.price !== selectedInventory?.mrp && (
            <strike className='text-2xl italic strik'>
              ₹{selectedInventory.mrp}/-
            </strike>
          )}
          <span className='text-3xl font-semibold'>
            {' '}
            ₹{selectedInventory.price}/-
          </span>
          {selectedInventory && selectedInventory?.discount > 0 && (
            <span className='italic flex items-center -ml-5 font-semibold text-green-500'>
              <MoveDown />
              {selectedInventory?.discount}%
            </span>
          )}
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
    <div className='md:w-[550px] md:h-[900px] max-sm:w-[353px] max-sm:h-[600px]'>
      <Zoom>
        <ImageMagnifier imageUrl={cdnPath + image} />
        {/* <img
        src={cdnPath + image}
        alt={image.altText}
        className='md:w-[500px] border object-cover rounded-lg md:h-[600px] max-sm:w-[353px] max-sm:h-[420px]'
      /> */}
      </Zoom>
    </div>
  )
}

export default DisplayPorductSection
