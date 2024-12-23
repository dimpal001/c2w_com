/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Button from '../components/Button'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { useUserContext } from '@/app/context/UserContext'
import ResetPasswordModal from './ResetPasswordModal'

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [showResetModal, setShowResetModal] = useState(false)

  const { user } = useUserContext()

  const toggleShowCurrentPassword = () =>
    setShowCurrentPassword((prev) => !prev)
  const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev)
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev)

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      enqueueSnackbar('New password and confirm password do not match!', {
        variant: 'error',
      })
      return
    }

    try {
      setSubmitting(true)
      const response = await axios.post('/api/staff/update-password', {
        id: user.id,
        currentPassword,
        newPassword,
      })
      enqueueSnackbar(response.data.message, { variant: 'success' })
      onClose()
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal size={'md'} isOpen={isOpen}>
      <ModalHeader>
        Change Password
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <div className='space-y-4'>
          {/* Current Password */}
          <div>
            <label className='block text-gray-700'>Current Password</label>
            <div className='relative'>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='w-full px-4 py-2 border rounded-sm'
                placeholder='Enter your current password'
              />
              <div
                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                onClick={toggleShowCurrentPassword}
              >
                {/* {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />} */}
              </div>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className='block text-gray-700'>New Password</label>
            <div className='relative'>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full px-4 py-2 border rounded-sm'
                placeholder='Enter your new password'
              />
              <div
                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                onClick={toggleShowNewPassword}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className='block text-gray-700'>Confirm Password</label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full px-4 py-2 border rounded-sm'
                placeholder='Confirm your new password'
              />
              <div
                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          {/* Password Reset Link */}
          <div className='text-sm text-blue-500'>
            <p
              onClick={() => setShowResetModal(true)}
              className='hover:underline cursor-pointer'
            >
              Forgot your password? Reset it here.
            </p>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button loading={submitting} label={'Submit'} onClick={handleSubmit} />
      </ModalFooter>

      {showResetModal && (
        <ResetPasswordModal
          isOpen={true}
          onClose={() => setShowResetModal(false)}
          close={() => onClose()}
        />
      )}
    </Modal>
  )
}

export default ChangePasswordModal
