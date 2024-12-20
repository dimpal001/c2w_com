import RightArrowIcon from '@/app/HomePageComponents/RightArrowIcon'
import { ArrowRight, Facebook, Instagram, Youtube } from 'lucide-react'
import React from 'react'

const HeroProductSection = () => {
  return (
    <div className='p-3 py-7 flex gap-2'>
      <div className='p-3 py-5 lg:w-3/5 flex flex-col justify-between'>
        <div className='flex flex-col'>
          <h1 className='lg:text-4xl font-bold unbounded'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eaque
            fugiat
          </h1>
          <p className='py-4 text-lg text-neutral-600 leading-7'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
            maiores deleniti rerum iusto possimus magni natus eos placeat nemo,
            laboriosam accusantium voluptatem in temporibus ipsa quod delectus
            aperiam incidunt quis. Animi, sed aliquam.
          </p>
          <div className='flex justify-end'>
            <div className='lg:w-[50%] justify-between p-3 px-6 rounded-bl-[20px] font-semibold bg-pink-300 flex items-center gap-1'>
              <div>
                <p>Read more</p>
              </div>
              <div className='flex items-center gap-4'>
                <ArrowRight />
                <Instagram />
                <Facebook />
                <Youtube />
              </div>
            </div>
          </div>
        </div>

        <ExtraCard />
      </div>
      <div className='lg:w-2/5'>
        <img
          src='https://picsum.photos/457/524'
          className='w-full lg:h-[440px] rounded-tl-[70px] rounded-bl-[70px]'
          alt=''
        />
      </div>
    </div>
  )
}

const ExtraCard = () => {
  return (
    <div className='flex gap-4 p-2 bg-stone-100 items-center relative rounded-lg mt-auto'>
      <div className='w-[20%]'>
        <img
          src='https://picsum.photos/418/851'
          className='lg:h-[95px] lg:w-full object-cover rounded-lg'
          alt=''
        />
      </div>
      <div className='w-[80%]'>
        <p className='text-xl font-semibold leading-6'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          itaque in vero a.
        </p>
        <p className='text-sm text-neutral-500'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          dolore placeat libero maxime rem cupiditate impedit ut omnis harum
          commodi reiciendis officiis a, sunt voluptatum!
        </p>
      </div>
      <RightArrowIcon
        fill={'#ec4899'}
        className={'w-8 cursor-pointer absolute bottom-2 right-3'}
      />
    </div>
  )
}

export default HeroProductSection
