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

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const generatedOtp = '123456'

  const handleEmailSubmit = () => {
    setOtpSent(true)
    setStep(2)
  }

  const handleFormSubmit = () => {
    // Verify OTP
    if (otp === generatedOtp) {
      alert('Password has been successfully updated!')
      onClose()
    } else {
      alert('Invalid OTP. Please try again.')
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
