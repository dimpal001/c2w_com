'use client'

import { useEffect } from 'react'
import { useUserContext } from './UserContext'
import { useRouter, usePathname } from 'next/navigation'

const RouteGuard = ({ children }) => {
  const { user, logout } = useUserContext()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (user?.role === 'ADMIN' && !pathname.startsWith('/admin_')) {
      logout()
      router.push('/')
    }
  }, [user, pathname, logout, router])

  return children
}

export default RouteGuard
