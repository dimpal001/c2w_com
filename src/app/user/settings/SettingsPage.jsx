'use client'

import React, { useEffect, useState } from 'react'
import { Image as ImageIcon, Info, UserRoundCog } from 'lucide-react'
import axios from 'axios'
import { useUserContext } from '@/app/context/UserContext'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import Loading from '@/app/Components/Loading'

const SettingsPage = () => {
  const [fetching, setFetching] = useState(true)
  const [userDetails, setUserDetails] = useState(null)
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    whatsAppNumber: '',
    profileImage: null,
  })

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formError, setFormError] = useState('')
  const [infoUpdating, setInfoUpdating] = useState(false)
  const [passwordUpdating, setPasswordUpdating] = useState(false)

  const { user, setUser } = useUserContext()
  const router = useRouter()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUserData((prevState) => ({
        ...prevState,
        profileImage: URL.createObjectURL(file),
      }))
    }
  }

  const fetchUserDetails = async () => {
    try {
      setFetching(true)
      const response = await axios.get('/api/users/get/my-account')
      setUserDetails(response.data)
      const data = response.data
      setUserData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        mobileNumber: data.mobileNumber || '',
        whatsAppNumber: data.whatsAppNumber || '',
        profileImage: data.profileImage || null,
      })
      setFetching(false)
    } catch (error) {
      console.error(error)
      if (error.response?.status === 401) {
        setUser(null)
        localStorage.removeItem('user')
        router.push('/auth/signin')
      } else {
        router.push('/')
      }
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  const handleUserDataSubmit = async (e) => {
    e.preventDefault()

    try {
      setInfoUpdating(true)
      const response = await axios.patch('/api/users/update/profile-data', {
        id: user.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobileNumber: userData.mobileNumber,
        whatsAppNumber: userData.whatsAppNumber,
      })

      setUserDetails(response.data.user)

      const data = response.data.user
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNumber: data.mobileNumber,
        whatsAppNumber: data.whatsAppNumber,
      })

      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setInfoUpdating(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    try {
      setFormError('')
      setPasswordUpdating(true)
      const response = await axios.patch('/api/users/update/password', {
        id: user.id,
        currentPassword,
        password: confirmPassword,
      })

      enqueueSnackbar(response.data.message)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      setFormError(error?.response?.data?.message)
    } finally {
      setPasswordUpdating(false)
    }
  }

  if (fetching) {
    return <Loading />
  }

  return (
    <div className='max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg'>
      <div className='flex justify-between items-center mb-8'>
        <div className='flex items-center gap-4'>
          <UserRoundCog className='w-10 h-10 text-pink-600' />
          <h2 className='text-4xl max-sm:text-3xl font-semibold'>Settings</h2>
        </div>
      </div>

      {/* Profile Section */}
      <div className='flex items-center space-x-6 mb-8'>
        <div className='relative'>
          <img
            src={
              userData.profileImage ||
              'https://cdn.thefashionsalad.com/profile-pictures/default-image.jpg'
            }
            alt='Profile Picture'
            className='w-28 h-28 rounded-full object-cover border-r-pink-500 border-t-pink-500 border-b-blue-500 border-l-blue-500 border-4'
          />
          <label
            htmlFor='profileImage'
            className='absolute bottom-0 right-0 bg-pink-500 text-white rounded-full p-2 cursor-pointer'
          >
            <ImageIcon size={20} />
          </label>
          <input
            disabled
            type='file'
            id='profileImage'
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
          />
        </div>
        <div>
          <h3 className='text-xl font-medium text-gray-800'>
            {userDetails?.firstName} {userDetails?.lastName}
          </h3>
          <p className='text-gray-600'>{userDetails?.email}</p>
        </div>
      </div>

      {/* User Info Form */}
      <form onSubmit={handleUserDataSubmit} className='space-y-6 mb-8'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          Update Your Information
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* First Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              First Name
            </label>
            <input
              type='text'
              value={userData.firstName}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  firstName: e.target.value,
                }))
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
              placeholder='Your name'
            />
          </div>

          {/* Last Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Last Name
            </label>
            <input
              type='text'
              value={userData.lastName}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  lastName: e.target.value,
                }))
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
              placeholder='Last name'
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Email
          </label>
          <input
            disabled
            type='email'
            value={userData.email}
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            placeholder='example@example.com'
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Mobile Number
          </label>
          <input
            type='text'
            value={userData.mobileNumber}
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                mobileNumber: e.target.value,
              }))
            }
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            placeholder='+91 1234567890'
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            WhatsApp Number
          </label>
          <input
            type='text'
            value={userData.whatsAppNumber}
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                whatsAppNumber: e.target.value,
              }))
            }
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            placeholder='+91 1234567890'
          />
        </div>

        {/* Save Changes Button */}
        <div className='flex items-center justify-between'>
          <button
            disabled={infoUpdating}
            type='submit'
            className='w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            {infoUpdating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Password Update Form */}
      <form onSubmit={handlePasswordSubmit} className='space-y-6'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          Change Password
        </h3>

        {/* Current Password */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Current Password
          </label>
          <input
            type='password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            placeholder='********'
          />
        </div>

        {/* New Password */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            New Password
          </label>
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            placeholder='New password'
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Confirm New Password
          </label>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            placeholder='Confirm new password'
          />
        </div>

        {/* Error Message */}
        {formError && (
          <div className='mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-xs'>
            <Info className='text-red-600 w-6 h-6' />
            {formError}
          </div>
        )}

        {/* Save Changes Button */}
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            disabled={passwordUpdating}
          >
            {passwordUpdating ? 'Saving...' : 'Save Password'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SettingsPage
