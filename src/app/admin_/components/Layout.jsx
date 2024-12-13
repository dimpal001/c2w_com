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

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUserContext()

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
  }, [router])

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
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

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
    </div>
  )
}

export default Layout
