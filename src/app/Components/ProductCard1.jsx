/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Heart, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cdnPath } from './cdnPath'
import { useUserContext } from '../context/UserContext'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import Sale from './Sale'
import Link from 'next/link'

const ProductCard1 = ({ product }) => {
  const router = useRouter()
  const [addingWishList, setAddingWishList] = useState(false)
  const [thumbnail, setThumbnail] = useState(product.thumbnailUrl)

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
    <div
      onMouseEnter={() =>
        setThumbnail(
          product?.thumbnailUrl === product?.images[0]?.imageUrl
            ? product?.images[1]?.imageUrl
            : product?.images[0]?.imageUrl
        )
      }
      onMouseLeave={() => setThumbnail(product.thumbnailUrl)}
      className='w-60 max-sm:w-[182px] relative bg-zinc-100 p-2 hover:bg-zinc-200 cursor-pointer  rounded-lg overflow-hidden'
    >
      {/* Product Image */}
      <div className='h-[350px] max-sm:h-56 max-sm:w-full bg-stone-200 rounded-lg'>
        <Link href={`/product/${product?.slug}`}>
          <img
            src={cdnPath + thumbnail}
            alt={product.title}
            className='w-full h-full max-sm:w-full rounded-lg object-cover'
          />
        </Link>
      </div>

      {/* Product Details */}
      {/* Title */}
      <div className='p-2 max-sm:p-[3px] relative'>
        <h2
          onClick={() => window.open(`/product/${product?.slug}`, '_blank')}
          className='text-sm max-sm:text-[12px] hover:text-pink-600 hover:underline font-semibold text-gray-800 max-sm:font-normal text-wrap'
        >
          {product.title.slice(0, 45)} ..{' '}
        </h2>

        <div className='flex justify-between items-center mt-2'>
          {/* Price */}
          <div className='flex flex-row-reverse gap-1 items-center'>
            <p className='text-base lg:text-lg font-bold text-slate-950'>
              ₹{product.displayPrice}
            </p>
            <strike className='text-sm font-bold text-neutral-500'>
              ₹{product?.inventory[0]?.mrp}
            </strike>
          </div>

          <div className='flex'>
            {addingWishList ? (
              <Loader2 size={27} className='text-pink-600 animate-spin' />
            ) : (
              <Heart
                onClick={handleAddWishList}
                className={`text-pink-500 w-7 max-sm:w-6 h-7 max-sm:h-6 cursor-pointer ${
                  user?.wishlistItem?.some(
                    (item) => item.productId === product.id
                  ) && 'fill-pink-500'
                }`}
              />
            )}
          </div>
        </div>
      </div>

      {/* discount label  */}
      {product?.inventory?.length > 0 &&
        product?.inventory[0]?.discount > 0 &&
        product?.inventory[0]?.discount < 100 && (
          <div className='absolute top-[1px] left-5 max-sm:left-3'>
            <div className='relative'>
              <Sale className={''} />
              <p className='text-[11px] max-sm:text-[10px] max-sm:leading-3 leading-3 p-2 pb-4 text-white absolute inset-0 self-center text-center text-wrap'>
                {/* {discount} */}
                <strong className='text-[13px]'>{`${product?.inventory[0]?.discount}% `}</strong>
                {`Discount`}
              </p>
            </div>
          </div>
        )}
    </div>
  )
}

export default ProductCard1
