/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
} from '@/app/Components/CustomModal'
import axios from 'axios'
import Button from '../components/Button'
import { useUserContext } from '@/app/context/UserContext'
import Input from '../products/components/Input'
import { enqueueSnackbar } from 'notistack'

const UpdateProfileModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useUserContext()
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || '')
  const [isLoading, setIsLoading] = useState(false)

  // Handle form submission
  const handleSubmit = async () => {
    if (!firstName || !lastName || !mobileNumber) {
      enqueueSnackbar('Please fill all the fields.', { variant: 'error' })
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.put('/api/staff/update-profile', {
        id: user.id,
        firstName,
        lastName,
        mobileNumber,
      })

      const updatedStaff = response.data.updatedStaff

      setUser(updatedStaff)
      localStorage.setItem('user', JSON.stringify(updatedStaff))
      enqueueSnackbar(response.data?.message, { variant: 'success' })
      onClose()
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Modal size={'md'} isOpen={isOpen}>
        <ModalHeader>
          {' '}
          Update Profile
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          {/* Profile update form */}
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-semibold'
              >
                First Name
              </label>
              <Input
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='mt-2'
              />
            </div>

            <div>
              <label htmlFor='lastName' className='block text-sm font-semibold'>
                Last Name
              </label>
              <Input
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='mt-2'
              />
            </div>

            <div>
              <label
                htmlFor='mobileNumber'
                className='block text-sm font-semibold'
              >
                Mobile Number
              </label>
              <Input
                id='mobileNumber'
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className='mt-2'
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleSubmit}
            label={'Save'}
            loading={isLoading}
            colorScheme='teal'
            width='full'
          />
        </ModalFooter>
      </Modal>
    </>
  )
}

export default UpdateProfileModal
