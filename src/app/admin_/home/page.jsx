'use client'

import React, { useEffect, useState } from 'react'
import { Key, User, LogOut } from 'lucide-react'
import Layout from '../components/Layout'
import { useUserContext } from '@/app/context/UserContext'
import axios from 'axios'
import UpdateProfileModal from './UpdateProfileModal'
import ChangePasswordModal from './ChangePasswordModal'
import { enqueueSnackbar } from 'notistack'
import Notification from '../dashboard/Notification'

export default function page() {
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const { user } = useUserContext()

  const [privileges, setPrivileges] = useState([])

  const fetchPrivileges = async () => {
    try {
      const response = await axios.get('/api/privileges')
      setPrivileges(response.data.privileges)
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to handle task!'
      )
    }
  }

  useEffect(() => {
    fetchPrivileges()
    window.document.title = 'Manage Staff | Clothes2Wear'
  }, [])

  return (
    <div>
      <Layout hideSidebar={user?.role === 'STAFF' && true}>
        <div className='min-h-screen bg-gray-100 p-8'>
          <div className='mb-5'>
            <Notification />
          </div>
          <div className='max-w-7xl mx-auto'>
            {/* Header */}
            <div className='mb-6'>
              <h1 className='text-3xl font-semibold text-gray-800'>
                Welcome back, {user?.firstName}
              </h1>
              <p className='text-lg text-gray-600'>
                Here is your dashboard overview
              </p>
            </div>

            {/* User Dashboard - Personal Settings */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
              {/* Update Profile */}
              <div className='bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-teal-50'>
                <div className='text-teal-600'>
                  <User size={36} />
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-700'>
                    Update Profile
                  </h3>
                  <p className='text-gray-500'>
                    Edit your personal information like name and phone number.
                  </p>
                  <p
                    onClick={() => setShowProfileModal(true)}
                    className='text-teal-500 hover:underline mt-2 block cursor-pointer'
                  >
                    Go to Profile
                  </p>
                </div>
              </div>

              {/* Change Password */}
              <div className='bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-yellow-50'>
                <div className='text-yellow-500'>
                  <Key size={36} />
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-700'>
                    Change Password
                  </h3>
                  <p className='text-gray-500'>
                    Update your account password for better security.
                  </p>
                  <p
                    onClick={() => setShowPasswordModal(true)}
                    className='text-yellow-500 cursor-pointer hover:underline mt-2 block'
                  >
                    Change Password
                  </p>
                </div>
              </div>

              {/* Logout */}
              <div className='bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-red-50'>
                <div className='text-red-600'>
                  <LogOut size={36} />
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-700'>
                    Logout
                  </h3>
                  <p className='text-gray-500'>
                    Log out from your account to end your session securely.
                  </p>
                  <p
                    href='/logout'
                    className='text-red-500 hover:underline mt-2 block'
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>

            {/* Privileges Section */}
            <div className='bg-white p-8 rounded-lg shadow-lg mb-8'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                Your Privileges
              </h2>
              <p className='text-lg text-gray-600'>
                You have the following privileges assigned by the admin:
              </p>
              <ul className='mt-4 space-y-2'>
                {privileges.length > 0 &&
                  privileges.map((item, index) => (
                    <li key={index} className='flex items-center space-x-3'>
                      {/* Check if user has the privilege */}
                      {user?.privileges?.some(
                        (privilege) => privilege.privilege.name === item.name
                      ) ? (
                        <span className='w-3 h-3 rounded-full bg-green-500'></span>
                      ) : (
                        <span className='w-3 h-3 rounded-full bg-gray-500'></span>
                      )}
                      <span className='text-gray-700 capitalize'>
                        {item.name.replace('-', ' ')}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Helpful Tips Section */}
            <div className='bg-white p-8 rounded-lg shadow-lg'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                Need Help?
              </h2>
              <p className='text-lg text-gray-600'>
                Here are some tips to help you get started:
              </p>
              <ul className='mt-4 space-y-2'>
                <li className='flex items-center space-x-3'>
                  <span className='w-2.5 h-2.5 rounded-full bg-blue-500'></span>
                  <span className='text-gray-700'>
                    Review your dashboard frequently to stay up-to-date.
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <span className='w-2.5 h-2.5 rounded-full bg-blue-500'></span>
                  <span className='text-gray-700'>
                    Access product listings to add new items to the store.
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <span className='w-2.5 h-2.5 rounded-full bg-blue-500'></span>
                  <span className='text-gray-700'>
                    Monitor order status and ensure timely delivery.
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <span className='w-2.5 h-2.5 rounded-full bg-blue-500'></span>
                  <span className='text-gray-700'>
                    If you need assistance, contact the system admin.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {showProfileModal && (
            <UpdateProfileModal
              isOpen={true}
              onClose={() => setShowProfileModal(false)}
            />
          )}
          {showPasswordModal && (
            <ChangePasswordModal
              isOpen={true}
              onClose={() => setShowPasswordModal(false)}
            />
          )}
        </div>
      </Layout>
    </div>
  )
}
