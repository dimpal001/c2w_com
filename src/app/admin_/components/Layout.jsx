'use client'

import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { LayoutGrid } from 'lucide-react'
import Button from './Button'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import Loading from './Loading'
import authCheck from '@/utils/authCheck'
import { useUserContext } from '@/app/context/UserContext'
import { Modal, ModalBody, ModalHeader } from '@/app/Components/CustomModal'

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUserContext()

  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authCheck(router)
      setIsAuthenticated(isAuth)
    }
    checkAuth()

    if (user && user.role === 'STAFF') {
      const allowedPrivileges = (user.privileges || []).map(
        (priv) => priv.privilege.name
      )

      const currentPrivilege = pathname.split('/')[2]

      if (currentPrivilege === 'home') {
        router.push('/admin_/home')
      } else {
        if (!allowedPrivileges.includes(currentPrivilege)) {
          enqueueSnackbar('Access Denied: Insufficient privileges.', {
            variant: 'error',
          })
          router.push('/admin_/home')
        }
      }
    }

    setIsClient(true)
  }, [router, user, pathname])

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        '/api/admin/logout',
        {},
        {
          withCredentials: true,
        }
      )

      if (response.status === 200) {
        router.push('/admin_/login')
        enqueueSnackbar('Logout Successfull')
        localStorage.removeItem('showWarning')
      }
    } catch {
      enqueueSnackbar('Something went wrong, try again!')
    }
  }

  useEffect(() => {
    const storedData = localStorage.getItem('showWarning')

    if (!storedData) {
      setShowWarning(true)
      localStorage.setItem('showWarning', 'true')
    }
  }, [])

  return (
    <div className='flex bg-white flex-col text-sm min-h-screen'>
      {isClient && (
        <div className='flex fixed inset-[7px] flex-1 gap-2'>
          <Sidebar isExpanded={isExpanded} />
          <main className='w-full overflow-scroll scrollbar-hide'>
            {isAuthenticated === null || !isAuthenticated ? (
              <div className='w-full h-full flex items-center justify-center'>
                <Loading />
              </div>
            ) : (
              <div className='flex-1'>
                <header className='p-[16px] bg-slate-900 text-white rounded-sm shadow-md flex justify-between items-center'>
                  <div className='flex items-center'>
                    <button onClick={toggleSidebar} className='mr-3'>
                      <LayoutGrid size={20} />
                    </button>
                    <h1 className='font-semibold'>
                      {user?.role === 'ADMIN'
                        ? 'Admin Panel'
                        : 'Staff Work Area'}
                    </h1>
                  </div>
                  <div>
                    <Button
                      onClick={handleLogout}
                      label={'Logout'}
                      variant='error'
                    />
                  </div>
                </header>
                <div className='pt-3 h-full overflow-y-scroll pb-16 no-scrollbar'>
                  {children}
                </div>
              </div>
            )}
          </main>
        </div>
      )}
      {showWarning && (
        <Modal size={'xl'} isOpen={true}>
          <ModalHeader>
            <span className='text-blue-800'>Welcome!</span>
          </ModalHeader>
          <ModalBody className='p-6 bg-gray-50 rounded-lg shadow-md'>
            <p className='text-lg font-semibold text-gray-800 mb-4'>
              Welcome to the platform! We&apos;re glad to have you here. Please
              take a moment to read the following notice.
            </p>
            <div className='p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md mb-6'>
              <strong className='block font-bold'>Warning:</strong>
              <span className='text-sm'>
                To avoid being logged out of your current session, please
                refrain from navigating to the main website in the same browser
                session. Use a separate browser or an incognito/private window
                if you need to access the main website.
              </span>
            </div>
            <button
              className='w-full py-3 px-4 bg-blue-800 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              onClick={() => setShowWarning(false)}
            >
              Got it
            </button>
          </ModalBody>
        </Modal>
      )}
    </div>
  )
}

export default Layout
