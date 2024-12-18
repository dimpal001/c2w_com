import React from 'react'

const HeroProductSection = () => {
  return (
    <div className='p-3 flex gap-2'>
      <div className='p-2 py-3'>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eaque
          fugiat mollitia reiciendis.
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui maiores
          deleniti rerum iusto possimus magni natus eos placeat nemo, laboriosam
          accusantium voluptatem in temporibus ipsa quod delectus aperiam
          incidunt quis. Animi, sed aliquam.
        </p>
        <div className='mt-auto'>
          <ExtraCard />
        </div>
        <div>
          <div className='lg:w-[50%] p-2 flex items-center gap-1'>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div>
        <img src='https://picsum.photos/457/524' className='w-full' alt='' />
      </div>
    </div>
  )
}

const ExtraCard = () => {
  return (
    <div className='flex gap-2 p-2 '>
      <div className='w-[20%]'></div>
      <div className='w-[80%]'>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          itaque in vero a.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          dolore placeat libero maxime rem cupiditate impedit ut omnis harum
          commodi reiciendis officiis a, sunt voluptatum!
        </p>
      </div>
    </div>
  )
}

export default HeroProductSection
