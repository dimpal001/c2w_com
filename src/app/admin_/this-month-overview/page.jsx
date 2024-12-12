'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Loading from '../components/Loading'
import Button from '../components/Button'
import { useRouter } from 'next/navigation'
import { CornerRightUp, IndianRupee, ShoppingCart, Users } from 'lucide-react'

const ThisMonthOverview = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const router = useRouter()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  useEffect(() => {
    fetchData()
  }, [selectedMonth, selectedYear])

  useEffect(() => {
    document.title = 'Sales Overview | Clothes2Wear'
  }, [])

  const handleMonthChange = (e) => setSelectedMonth(Number(e.target.value))
  const handleYearChange = (e) => setSelectedYear(Number(e.target.value))

  const fetchData = async () => {
    try {
      setLoading(true)
      const params = {
        month: selectedMonth,
        year: selectedYear,
      }
      const response = await axios.get(
        `/api/dashboard-data/data-by-month/orders`,
        {
          params,
        }
      )
      setData(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className='p-6 bg-gray-50 min-h-[530px]'>
          {/* Header */}
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-xl font-semibold text-blue-800'>
              Sales Overview - {months[selectedMonth - 1]} {selectedYear}
            </h2>
            <div className='flex items-center gap-2'>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className='border rounded-sm bg-blue-800 text-white focus:outline-none px-3 py-2'
              >
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className='border rounded-sm bg-blue-800 text-white focus:outline-none px-3 py-2'
              >
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* KPIs */}
          <div className='grid grid-cols-3 text-blue-800 gap-7 mb-6'>
            <div className='bg-blue-50 p-6 rounded-xl shadow-md text-blue-800 flex items-center space-x-4'>
              <ShoppingCart size={32} />
              <div>
                <p className='text-sm flex gap-3 items-center'>
                  Total Orders <CornerRightUp />
                </p>
                <p className='text-xl font-bold'>{data?.totalOrders}</p>
              </div>
            </div>
            <div className='bg-blue-50 p-6 rounded-xl shadow-md text-blue-800 flex items-center space-x-4'>
              <IndianRupee size={32} />
              <div>
                <p className='text-sm flex gap-3 items-center'>
                  Revenue <CornerRightUp />
                </p>
                <p className='text-xl font-bold'>
                  ₹{data?.totalIncome.toFixed(2)}
                </p>
              </div>
            </div>
            <div className='bg-blue-50 p-6 rounded-xl shadow-md text-blue-800 flex items-center space-x-4'>
              <Users size={32} />
              <div>
                <p className='text-sm flex gap-3 items-center'>
                  Users <CornerRightUp />
                </p>
                <p className='text-xl font-bold'>{data?.newUsers}</p>
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <div className='bg-white shadow rounded-lg p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-800'>Orders</h3>
            </div>
            <table className='w-full border-collapse border border-gray-200'>
              <thead>
                <tr className='bg-blue-800 text-white'>
                  <th className='border border-gray-200 px-4 py-2'>
                    Order Date
                  </th>
                  <th className='border border-gray-200 px-4 py-2'>Order ID</th>
                  <th className='border border-gray-200 px-4 py-2'>Status</th>
                  <th className='border border-gray-200 px-4 py-2'>Amount</th>
                  <th className='border border-gray-200 px-4 py-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.orders.length > 0 &&
                  data.orders.map((item, index) => (
                    <tr key={index}>
                      <td className='border border-gray-200 px-4 py-2'>
                        {new Date(item.createdAt).toDateString()}
                      </td>
                      <td className='border border-gray-200 px-4 py-2'>
                        {item.orderId}
                      </td>
                      <td className='border border-gray-200 px-4 py-2'>
                        <p
                          className={`
                            ${item.status === 'PENDING' && 'text-yellow-600'} 
                            ${item.status === 'INCOMPLETE' && 'text-red-600'} 
                            ${item.status === 'CANCELLED' && 'text-red-600'} 
                            ${item.status === 'DELIVERED' && 'text-green-600'} 
                            ${item.status === 'SHIPPED' && 'text-yellow-600'} 
                            `}
                        >
                          {item.status}
                        </p>
                      </td>
                      <td className='border border-gray-200 px-4 py-2'>
                        ₹{item.totalPrice.toFixed(2)}
                      </td>
                      <td className='border border-gray-200 px-4 py-2'>
                        <p className='flex justify-center'>
                          <Button
                            onClick={() =>
                              router.push(
                                `/admin_/orders/single-order/${item.orderId}`
                              )
                            }
                            label={'Details'}
                            variant='warning'
                          />
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ThisMonthOverview
