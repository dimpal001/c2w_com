/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import { useUserContext } from '@/app/context/UserContext'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'

const AddEditAddressModal = ({ isOpen, onClose, isEdit, address, onSave }) => {
  const [saving, setSaving] = useState(false)
  // Initialize state for the form fields
  const [formData, setFormData] = useState({
    fullName: address?.fullName || '',
    addressLine1: address?.addressLine1 || '',
    addressLine2: address?.addressLine2 || '',
    city: address?.city || '',
    state: address?.state || '',
    zipCode: address?.zipCode || '',
    country: address?.country || 'India',
    mobileNumber: address?.mobileNumber || '',
    altMobileNumber: address?.altMobileNumber || '',
  })

  const { user } = useUserContext()

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validate = () => {
    if (!formData.fullName || formData.fullName.trim() === '') {
      enqueueSnackbar('Enter a valid name', { variant: 'error' })
      return false
    }
    if (formData.fullName.length > 30) {
      enqueueSnackbar('Name is too long (maximum 50 characters)', {
        variant: 'error',
      })
      return false
    }
    if (!formData.addressLine1 || formData.addressLine1.trim() === '') {
      enqueueSnackbar('Enter a valid address line 1', { variant: 'error' })
      return false
    }
    if (formData.addressLine1.length > 100) {
      enqueueSnackbar('Address line 1 is too long (maximum 100 characters)', {
        variant: 'error',
      })
      return false
    }
    if (formData.addressLine2 && formData.addressLine2.length > 100) {
      enqueueSnackbar('Address line 2 is too long (maximum 100 characters)', {
        variant: 'error',
      })
      return false
    }
    if (!formData.city || formData.city.trim() === '') {
      enqueueSnackbar('Enter a valid city name', { variant: 'error' })
      return false
    }
    if (formData.city.length > 50) {
      enqueueSnackbar('City name is too long (maximum 50 characters)', {
        variant: 'error',
      })
      return false
    }
    if (!formData.state || formData.state.trim() === '') {
      enqueueSnackbar('Enter a valid state name', { variant: 'error' })
      return false
    }
    if (formData.state.length > 50) {
      enqueueSnackbar('State name is too long (maximum 50 characters)', {
        variant: 'error',
      })
      return false
    }
    if (!formData.zipCode || !/^\d{5,6}$/.test(formData.zipCode)) {
      enqueueSnackbar('Enter a valid ZIP Code (5-6 digits)', {
        variant: 'error',
      })
      return false
    }
    if (!formData.country || formData.country.trim() === '') {
      enqueueSnackbar('Enter a valid country name', { variant: 'error' })
      return false
    }
    if (formData.country.length > 50) {
      enqueueSnackbar('Country name is too long (maximum 50 characters)', {
        variant: 'error',
      })
      return false
    }
    if (!formData.mobileNumber || !/^\d{10}$/.test(formData.mobileNumber)) {
      enqueueSnackbar('Enter a valid mobile number (10 digits)', {
        variant: 'error',
      })
      return false
    }
    return true
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    if (isEdit) {
      try {
        setSaving(true)
        const response = await axios.patch('/api/users/address/update', {
          userId: user?.id,
          fullName: formData?.fullName,
          addressId: address?.id,
          addressLine1: formData?.addressLine1,
          addressLine2: formData?.addressLine2,
          city: formData?.city,
          state: formData?.state,
          zipCode: formData?.zipCode,
          country: formData?.country,
          mobileNumber: formData?.mobileNumber,
        })
        enqueueSnackbar(response.data.message, { variant: 'success' })
        onClose()
        onSave()
      } catch (error) {
        console.log(error)
        enqueueSnackbar(error?.response?.data?.message || 'An error occurred', {
          variant: 'error',
        })
      } finally {
        setSaving(false)
      }
    } else {
      try {
        setSaving(true)
        const response = await axios.post('/api/users/address/add', {
          userId: user.id,
          fullName: formData.fullName,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          mobileNumber: formData.mobileNumber,
        })
        enqueueSnackbar(response?.data?.message, { variant: 'success' })
        onClose()
        onSave()
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
      } finally {
        setSaving(false)
      }
    }
  }

  return (
    <Modal size={'xl'} isOpen={isOpen}>
      <ModalHeader>
        <h2>{isEdit ? 'Edit Address' : 'Add Address'}</h2>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <form
          onSubmit={handleSubmit}
          className='max-sm:space-y-4 md:grid grid-cols-2 md:gap-5'
        >
          <div>
            <label className='block text-sm font-medium'>
              Full Name <span className='text-red-600'>*</span>
            </label>
            <input
              type='text'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              className='w-full border rounded p-2'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>
              Address Line 1 <span className='text-red-600'>*</span>{' '}
            </label>
            <input
              type='text'
              name='addressLine1'
              value={formData.addressLine1}
              onChange={handleChange}
              className='w-full border rounded p-2'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>Address Line 2</label>
            <input
              type='text'
              name='addressLine2'
              value={formData.addressLine2}
              onChange={handleChange}
              className='w-full border rounded p-2'
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>
              City <span className='text-red-600'>*</span>
            </label>
            <input
              type='text'
              name='city'
              value={formData.city}
              onChange={handleChange}
              className='w-full border rounded p-2'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>
              State <span className='text-red-600'>*</span>
            </label>
            <input
              type='text'
              name='state'
              value={formData.state}
              onChange={handleChange}
              className='w-full border rounded p-2'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>
              ZIP Code <span className='text-red-600'>*</span>
            </label>
            <input
              type='text'
              name='zipCode'
              value={formData.zipCode}
              onChange={handleChange}
              className='w-full border rounded p-2'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>
              Mobile Number <span className='text-red-600'>*</span>
            </label>
            <input
              type='text'
              name='mobileNumber'
              value={formData.mobileNumber}
              onChange={handleChange}
              className='w-full border rounded p-2'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>
              Alternate Mobile Number
            </label>
            <input
              type='text'
              name='altMobileNumber'
              value={formData.altMobileNumber}
              onChange={handleChange}
              className='w-full border rounded p-2'
              required
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={onClose}
          className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
        >
          Cancel
        </button>
        <button
          disabled={saving}
          onClick={handleSubmit}
          className={`bg-blue-500 ${
            saving && 'opacity-70'
          } text-white px-4 py-2 rounded`}
        >
          {saving ? 'Saving..' : isEdit ? 'Update Address' : 'Add Address'}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default AddEditAddressModal
