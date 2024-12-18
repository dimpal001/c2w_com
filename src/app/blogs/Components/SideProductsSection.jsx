import React from 'react'

const SideProductsSection = () => {
  return (
    <div className='flex flex-col gap-2 p-1'>
      <ProductCard />
      <ProductCard />
      <div className='relative '>
        <img src='' alt='' />
        <div className='absolute bg-gradient-to-b from-transparent to-black bottom-0 right-0 left-0 h-[50%]'>
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
    <div className='p-2 flex justify-center items-center gap-1'>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          officiis suscipit nostrum repudiandae!
        </p>
      </div>
      <div>
        <img src='' alt='' />
      </div>
    </div>
  )
}

export default SideProductsSection
