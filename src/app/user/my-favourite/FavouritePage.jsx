'use client'

import React, { useEffect, useState } from 'react'
import { ArrowLeftCircle, Heart, Loader2, Trash2 } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/app/context/UserContext'
import Skeleton from '@/app/Components/Skeleton'
import { cdnPath } from '@/app/Components/cdnPath'
import { enqueueSnackbar } from 'notistack'

export default function FavouritePage() {
  const [products, setProducts] = useState([])
  const [fetching, setFetching] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const { user, setUser } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
    document.title = 'My Wishlist | Clothes2Wear'
  }, [])

  const fetchProducts = async () => {
    try {
      setFetching(true)
      const response = await axios.get(
        `/api/users/get/single-user?id=${user.id}&data=wishlist`
      )
      setProducts(response.data.user.wishlist)
      setFetching(false)
    } catch (error) {
      console.log(error)
      router.push('/')
    }
  }

  const handleRemoveFromWishlist = async (product) => {
    if (!product) return

    try {
      setDeleting(true)
      const response = await axios.post('/api/wishlist/remove', {
        userId: user.id,
        productId: product.id,
      })

      const updatedProducts = products.filter(
        (item) => item.product.id !== product.id
      )

      setProducts(updatedProducts)

      const updatedUser = {
        ...user,
        wishlistItem: user?.wishlistItem?.filter(
          (item) => item.productId !== product.id
        ),
      }

      setUser(updatedUser)

      localStorage.setItem('user', JSON.stringify(updatedUser))

      enqueueSnackbar(response?.data?.message || 'Removed from wishlist.', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to remove from wishlist.',
        { variant: 'error' }
      )
    } finally {
      setDeleting(false)
    }
  }

  if (fetching) {
    return <Skeleton className={'w-screen h-screen'} />
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='flex justify-between items-center mb-8'>
        <div className='flex items-center gap-4'>
          <Heart className='w-8 h-8 text-pink-600' />
          <h1 className='text-3xl max-sm:text-xl font-semibold'>Favourites</h1>
        </div>
        <button
          onClick={() => router.push('/')}
          className='text-lg text-blue-600 max-sm:text-sm max-sm:gap-1 hover:gap-4 transition-all duration-300 flex items-center gap-2'
        >
          <ArrowLeftCircle size={22} />
          Continue Shopping
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-6'>
        {products?.length > 0 &&
          products.map((item, index) => (
            <div
              key={index}
              className='bg-zinc-100 relative z-10 hover:bg-zinc-200 rounded-lg p-6 flex flex-col justify-between h-full'
            >
              <div className='flex items-center gap-4'>
                <img
                  src={cdnPath + item.product.thumbnailUrl}
                  alt={item.product.title}
                  className='w-24 h-24 object-cover rounded-lg'
                />
                <div className='flex flex-col'>
                  <p
                    onClick={() => router.push(`/product/${item.product.slug}`)}
                    className='text-xl cursor-pointer hover:text-pink-600 hover:underline max-sm:text-lg max-sm:leading-[20px] font-semibold text-gray-800'
                  >
                    {item.product.title}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Price: ₹{item.product.displayPrice}
                  </p>
                </div>
              </div>
              {deleting ? (
                <Loader2 className='text-pink-600 absolute animate-spin top-3 right-3' />
              ) : (
                <Trash2
                  onClick={() => {
                    handleRemoveFromWishlist(item.product)
                  }}
                  className='text-red-600 absolute top-3 right-3'
                />
              )}
            </div>
          ))}
      </div>

      <div className='mt-8 bg-zinc-100 p-6 rounded-lg'>
        <p className='text-lg font-semibold text-gray-800'>
          You have {products?.length} item(s) in your favourites.
        </p>
      </div>
    </div>
  )
}
