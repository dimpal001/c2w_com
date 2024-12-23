/* eslint-disable react/prop-types */
'use client'

import React, { useEffect, useState } from 'react'
import {
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeftCircle,
  Trash2,
  Loader2,
} from 'lucide-react'
import EmptyCartImage from './EmptyCartImage'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useUserContext } from '@/app/context/UserContext'
import Skeleton from '@/app/Components/Skeleton'
import { cdnPath } from '@/app/Components/cdnPath'
import { enqueueSnackbar } from 'notistack'

export default function MyCartPage() {
  const [products, setProducts] = useState([])
  const [fetching, setFetching] = useState(true)
  const [totalAmount, setTotalAmount] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const { user, setUser } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
    document.title = 'My Cart | Clothes2Wear'
  }, [])

  const fetchProducts = async () => {
    try {
      setFetching(true)
      const response = await axios.get(
        `/api/users/get/single-user?id=${user.id}&data=cart`
      )
      const cartItems = response.data.user.cartItems.map((item) => {
        const selectedInventory =
          item.product.inventory.find(
            (inv) => inv.size.id === item.selectedSizeId
          ) || item.product.inventory[0]
        return {
          ...item,
          selectedSizeId: selectedInventory.size.id,
          quantity: item.quantity,
        }
      })
      setProducts(cartItems)
      setFetching(false)
    } catch {
      router.push('/')
    }
  }

  const updateTotalAmount = () => {
    const total = products.reduce((acc, item) => {
      const inventory = item.product.inventory.find(
        (inv) => inv.size.id === item.selectedSizeId
      )
      return acc + (inventory ? inventory.price * item.quantity : 0)
    }, 0)
    setTotalAmount(total)
  }

  const handleRemoveFromWishlist = async (product) => {
    try {
      setDeleting(true)
      const response = await axios.post('/api/cart/remove', {
        cartItemId: product,
      })

      enqueueSnackbar(response.data.message, { variant: 'success' })
      const updatedProducts = products.filter((item) => item.id !== product)

      const updatedUser = {
        ...user,
        cartItems: user?.cartItems?.filter((item) => item.id !== product),
      }

      setUser(updatedUser)

      localStorage.setItem('user', JSON.stringify(updatedUser))

      setProducts(updatedProducts)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setDeleting(false)
    }
  }

  useEffect(() => {
    if (!fetching) {
      updateTotalAmount()
    }
  }, [products, fetching])

  if (fetching) {
    return <Skeleton className={'w-screen h-screen'} />
  }

  const handleCheckout = async () => {
    try {
      const orderData = {
        userId: user.id,
        totalPrice: totalAmount,
        orderItems: products.map((item) => {
          const inventory = item.product.inventory.find(
            (inv) => inv.size.id === item.selectedSizeId
          )
          return {
            productId: item.product.id,
            sizeId: inventory.size.id,
            quantity: item.quantity,
            price: inventory.price * item.quantity,
          }
        }),
      }

      const response = await axios.post('/api/orders/create', {
        userId: user.id,
        totalPrice: totalAmount,
        orderItems: orderData.orderItems,
      })

      if (response.status === 200) {
        const orderId = response.data.orderId
        router.push(`/checkout?id=${orderId}`)
      }
    } catch {
      // Empty
    }
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='flex justify-between items-center mb-8'>
        <div className='flex items-center gap-4'>
          <ShoppingCart className='w-8 h-8 text-pink-600' />
          <h1 className='text-3xl max-sm:text-xl font-semibold'>My Cart</h1>
        </div>
        <button
          onClick={() => router.push('/')}
          className='text-lg text-blue-600 max-sm:text-sm max-sm:gap-1 flex items-center gap-2 hover:gap-4 transition-all duration-300'
        >
          <ArrowLeftCircle size={22} />
          Continue Shopping
        </button>
      </div>

      <div className='flex gap-6 max-sm:gap-3 max-sm:flex-col items-start'>
        {products.length === 0 ? (
          <div className='flex w-full justify-center max-sm:h-[450px] items-center flex-col'>
            <div className='opacity-50'>
              <EmptyCartImage />
            </div>
            <p className='text-gray-600 mt-4 text-xl'>Your cart is empty</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:w-[65%] max-sm:w-full gap-6 max-sm:gap-3'>
            {products.map((item, index) => (
              <Item
                item={item}
                key={index}
                updateProduct={(updatedItem) => {
                  const updatedProducts = [...products]
                  updatedProducts[index] = updatedItem
                  setProducts(updatedProducts)

                  const total = updatedProducts.reduce((acc, item) => {
                    const inventory = item.product.inventory.find(
                      (inv) => inv.size.id === item.selectedSizeId
                    )
                    return (
                      acc + (inventory ? inventory.price * item.quantity : 0)
                    )
                  }, 0)
                  setTotalAmount(total)
                }}
                handleRemoveFromWishlist={handleRemoveFromWishlist}
                deleting={deleting}
              />
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className='md:w-[35%] max-sm:w-full bg-gradient-to-b from-pink-200 to-zinc-50 p-16 max-sm:p-10 gap-5 rounded-lg flex flex-col justify-between items-center'>
            <div>
              <p className='text-2xl font-bold'>Proceed to Checkout</p>
            </div>
            <div className='flex justify-between items-center w-full'>
              <p className='text-lg font-semibold text-gray-800'>
                Total Amount:
              </p>
              <p className='text-xl font-bold text-gray-900'>₹{totalAmount}</p>
            </div>
            <button
              onClick={() => handleCheckout()}
              className='bg-pink-500 text-white py-3 px-6 rounded-lg w-full hover:bg-pink-600 transition duration-300'
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const Item = ({ item, updateProduct, handleRemoveFromWishlist, deleting }) => {
  const [selectedInventory, setSelectedInventory] = useState(
    item.product.inventory.find((inv) => inv.size.id === item.selectedSizeId) ||
      item.product.inventory[0]
  )

  const [selectedQuantity, setSelectedQuantity] = useState(item.quantity)

  const router = useRouter()

  useEffect(() => {
    updateProduct({
      ...item,
      selectedSizeId: selectedInventory.size.id,
      quantity: selectedQuantity,
    })
  }, [selectedInventory, selectedQuantity])

  const handleChangeInventory = (sizeId) => {
    const inventory = item.product.inventory.find(
      (inv) => inv.size.id === sizeId
    )
    setSelectedInventory(inventory)
    setSelectedQuantity(item.quantity)
  }

  const handleQuantityChange = async (operation) => {
    if (operation === 'decrease') {
      if (selectedQuantity === selectedInventory.minQuantity) {
        return
      }
    }

    const newQuantity =
      operation === 'increase'
        ? selectedQuantity + 1
        : Math.max(selectedQuantity - 1, selectedInventory.minQuantity)

    try {
      setSelectedQuantity(newQuantity)

      const response = await axios.put('/api/cart/update', {
        cartItemId: item.id,
        mode: operation,
      })

      if (response.status === 200) {
        setSelectedQuantity(response.data.cartItem.quantity)
      }
    } catch {
      setSelectedQuantity(
        operation === 'increase' ? selectedQuantity - 1 : selectedQuantity + 1
      )
    }
  }

  return (
    <div className='bg-zinc-100 relative hover:bg-zinc-200 rounded-lg p-6 flex flex-col justify-between h-full'>
      <div className='flex items-center gap-4'>
        <img
          src={cdnPath + item.product.thumbnailUrl}
          alt={item.product.title}
          className='w-24 h-28 object-cover rounded-lg'
        />
        <div className='flex flex-col'>
          <p
            onClick={() => router.push(`/product/${item.product.slug}`)}
            className='text-xl cursor-pointer hover:underline max-sm:text-lg max-sm:leading-[20px] font-semibold text-gray-800'
          >
            {item.product.title}
          </p>
          <p className='text-sm text-gray-500'>
            Price: ₹{selectedInventory.price}
          </p>
          <div className='mt-2'>
            <select
              value={selectedInventory.size.id}
              onChange={(e) => handleChangeInventory(e.target.value)}
              className='px-3 py-2 border rounded-md'
            >
              {item.product.inventory.map((inv) => (
                <option key={inv.id} value={inv.size.id}>
                  {inv.size.name.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between mt-4'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => handleQuantityChange('decrease')}
            className='text-gray-500 hover:text-gray-600'
          >
            <Minus className='w-5 h-5' />
          </button>
          <p className='text-lg font-semibold'>{selectedQuantity}</p>
          <button
            onClick={() => handleQuantityChange('increase')}
            className='text-gray-500 hover:text-gray-600'
          >
            <Plus className='w-5 h-5' />
          </button>
        </div>
        <p className='text-lg font-semibold text-gray-700'>
          ₹{selectedInventory.price * selectedQuantity}
        </p>
      </div>
      {deleting ? (
        <Loader2 className='text-pink-600 absolute animate-spin top-3 right-3' />
      ) : (
        <Trash2
          onClick={() => {
            handleRemoveFromWishlist(item.id)
          }}
          className='text-red-600 absolute top-3 right-3'
        />
      )}
    </div>
  )
}
