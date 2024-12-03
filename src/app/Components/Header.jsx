/* eslint-disable react/prop-types */
'use client'

import { Camera, Heart, Menu, Search, ShoppingCart, User } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import SideDrawer from './SideDrawer'
import LogoImg from '../../assets/img.webp'
import { useRouter } from 'next/navigation'

const Header = ({ sticky = true }) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  const router = useRouter()

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen((prevState) => !prevState)
  }

  return (
    <div
      className={`grid grid-cols-3 items-center gap-3 p-4 max-sm:p-5 shadow-lg shadow-zinc-200 ${
        sticky ? 'sticky top-0 z-50 bg-white' : ''
      }`}
    >
      {/* Mobile Menu Drawer */}
      <div className='sm:hidden'>
        <Menu onClick={toggleFilterDrawer} strokeWidth={3} />
        <Drawer
          open={filterDrawerOpen}
          onClose={toggleFilterDrawer}
          direction='left'
          lockBackgroundScroll={true}
          duration={100}
          overlayOpacity={0.6}
          className='transition-none'
        >
          <div>
            <SideDrawer />
          </div>
        </Drawer>
      </div>

      {/* Search Bar */}
      <div className='lg:w-[70%] max-sm:hidden'>
        <div className='p-2 px-4 rounded-full bg-neutral-100 flex items-center gap-2'>
          <Camera size={20} />
          <input
            placeholder='Search here...'
            type='text'
            className='w-full text-sm focus:outline-none bg-transparent'
          />
          <Search size={20} className='cursor-pointer' />
        </div>
      </div>

      {/* Logo */}
      <div className='flex justify-center gap-2'>
        <Link href={'/'}>
          <Image
            layout='intrinsic'
            className='lg:w-52'
            src={LogoImg}
            alt='Logo'
          />
        </Link>
      </div>

      {/* Right Section */}
      <div className='flex items-center justify-end gap-2 max-sm:hidden'>
        <div className='flex items-center gap-2 cursor-pointer text-sm bg-transparent hover:bg-neutral-100 p-2 px-5 rounded-full'>
          <Heart size={20} className='fill-black text-black' />
          Favourite
        </div>
        <div className='flex items-center gap-2 cursor-pointer text-sm bg-transparent hover:bg-neutral-100 p-2 px-5 rounded-full'>
          <ShoppingCart size={20} className='fill-black text-black' />
          Cart
        </div>
        <div
          onClick={() => router.push('/my-account')}
          className='flex items-center gap-2 cursor-pointer text-sm bg-transparent hover:bg-neutral-100 p-2 px-5 rounded-full'
        >
          <User size={20} className='fill-black text-black' />
          My account
        </div>
      </div>

      {/* Mobile Right Section */}
      <div className='sm:hidden justify-end flex items-center gap-3'>
        <Heart fill='black' />
        <ShoppingCart fill='black' />
      </div>
    </div>
  )
}

export default Header
