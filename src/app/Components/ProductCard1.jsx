/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { ArrowRight, Heart, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cdnPath } from './cdnPath'
import { useUserContext } from '../context/UserContext'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import Sale from './Sale'

const ProductCard1 = ({ product }) => {
  const router = useRouter()
  const [addingWishList, setAddingWishList] = useState(false)

  const { user, setUser } = useUserContext()

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
          wishlistItem: user?.wishlistItem?.filter(
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
    <div className='w-60 max-sm:w-[182px] relative bg-zinc-100 p-2 hover:bg-zinc-200 cursor-pointer  rounded-lg overflow-hidden'>
      {/* Product Image */}
      <div className='h-60 max-sm:h-52 max-sm:w-full bg-stone-200 rounded-lg'>
        <img
          src={cdnPath + product.thumbnailUrl}
          alt={product.title}
          className='w-full h-full max-sm:w-full rounded-lg object-cover'
        />
      </div>

      {/* Product Details */}
      <div
        onClick={() => router.push(`/product/${product?.slug}`)}
        className='p-4 max-sm:p-2 group relative'
      >
        {/* Title */}
        <h2 className='text-sm group-hover:text-pink-600 group-hover:underline font-semibold text-gray-800 max-sm:font-normal text-wrap'>
          {product.title}
        </h2>

        {/* Price */}
        <p className='text-lg font-bold text-slate-950 mt-2'>
          ₹{product.displayPrice}
        </p>

        {/* Arrow Icon */}
        <div className='absolute bottom-4 right-4'>
          {/* <button className='bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors'> */}
          <ArrowRight strokeWidth={3} className='h-7 text-gray-700' />
          {/* </button> */}
        </div>
      </div>

      {/* Favourite icon  */}
      <div className='absolute w-20 h-20 flex justify-end top-3 right-3 z-10'>
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
      </div>

      {/* discount label  */}
      {product?.discounts.length > 0 && (
        <div className='absolute top-0 left-5'>
          <div className='relative'>
            <Sale className={''} />
            <p className='text-[13px] max-sm:text-[11px] max-sm:leading-3 font-semibold leading-4 p-2 pb-4 text-white absolute inset-0 self-center text-center text-wrap'>
              {product?.discounts[0]?.description
                ?.split(' ')
                .slice(0, 2)
                .join(' ')}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard1
