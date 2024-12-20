import React from 'react'

const SideProductsSection = () => {
  return (
    <div className='flex flex-col justify-between h-full p-1'>
      <ProductCard />
      <ProductCard />
      <div className='relative rounded-lg rounded-bl-[90px] h-[180px]'>
        <img
          src='https://picsum.photos/851/797'
          className='rounded-lg h-[180px] rounded-bl-[90px] object-cover w-full'
          alt=''
        />
        <div className='absolute rounded-lg rounded-bl-[90px] flex items-end p-3 font-semibold text-lg text-end text-white bg-gradient-to-b from-transparent to-black bottom-0 right-0 left-0 h-[90%]'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quia
            iusto ea?
          </p>
        </div>
      </div>
    </div>
  )
}

const ProductCard = () => {
  return (
    <div className='shadow-md rounded-lg border flex justify-center items-center gap-1'>
      <div>
        <p className='text-sm font-semibold p-2 text-end leading-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          officiis suscipit nostrum repudiandae!
        </p>
      </div>
      <div>
        <img
          src='https://picsum.photos/745/638'
          className='w-[300px] h-[90px] rounded-lg object-cover'
          alt=''
        />
      </div>
    </div>
  )
}

export default SideProductsSection
