'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import Input from '../../products/components/Input'
import { Calendar } from '@nextui-org/calendar'
import { parseDate } from '@internationalized/date'
import Button from '../../components/Button'

const page = () => {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedDate, setSelectedDate] = useState(null)

  let id
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      const searchParams = new URLSearchParams(window.location.search)
      id = searchParams.get('id') || ''
      setFirstName(searchParams.get('firstName'))
      setLastName(searchParams.get('lastName'))
    }
  }, [])

  const router = useRouter()

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/products/get/creator?id=${id}`)

      if (response.status === 200) {
        const sortedProducts = response.data.products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setProducts(sortedProducts)
        setFilteredProducts(sortedProducts)
      }
    } catch {
      // Handle any errors here
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    document.title = 'My Uploads'
  }, [])

  // Filter products based on search query
  const handleSearch = (e) => {
    const query = e.target.value
    setQuery(query)

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(
      selectedDate
        ? filtered.filter(
            (product) =>
              new Date(product.createdAt).toDateString() ===
              selectedDate.toDateString()
          )
        : filtered
    )
  }

  // Filter products based on selected date
  const handleDateChange = (date) => {
    const newDate = new Date(date)
    setSelectedDate(newDate)
    const filtered = products.filter(
      (product) =>
        new Date(product.createdAt).toDateString() === newDate.toDateString()
    )
    setFilteredProducts(filtered)
  }

  // Clear the date filter
  const clearDateFilter = () => {
    setSelectedDate(null)
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(filtered)
  }

  // Group products by date
  const groupProductsByDate = (products) => {
    const grouped = {}
    products.forEach((product) => {
      const date = new Date(product.createdAt).toLocaleDateString()
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(product)
    })
    return grouped
  }

  const groupedProducts = groupProductsByDate(filteredProducts)

  return (
    <div className='relative top-0 overflow-scroll scrollbar-hide'>
      <Layout>
        {loading ? (
          <Loading />
        ) : (
          <div className='p-6 bg-gray-200 min-h-screen'>
            <div className='flex items-center justify-between mb-5'>
              <h2 className='text-xl font-semibold text-blue-800'>
                Product List Uploaded by {firstName || ''} {lastName || ''}
              </h2>
            </div>

            <div className='flex py-2 items-center gap-2'>
              <Input
                placeholder={'Search by title'}
                value={query}
                onChange={handleSearch}
              />
              <Button label={'Show All'} onClick={clearDateFilter} />
              {selectedDate && (
                <div>{new Date(selectedDate).toLocaleDateString()}</div>
              )}
            </div>

            <div className='overflow-x-auto flex gap-3 items-start'>
              <table className='w-full border-collapse shadow-lg'>
                <thead>
                  <tr className='bg-blue-800 text-white'>
                    <th className='p-2 border border-gray-300'>SL</th>
                    <th className='p-2 border border-gray-300'>Title</th>
                    <th className='p-2 border border-gray-300'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(groupedProducts).length > 0 ? (
                    Object.keys(groupedProducts).map((date, dateIndex) => (
                      <React.Fragment key={dateIndex}>
                        <tr className='bg-blue-200'>
                          <td
                            colSpan='3'
                            className='p-2 border text-center border-gray-300 font-bold'
                          >
                            {date}
                            <span className='pl-4 text-green-500 text-xl'>
                              [{groupedProducts[date]?.length}]
                            </span>
                          </td>
                        </tr>
                        {groupedProducts[date].map((product, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                            }`}
                          >
                            <td className='p-2 border text-center border-gray-300'>
                              {index + 1}
                            </td>
                            <td className='p-2 border capitalize border-gray-300'>
                              <span
                                onClick={() =>
                                  router.push(
                                    `/admin_/products/single-product/${product?.id}`
                                  )
                                }
                                className='hover:text-blue-800 hover:underline cursor-pointer'
                              >
                                {product.title}
                              </span>
                            </td>
                            <td className='p-3 border text-center capitalize border-gray-300'>
                              {product?.isActive ? (
                                <span className='py-[5px] px-4 rounded-full bg-green-500 text-green-500 bg-opacity-20 text-xs'>
                                  Active
                                </span>
                              ) : (
                                <span className='py-[5px] px-4 rounded-full bg-red-500 text-red-500 bg-opacity-20 text-xs'>
                                  Inactive{' '}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='3' className='text-center p-2'>
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className='text-black'>
                <Calendar
                  aria-label='Date (Uncontrolled)'
                  value={
                    selectedDate
                      ? parseDate(selectedDate.toISOString().split('T')[0])
                      : null
                  }
                  onChange={(date) => handleDateChange(date.toString())}
                  className='bg-slate-900'
                />
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  )
}

export default page
