'use client'

import React, { useEffect, useState } from 'react'
import { ArrowLeftCircle, Heart, Trash } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/app/context/UserContext'
import Skeleton from '@/app/Components/Skeleton'

export default function FavouritePage() {
  const [products, setProducts] = useState([])
  const [fetching, setFetching] = useState(true)

  const { user } = useUserContext()
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

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products?.length > 0 &&
          products.map((item) => (
            <div
              key={item.id}
              className='bg-zinc-100 hover:bg-zinc-200 rounded-lg p-6 flex flex-col justify-between h-full'
            >
              <div className='flex items-center gap-4'>
                <img
                  src={item.product.thumbnailUrl}
                  alt={item.product.title}
                  className='w-24 h-24 object-cover rounded-lg'
                />
                <div className='flex flex-col'>
                  <p
                    onClick={() => router.push(`/product/${item.product.slug}`)}
                    className='text-xl cursor-pointer hover:underline max-sm:text-lg max-sm:leading-[20px] font-semibold text-gray-800'
                  >
                    {item.product.title}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Price: ₹{item.product.displayPrice}
                  </p>
                </div>
              </div>

              <div className='flex text-xs items-center justify-between mt-4'>
                <button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300'>
                  Add to Cart
                </button>
                <button className='bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-500 transition duration-300'>
                  Buy now
                </button>
                <button className='text-red-600 hover:text-red-500 flex items-center gap-2'>
                  <Trash className='w-5 h-5' /> Remove
                </button>
              </div>
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
