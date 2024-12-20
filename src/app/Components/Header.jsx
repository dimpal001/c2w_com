/* eslint-disable react/prop-types */
'use client'

import { Camera, Heart, Menu, Search, ShoppingCart, User } from 'lucide-react'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import SideDrawer from './SideDrawer'
import LogoImg from '../../assets/img.webp'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../context/UserContext'
import { useSearch } from '../context/SearchContext'
import { enqueueSnackbar } from 'notistack'

const Header = ({ sticky = true }) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const { searchQuery, setSearchQuery } = useSearch()
  const [query, setQuery] = useState(searchQuery || '')

  const inputRef = useRef(null)

  const { user } = useUserContext()

  const router = useRouter()

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen((prevState) => !prevState)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setSearchQuery(query.trim())

    if (query === '') {
      enqueueSnackbar('Type something ...', { autoHideDuration: 500 })
      return
    }

    if (inputRef.current) {
      inputRef.current.blur()
    }

    router.push(`/search?search=${query}`)
  }

  return (
    <>
      <div
        className={`grid grid-cols-3 items-center gap-3 p-4 max-sm:p-5 ${
          sticky ? 'sticky top-0 z-50 bg-white' : ''
        }`}
      >
        {/* Mobile Menu Drawer */}
        <div className='sm:hidden'>
          <div className='flex items-center gap-3'>
            <Menu onClick={toggleFilterDrawer} strokeWidth={3} />
            <Search
              strokeWidth={3}
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>
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
        <div className='md:w-[70%] max-sm:hidden'>
          <div className='p-2 px-4 rounded-full bg-neutral-100 flex items-center gap-2'>
            <Camera size={20} />
            <form onSubmit={handleSubmit}>
              <input
                placeholder='Search here...'
                type='text'
                className='w-full text-sm focus:outline-none bg-transparent'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
            <Search size={20} className='cursor-pointer' />
          </div>
        </div>

        {/* Logo */}
        <div className='flex justify-center gap-2'>
          <Link href={'/'}>
            <Image
              layout='intrinsic'
              className='md:w-52'
              src={LogoImg}
              alt='Logo'
            />
          </Link>
        </div>

        {/* Right Section */}
        <div className='flex items-center justify-end gap-2 max-sm:hidden'>
          <div
            onClick={() =>
              router.push(user ? '/user/my-favourite' : '/auth/signin')
            }
            className='flex items-center gap-2 cursor-pointer text-sm bg-transparent hover:bg-neutral-100 p-2 px-5 rounded-full'
          >
            <Heart size={20} className='fill-black text-black' />
            Favourite
          </div>
          <div
            onClick={() => router.push(user ? '/user/my-cart' : '/auth/signin')}
            className='flex items-center gap-2 cursor-pointer text-sm bg-transparent hover:bg-neutral-100 p-2 px-5 rounded-full'
          >
            <ShoppingCart size={20} className='fill-black text-black' />
            Cart
          </div>
          <div
            onClick={() =>
              router.push(user ? '/user/my-account' : '/auth/signin')
            }
            className='flex items-center gap-2 group cursor-pointer text-sm bg-black text-white hover:text-black hover:bg-neutral-100 p-2 px-5 rounded-full'
          >
            <User
              size={20}
              className='fill-white group-hover:fill-blackc group-hover:text-black text-white'
            />
            My account
          </div>
        </div>

        {/* Mobile Right Section */}
        <div className='sm:hidden justify-end flex items-center gap-3'>
          <Heart
            onClick={() => router.push('/user/my-favourite')}
            fill='black'
          />
          <ShoppingCart
            onClick={() => router.push('/user/my-cart')}
            fill='black'
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`sm:hidden px-5 transition-all duration-100 ${
          showSearch ? 'h-[42px]' : 'h-0'
        } `}
      >
        <input
          ref={inputRef}
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          name=''
          placeholder='Search here'
          className={`border mt-2 w-full focus:outline-none focus:border-pink-500 p-2 ${
            showSearch ? 'block' : 'hidden'
          }`}
          id=''
        />
      </form>
    </>
  )
}

export default Header
