'use client'

import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import UserListPage from './UserListPage'

const page = () => {
  useEffect(() => {
    document.title = 'User List | Clothes2Wear'
  }, [])
  return (
    <Layout>
      <UserListPage />
    </Layout>
  )
}

export default page
