'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { User, Settings, LogOut, LogIn } from 'lucide-react'
import axios from 'axios'

const SideDrawer = () => {
  const [categories, setCategories] = useState([])
  const pathname = usePathname()
  const currentSlug = pathname.split('/').pop()

  const router = useRouter()

  useEffect(() => {
    // Fetch categories from API
    axios
      .get('/api/admin/menu/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error))
  }, [])

  return (
    <div className='w-72 bg-black text-white h-screen'>
      {/* User Details */}
      <div className='p-4 border-b border-gray-700'>
        <div
          onClick={() => router.push('/my-account')}
          className='flex items-center space-x-3'
        >
          <span className='w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center'>
            DD
          </span>

          <div>
            <p className='text-lg font-semibold'>Dimpal Das</p>
            <p className='text-sm text-gray-400'>dimpaldas.in@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Profile Links */}
      <div className='p-4 border-b border-gray-700'>
        <ul className='space-y-3'>
          <li
            onClick={() => router.push('/my-account')}
            className={`flex ${
              currentSlug === 'my-account' && 'bg-pink-600 text-white'
            }  items-center space-x-3 hover:bg-gray-700 p-2 rounded`}
          >
            <User className='w-5 h-5' />
            <span>Profile</span>
          </li>
          <li
            onClick={() => router.push('/auth/signin')}
            className={`flex ${
              currentSlug === 'auth/signin' && 'bg-pink-600 text-white'
            }  items-center space-x-3 hover:bg-gray-700 p-2 rounded`}
          >
            <LogIn className='w-5 h-5' />
            <span>Login</span>
          </li>
          <li
            className={`flex ${
              currentSlug === 'settings' && 'bg-pink-600 text-white'
            } items-center space-x-3 hover:bg-gray-700 p-2 rounded`}
          >
            <Settings className='w-5 h-5' />
            <span>Settings</span>
          </li>
          <li className='flex items-center text-red-500 space-x-3 hover:bg-gray-700 p-2 rounded'>
            <LogOut className='w-5 h-5' />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* Categories */}
      <div className='p-4'>
        <p className='text-sm font-semibold text-gray-400 uppercase mb-3'>
          Categories
        </p>
        <ul className='space-y-3'>
          {categories.map((category) => (
            <li
              onClick={() => router.push(`/category/${category.slug}`)}
              key={category.slug}
              className={`flex items-center space-x-3 p-2 rounded ${
                currentSlug === category.slug
                  ? 'bg-pink-600 text-white'
                  : 'hover:bg-gray-700'
              }`}
            >
              {/* <Home className='w-5 h-5' /> */}
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideDrawer
