/* eslint-disable react/prop-types */
import { CirclePlus, Edit } from 'lucide-react'
import React from 'react'

const AddressSection = ({ userDetails }) => {
  return (
    <div className='bg-neutral-100 lg:w-[50%] rounded-lg shadow-md w-full max-w-4xl p-6 mt-6'>
      <div className='flex justify-between items-center w-full'>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-bold mb-2'>Address</h2>
            <div className='flex items-center gap-1 hover:gap-2 cursor-pointer transition-all duration-300 text-blue-500 hover:text-blue-600'>
              <CirclePlus className='lg:w-5 lg:h-5' />
              <p>Add New</p>
            </div>
          </div>
          {userDetails.addresses.length > 0 &&
            userDetails.addresses.map((item, index) => (
              <div key={index} className='flex gap-1 items-center mb-2'>
                <p className='text-gray-600'>
                  {item?.addressLine1} <br />{' '}
                  {item?.addressLine2 && item?.addressLine2}{' '}
                  {item?.addressLine2 && <br />}
                  {item?.zipCode}, {item?.state}, {item?.country}
                </p>{' '}
                <br />
                <button className='flex items-center gap-2 text-blue-500 hover:underline'>
                  <Edit className='w-5 h-5' /> Edit
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AddressSection
