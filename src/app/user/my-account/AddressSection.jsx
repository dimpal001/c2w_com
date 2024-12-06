/* eslint-disable react/prop-types */
import { CirclePlus, Edit } from 'lucide-react'
import React, { useState } from 'react'
import AddEditAddressModal from './AddEditAddressModal'

const AddressSection = ({ userDetails }) => {
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)
  return (
    <div className='bg-zinc-100 rounded-lg shadow-md w-full max-w-5xl p-6 mt-6'>
      <div className='flex justify-between items-center w-full'>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-bold mb-2'>Address</h2>
            <div
              onClick={() => {
                setEditMode(false)
                setShowAddressModal(true)
                setSelectedAddress(null)
              }}
              className='flex items-center gap-1 hover:gap-2 cursor-pointer transition-all duration-300 text-blue-500 hover:text-blue-600'
            >
              <CirclePlus className='lg:w-5 lg:h-5' />
              <p>Add New</p>
            </div>
          </div>
          {userDetails.addresses.length > 0 &&
            userDetails.addresses.map((item, index) => (
              <div key={index} className='flex gap-2 text-sm items-center mb-4'>
                <p className='text-gray-600'>
                  {item?.addressLine1} <br /> {item?.mobileNumber} <br />{' '}
                  {item?.addressLine2 && item?.addressLine2}{' '}
                  {item?.addressLine2 && <br />}
                  {item?.city}, {item?.zipCode}, {item?.state}, {item?.country}
                </p>{' '}
                <br />
                <button
                  onClick={() => {
                    setSelectedAddress(item)
                    setEditMode(true)
                    setShowAddressModal(true)
                  }}
                  className='flex items-center gap-2 text-blue-500 hover:underline'
                >
                  <Edit className='w-5 h-5' /> Edit
                </button>
              </div>
            ))}
          {showAddressModal && (
            <AddEditAddressModal
              isEdit={editMode}
              address={selectedAddress}
              isOpen={true}
              onClose={() => setShowAddressModal(false)}
              onSave={() => window.location.reload()}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AddressSection
