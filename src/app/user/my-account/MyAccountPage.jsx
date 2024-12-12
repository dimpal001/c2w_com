'use client'

import React, { useEffect, useState } from 'react'
import {
  User,
  Mail,
  Phone,
  Package,
  ShoppingCart,
  Truck,
  Settings,
  Gift,
  ArrowRight,
  LogOut,
  Heart,
} from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Skeleton from '@/app/Components/Skeleton'
import AddressSection from './AddressSection'
import LogoutModal from '@/app/Components/LogoutModal'
import { useUserContext } from '@/app/context/UserContext'

export default function MyAccountPage() {
  const [userDetails, setUserDetails] = useState(null)
  const [fetching, setFetching] = useState(true)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const { setUser } = useUserContext()

  const router = useRouter()

  useEffect(() => {
    fetchUserDetails()
    document.title = 'My Account | Clothes2Wear'
  }, [])

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('/api/users/get/my-account')
      setUserDetails(response.data)
      setFetching(true)
      setFetching(false)
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        setUser(null)
        localStorage.removeItem('user')
        router.push('/auth/signin')
      }
      router.push('/')
    }
  }

  if (fetching) {
    return <Skeleton className={'w-screen h-screen'} />
  }

  return (
    <div className='flex flex-col max-w-5xl mx-auto items-center p-6 min-h-screen'>
      {/* Header Section */}
      <div className=' w-full container mx-auto p-6 max-sm:p-3 py-10'>
        <div className='flex flex-col md:flex-row justify-between'>
          <div className='lg:w-[50%] flex flex-col gap-4 max-sm:gap-1'>
            <p className='lg:text-5xl max-sm:text-3xl font-bold'>
              Hii, {userDetails?.firstName}
            </p>
            <p className='lg:text-xl font-semibold'>I hope you doing well</p>
            <div className='flex gap-5 items-center lg:pt-8 max-sm:py-5'>
              <img
                src='https://www.picsum.photos/521/854'
                alt={userDetails?.firstName || 'clothes2wear'}
                className='w-28 h-28 max-sm:w-20 max-sm:h-20 rounded-xl max-sm:rounded-md object-cover'
              />
              <div className='text-center text-xl max-sm:text-sm md:text-left'>
                <p className='flex items-center gap-2 text-gray-700'>
                  <User className='w-5 h-5 max-sm:w-4 max-sm:h-4' />{' '}
                  {userDetails?.firstName} {userDetails?.lastName}
                </p>
                <p className='flex items-center gap-2 text-gray-700 mt-2'>
                  <Mail className='w-5 h-5 max-sm:w-4 max-sm:h-4' />{' '}
                  {userDetails?.email}
                </p>
                {userDetails?.mobileNumber && (
                  <p className='flex items-center gap-2 text-gray-700 mt-2'>
                    <Phone className='w-5 h-5 max-sm:w-4 max-sm:h-4' /> +91
                    {userDetails?.mobileNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='lg:w-[50%] flex gap-4 mt-4 md:mt-0 items-start'>
            <div className='flex flex-col items-center bg-green-50 p-3 px-5 rounded-xl text-center'>
              <Gift className='text-yellow-500 w-6 h-6' />
              <span className='text-sm text-gray-600'>Rewards</span>
            </div>
            <div className='flex flex-col items-center text-center bg-green-50 p-3 px-5 rounded-xl'>
              <Truck className='text-red-500 w-6 h-6' />
              <span className='text-sm text-gray-600'>Free Shipping</span>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center max-sm:mt-3'>
        <div className='h-[1px] w-[50%] bg-neutral-400'></div>
      </div>

      <div className='flex flex-col items-start container lg:p-6 mx-auto gap-5'>
        {/* Menu Section */}
        <div className='bg-neutral-100 rounded-lg shadow-md w-full max-w-5xl p-6 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[
            {
              title: 'Orders',
              icon: Package,
              onClick: () => router.push('/user/my-orders'),
            },
            {
              title: 'Cart',
              icon: ShoppingCart,
              onClick: () => router.push('/user/my-cart'),
            },
            {
              title: 'Wishlist',
              icon: Heart,
              onClick: () => router.push('/user/my-favourite'),
            },
            { title: 'Profile', icon: User },
            {
              title: 'Settings',
              icon: Settings,
              onClick: () => router.push('/user/settings'),
            },
            {
              title: 'Logout',
              icon: LogOut,
              color: 'text-red-600 hover:bg-red-600 hover:text-white',
              onClick: () => setShowLogoutModal(true),
            },
          ].map((item, index) => (
            <div
              onClick={item.onClick}
              key={index}
              className={`flex cursor-pointer ${
                item.color && item.color
              } justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-black hover:text-white transition`}
            >
              <div className='flex items-center gap-4'>
                <item.icon className='w-6 h-6' />
                <span className='font-medium'>{item.title}</span>
              </div>
              <ArrowRight className='w-5 h-5' />
            </div>
          ))}
        </div>

        {/* Address Section */}
        <AddressSection userDetails={userDetails} />
        {showLogoutModal && (
          <LogoutModal
            isOpen={true}
            onClose={() => setShowLogoutModal(false)}
          />
        )}
      </div>
    </div>
  )
}
