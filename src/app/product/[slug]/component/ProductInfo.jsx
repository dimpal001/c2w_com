/* eslint-disable react/prop-types */
import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import Collapsible from 'react-collapsible'

const ProductInfo = ({ title, data }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={open && 'bg-pink-50'}>
      <Collapsible
        transitionTime={300}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        className={open && 'bg-pink-50'}
        trigger={
          <div
            className={`flex items-center gap-3 ${
              open ? 'text-pink-500' : 'text-black'
            }`}
          >
            <div
              className={`transition-transform duration-250 ${
                open ? '-rotate-[90deg]' : 'rotate-0'
              }`}
            >
              <ChevronLeft />
            </div>
            <p className='text-lg'>{title}</p>
          </div>
        }
      >
        <p className='text-sm lg:pl-9 p-2'>{data}</p>
        <div className='bg-neutral-300 mt-2 w-full h-[1px]'></div>
      </Collapsible>
    </div>
  )
}

export default ProductInfo
