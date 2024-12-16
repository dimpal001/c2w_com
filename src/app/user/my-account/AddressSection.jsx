/* eslint-disable react/prop-types */
import { CirclePlus } from 'lucide-react'
import React, { useState } from 'react'
import AddEditAddressModal from './AddEditAddressModal'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import DeleteModal from '@/app/Components/DeleteModal'

const AddressSection = ({ userDetails, refresh }) => {
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const deleteAddress = async () => {
    try {
      const response = await axios.post('/api/users/address/remove', {
        addressId: selectedAddress?.id,
        userId: selectedAddress?.userId,
      })
      setShowDeleteModal(false)
      enqueueSnackbar(response?.data?.message, { variant: 'success' })
      refresh()
    } catch (error) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.message || 'An error occurred.'
      enqueueSnackbar(errorMessage, { variant: 'error' })
    }
  }

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
              <div
                key={index}
                className='flex gap-2 text-sm max-sm:justify-between items-end mb-4'
              >
                <p className='text-gray-600'>
                  {item?.addressLine1} <br /> {item?.mobileNumber} <br />{' '}
                  {item?.addressLine2 && item?.addressLine2}{' '}
                  {item?.addressLine2 && <br />}
                  {item?.city}, {item?.zipCode}, {item?.state}, {item?.country}
                </p>{' '}
                <br />
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => {
                      setSelectedAddress(item)
                      setEditMode(true)
                      setShowAddressModal(true)
                    }}
                    className='flex items-center mr-1 gap-2 text-pink-500 font-semibold hover:underline'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedAddress(item)
                      setShowDeleteModal(true)
                    }}
                    className='flex items-center gap-2 text-red-500 font-semibold hover:underline'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          {showAddressModal && (
            <AddEditAddressModal
              isEdit={editMode}
              address={selectedAddress}
              isOpen={true}
              onClose={() => setShowAddressModal(false)}
              onSave={refresh}
            />
          )}
          {showDeleteModal && (
            <DeleteModal
              isOpen={true}
              onClose={() => setShowDeleteModal(false)}
              onDelete={deleteAddress}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AddressSection
