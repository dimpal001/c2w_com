/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@/app/Components/CustomModal'
import Input from '../products/components/Input'
import Button from '../components/Button'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'

const ResetPasswordModal = ({ isOpen, onClose, close }) => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [reseting, setReseting] = useState(false)

  const handleEmailSubmit = async () => {
    try {
      setSending(true)
      const response = await axios.post('/api/staff/reset-password', {
        email,
      })

      if (response.status === 200) {
        setStep(2)
        setOtpSent(true)
        enqueueSnackbar(response.data.message, { variant: 'success' })
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSending(false)
    }
  }

  const handleFormSubmit = async () => {
    try {
      setReseting(true)
      const response = await axios.post(
        '/api/staff/reset-password/change-password',
        {
          email,
          otp,
          password: newPassword,
        }
      )

      enqueueSnackbar(response.data.message, { variant: 'success' })
      onClose()
      close()
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setReseting(false)
    }
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        Reset Password
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        {step === 1 && (
          <div className='flex flex-col gap-2'>
            <h3>Enter your email</h3>
            <Input
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              loading={sending}
              loadingText={'Sending..'}
              label={'Request OTP'}
              onClick={handleEmailSubmit}
              disabled={!email}
            />
          </div>
        )}

        {step === 2 && otpSent && (
          <div className='flex flex-col gap-2'>
            <h3>Enter OTP and New Password</h3>
            <Input
              type='text'
              placeholder='OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Input
              type='password'
              placeholder='New Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              loading={reseting}
              loadingText={'Reseting..'}
              label={'Reset Password'}
              onClick={handleFormSubmit}
              disabled={!otp || !newPassword}
            />
          </div>
        )}
      </ModalBody>
    </Modal>
  )
}

export default ResetPasswordModal
