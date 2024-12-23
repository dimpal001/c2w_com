'use client'

import React, { useEffect, useState } from 'react'
import { ShoppingCart, Package, Users, IndianRupee } from 'lucide-react'
import Layout from '../components/Layout'
import authCheck from '@/utils/authCheck'
import { useRouter } from 'next/navigation'
import Loading from '../components/Loading'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'

const page = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [status, setStatus] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    document.title = 'Admin Dashboard | Clothes2Wear'
  }, [])

  const fetchOverallStatus = async () => {
    try {
      const response = await axios.get('/api/dashboard-data/overall-status', {
        withCredentials: true,
      })
      setStatus(response.data.status)
    } catch {
      enqueueSnackbar('Something went wrong, try again', { variant: 'error' })
    }
  }

  const fetchRecentOrders = async () => {
    try {
      const response = await axios.get('/api/dashboard-data/recent-orders', {
        withCredentials: true,
      })
      setRecentOrders(response.data)
    } catch {
      enqueueSnackbar('Something went wrong, try again', { variant: 'error' })
    }
  }

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const isAuth = await authCheck(router)
      setIsAuthenticated(isAuth)

      if (isAuth) {
        try {
          await Promise.all([fetchOverallStatus(), fetchRecentOrders()])
        } catch {
          enqueueSnackbar('Internal server error!')
        }
      }
    }

    checkAuthAndFetchData()
  }, [router])

  if (isAuthenticated === null || !isAuthenticated) {
    return <Loading />
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Layout>
        {/* Dashboard Main Section */}
        <div className='flex flex-1 p-6'>
          {/* Main Content Area */}
          <div className='flex-1'>
            {/* Top Stats Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6'>
              <div
                onClick={() => router.push('/admin_/orders/order-list')}
                className='bg-blue-50 group cursor-pointer p-6 rounded-xl shadow-md text-blue-800 flex items-center space-x-4'
              >
                <ShoppingCart size={32} />
                <div>
                  <p className='text-sm group-hover:underline'>Total Orders</p>
                  <p className='text-xl font-bold'>{status?.totalOrders}</p>
                </div>
              </div>
              <div
                onClick={() => router.push('/admin_/products/product-list')}
                className='bg-blue-50 p-6 group cursor-pointer rounded-xl shadow-md text-blue-800 flex items-center space-x-4'
              >
                <Package size={32} />
                <div>
                  <p className='text-sm group-hover:underline'>
                    Total Products
                  </p>
                  <p className='text-xl font-bold'>{status?.totalProducts}</p>
                </div>
              </div>
              <div className='bg-blue-50 p-6 rounded-xl shadow-md text-blue-800 flex items-center space-x-4'>
                <IndianRupee size={32} />
                <div>
                  <p className='text-sm'>Revenue</p>
                  <p className='text-xl font-bold'>
                    {status?.totalRevenue.toFixed(2)}
                  </p>
                </div>
              </div>
              <div
                onClick={() => router.push('/admin_/users/user-list')}
                className='bg-blue-50 p-6 group cursor-pointer rounded-xl shadow-md text-blue-800 flex items-center space-x-4'
              >
                <Users size={32} />
                <div>
                  <p className='text-sm group-hover:underline'>
                    Total Customers
                  </p>
                  <p className='text-xl font-bold'>{status?.totalCustomers}</p>
                </div>
              </div>
            </div>

            {/* Recent Orders Section */}
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h3 className='text-blue-800 text-lg font-semibold mb-4'>
                Recent Orders
              </h3>
              <table className='w-full table-auto'>
                <thead>
                  <tr>
                    <th className='text-left p-2 text-blue-800'>Order ID</th>
                    <th className='text-left p-2 text-blue-800'>Customer</th>
                    <th className='text-left p-2 text-blue-800'>Status</th>
                    <th className='text-left p-2 text-blue-800'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length > 0 &&
                    recentOrders.map((item, index) => (
                      <tr key={index}>
                        <td className='p-2'>
                          <span
                            onClick={() =>
                              router.push(
                                `/admin_/orders/single-order/${item.orderId}`
                              )
                            }
                            className='hover:text-blue-800 hover:underline cursor-pointer'
                          >
                            {item.orderId}
                          </span>
                        </td>
                        <td className='p-2'>
                          <span
                            onClick={() =>
                              router.push(
                                `/admin_/users/single-user/${item.userId}`
                              )
                            }
                            className='hover:text-blue-800 hover:underline cursor-pointer'
                          >
                            {item.customerName}
                          </span>
                        </td>
                        <td
                          className={`p-2 ${
                            item.status === 'INCOMPLETE'
                              ? 'text-red-500'
                              : item.status === 'DELIVERED'
                              ? 'text-green-500'
                              : 'text-yellow-500'
                          } text-green-500`}
                        >
                          {item.status}
                        </td>
                        <td className='p-2'>₹{item.totalPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Sales and Products Overview */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6'>
              <div
                onClick={() => router.push('/admin_/this-month-overview')}
                className='bg-blue-50 group cursor-pointer p-6 rounded-xl shadow-md text-blue-800'
              >
                <h4 className='text-blue-800 group-hover:underline text-lg font-semibold'>
                  Sales Overview
                </h4>
                <p className='text-xl font-bold'>This Month</p>
                <p className='text-sm text-gray-500'>
                  View your sales statistics and trends.
                </p>
              </div>
              <div className='bg-blue-50 p-6 rounded-xl shadow-md text-blue-800'>
                <h4 className='text-blue-800 text-lg font-semibold'>
                  Product Performance
                </h4>
                <p className='text-xl font-bold'>Top Seller</p>
                <p className='text-sm text-gray-500'>
                  View the best-selling products in your store.
                </p>
              </div>
              <div
                onClick={() => router.push('/admin_/this-month-reviews')}
                className='bg-blue-50 group cursor-pointer p-6 rounded-xl shadow-md text-blue-800'
              >
                <h4 className='text-blue-800 group-hover:underline text-lg font-semibold'>
                  Customer Feedback
                </h4>
                <p className='text-xl font-bold'>5-Star Reviews</p>
                <p className='text-sm text-gray-500'>
                  See how your customers are rating your products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default page
