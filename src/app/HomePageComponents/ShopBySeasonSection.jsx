import React from 'react'

const ShopBySeasonSection = () => {
  return (
    <div className='mb-10'>
      <SeasonCard />
    </div>
  )
}

const SeasonCard = () => {
  return (
    <div className='w-screen relative lg:h-[583px]'>
      <video
        className='w-screen object-cover lg:h-[583px]'
        autoPlay
        loop
        src='https://cdn.thefashionsalad.com/clothes2wear/image-1732613600913.mp4'
      ></video>
      <div className='w-ful z-10 opacity-40 absolute h-full inset-0 bg-black'></div>
      <div className='w-ful flex justify-center items-center text-white z-20 absolute h-full inset-0 bg-transparent'>
        <div>
          <p className='text-xl tracking-[20px] pb-3 uppercase font-bold text-center unbounded'>
            shop by
          </p>
          <p className='text-5xl uppercase tracking-[10px] font-extrabold text-center unbounded'>
            season
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShopBySeasonSection
