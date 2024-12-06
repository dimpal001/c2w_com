/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Modal, ModalBody } from './CustomModal'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../context/UserContext'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

const LogoutModal = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { user, setUser } = useUserContext()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    try {
      console.log('first')
      setLoading(true)
      const response = await axios.post(`/api/auth/logout?email=${user.email}`)
      enqueueSnackbar(response.data.message, { variant: 'success' })
      setUser(null)
      localStorage.removeItem('user')
      router.push('/')
    } catch {
      setUser(null)
      //   localStorage.removeItem('user')
      //   router.push('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalBody>
        <div>
          <div className='flex justify-center flex-col items-center p-5'>
            <img
              src='/logout.gif'
              className='w-[70px] mb-4'
              alt='Order Placed'
            />
            <p className='text-2xl font-bold'>Confirm Logout</p>
          </div>
          <div className='flex items-center justify-center gap-5'>
            <button
              onClick={onClose}
              className='bg-gray-500 font-semibold text-white px-4 py-2 rounded'
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleLogout}
              className={`bg-red-600 ${
                loading && 'opacity-70'
              } font-semibold text-white px-4 py-2 flex items-center gap-2 rounded`}
            >
              {loading && <Loader2 size={18} className='animate-spin' />} Logout
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default LogoutModal
