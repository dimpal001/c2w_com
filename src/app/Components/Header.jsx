import { Camera, Heart, Search, ShoppingCart, User } from 'lucide-react'
import React from 'react'
import LogoImg from '../../assets/img.webp'
import Image from 'next/image'

const Header = () => {
  return (
    <div className='grid grid-cols-3 items-center gap-3 p-4 max-sm:p-5 max-sm:shadow-lg shadow-zinc-200'>
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
      <div className='flex justify-center'>
        <Image layout='intrinsic' className='lg:w-52' src={LogoImg} alt='' />
      </div>
      <div className='flex items-center justify-end gap-2 max-sm:hidden'>
        <div className='flex items-center gap-2 cursor-pointer text-sm bg-transparent hover:bg-neutral-100 p-2 px-5 rounded-full'>
          <Heart size={20} className='fill-black text-black' />
          Favourite
        </div>
        <div className='flex items-center gap-2 cursor-pointer text-sm bg-transparent hover:bg-neutral-100 p-2 px-5 rounded-full'>
          <ShoppingCart size={20} className='fill-black text-black' />
          Cart
        </div>
        <div className='flex items-center gap-2 cursor-pointer text-sm bg-transparent hover:bg-neutral-100 p-2 px-5 rounded-full'>
          <User size={20} className='fill-black text-black' />
          My account
        </div>
      </div>
    </div>
  )
}

export default Header
