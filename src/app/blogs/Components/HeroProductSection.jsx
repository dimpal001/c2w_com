import RightArrowIcon from '@/app/HomePageComponents/RightArrowIcon'
import { ArrowRight, Facebook, Instagram, Youtube } from 'lucide-react'
import React from 'react'

const HeroProductSection = () => {
  return (
    <div className='p-3 py-7 flex gap-2 max-sm:flex-col-reverse'>
      <div className='p-3 py-5 md:w-3/5 flex flex-col justify-between'>
        <div className='flex flex-col'>
          <h1 className='md:text-4xl text-2xl font-bold unbounded'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eaque
            fugiat
          </h1>
          <p className='py-4 text-base leading-6 md:text-lg text-neutral-600 md:leading-7'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
            maiores deleniti rerum iusto possimus magni natus eos placeat nemo,
            laboriosam accusantium voluptatem in temporibus
          </p>
          <div className='flex md:justify-end max-sm:justify-start'>
            <div className='md:w-[50%] w-full justify-between p-3 px-6 rounded-e-full md:rounded-bl-[20px] font-semibold bg-pink-300 flex items-center gap-1'>
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
      <div className='md:w-2/5'>
        <img
          src='https://picsum.photos/457/524'
          className='w-full md:h-[440px] max-sm:h-[200px] rounded-tl-[70px] rounded-bl-[70px]'
          alt=''
        />
      </div>
    </div>
  )
}

const ExtraCard = () => {
  return (
    <div className='flex max-sm:mt-10 max-sm:flex-col md:gap-4 p-2 bg-zinc-200 items-center relative rounded-lg mt-auto'>
      <div className='md:w-[20%] w-full'>
        <img
          src='https://picsum.photos/418/851'
          className='md:h-[95px] h-[150px] w-full md:w-full object-cover rounded-lg'
          alt=''
        />
      </div>
      <div className='md:w-[80%] p-2'>
        <p className='md:text-xl font-semibold md:leading-6'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          itaque
        </p>
        <p className='text-sm text-neutral-500 max-sm:py-1'>
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
