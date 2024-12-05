/* eslint-disable react/prop-types */
import React from 'react'

const AddressSelector = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
}) => {
  return (
    <div className='bg-zinc-100 p-6 rounded-lg'>
      <h2 className='text-xl font-semibold mb-4'>Select Delivery Address</h2>
      <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-5'>
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`flex justify-between text-sm items-center p-4 border rounded-lg cursor-pointer ${
              selectedAddress === address.id
                ? 'border-pink-600'
                : 'border-gray-300'
            }`}
            onClick={() => setSelectedAddress(address.id)}
          >
            <div>
              <p className='font-semibold'>{address.addressLine1}</p>
              <p>{address.addressLine2}</p>
              <p>
                {address.city}, {address.zipCode}
              </p>
              <p>
                {address.state}, {address.country}
              </p>
            </div>
            <div>
              {selectedAddress === address.id && (
                <span className='text-pink-600'>Selected</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddressSelector
