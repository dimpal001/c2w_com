/* eslint-disable react/prop-types */
import React from 'react'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/app/context/UserContext'

const LogoutModal = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { setUser } = useUserContext()

  const handleRelogin = () => {
    // Clear user data
    setUser(null)
    localStorage.clear()
    document.cookie =
      'sessionExpiredTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    // Navigate to login page
    router.push('/admin_/login')
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50'>
      <div
        className='bg-white rounded-lg shadow-lg p-6 w-full max-w-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center border-b pb-3'>
          <h2 className='text-2xl font-semibold text-red-500'>
            Session Expired!
          </h2>
        </div>

        <div className='py-4'>
          <p className='text-gray-600 text-base'>
            Your session has expired. Please log in again to continue using the
            platform.
          </p>
        </div>

        <div className='flex justify-end gap-4 pt-4'>
          <button
            className='px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600'
            onClick={handleRelogin}
          >
            Relogin
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
