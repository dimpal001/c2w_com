'use client'

import { SquarePen } from 'lucide-react'
import React, { useState, useRef } from 'react'

export default function SettingsPage() {
  const [firstName, setFirstName] = useState('John')
  const [lastName, setLastName] = useState('Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [mobileNumber, setMobileNumber] = useState('9876543210')
  const [whatsAppNumber, setWhatsAppNumber] = useState('9876543210')
  const [profileUrl, setProfileUrl] = useState('https://picsum.photos/542/574')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const fileInputRef = useRef(null)

  const handleProfilePicChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdate = () => {
    alert('Details Updated!')
  }

  const handleProfilePicClick = () => {
    fileInputRef.current?.click()
  }

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      alert('Password updated successfully!')
    } else {
      alert('Passwords do not match!')
    }
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        {/* Profile Picture Section */}
        <div className='flex justify-center mb-16 my-10'>
          <div className='relative w-32 h-32'>
            {profileUrl ? (
              <img
                src={profileUrl}
                alt='Profile'
                className='w-full h-full object-cover rounded-full border-4 border-gray-300'
              />
            ) : (
              <div className='w-full text-5xl text-gray-300 h-full flex justify-center items-center border-4 border-gray-300 rounded-full'>
                DP
              </div>
            )}
            <SquarePen
              className='absolute bottom-5 right-0 cursor-pointer'
              strokeWidth={2}
              size={30}
              onClick={handleProfilePicClick}
            />
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleProfilePicChange}
              className='hidden'
            />
          </div>
        </div>

        <div className='flex max-sm:flex-col flex-row gap-10'>
          {/* Form Fields */}
          <div className='space-y-4 lg:w-1/2'>
            <h3 className='text-xl font-semibold mb-4'>Update Your Profile</h3>
            <div>
              <label
                className='block text-gray-700 text-sm font-medium mb-2'
                htmlFor='firstName'
              >
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>

            <div>
              <label
                className='block text-gray-700 text-sm font-medium mb-2'
                htmlFor='lastName'
              >
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label
                className='block text-gray-700 text-sm font-medium mb-2'
                htmlFor='email'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>

            <div>
              <label
                className='block text-gray-700 text-sm font-medium mb-2'
                htmlFor='mobileNumber'
              >
                Mobile Number
              </label>
              <input
                type='tel'
                id='mobileNumber'
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>

            <div>
              <label
                className='block text-gray-700 text-sm font-medium mb-2'
                htmlFor='whatsAppNumber'
              >
                WhatsApp Number
              </label>
              <input
                type='tel'
                id='whatsAppNumber'
                value={whatsAppNumber}
                onChange={(e) => setWhatsAppNumber(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {/* Update Button */}
              <div className='mt-8'>
                <button
                  onClick={handleUpdate}
                  className='w-full py-3 bg-pink-600 text-white text-lg font-semibold rounded-lg hover:bg-pink-500 transition duration-300'
                >
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className='lg:w-1/2'>
            <h3 className='text-xl font-semibold mb-4'>Change Password</h3>
            <div className='space-y-4'>
              <div>
                <label
                  className='block text-gray-700 text-sm font-medium mb-2'
                  htmlFor='currentPassword'
                >
                  Current Password
                </label>
                <input
                  type='password'
                  id='currentPassword'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label
                  className='block text-gray-700 text-sm font-medium mb-2'
                  htmlFor='newPassword'
                >
                  New Password
                </label>
                <input
                  type='password'
                  id='newPassword'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label
                  className='block text-gray-700 text-sm font-medium mb-2'
                  htmlFor='confirmPassword'
                >
                  Confirm New Password
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
            </div>

            <button
              onClick={handlePasswordChange}
              className='w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-500 transition duration-300 mt-6'
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
