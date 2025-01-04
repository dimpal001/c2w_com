'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUserContext } from '@/app/context/UserContext'
import Loading from '../components/Loading'
import { useRouter } from 'next/navigation'
import Layout from '../components/Layout'
import Input from '../products/components/Input'

const page = () => {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useUserContext()

  const router = useRouter()

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/products/get/creator?id=${user.id}`
      )

      if (response.status === 200) {
        setProducts(response.data.products)
        setFilteredProducts(response.data.products)
      }
    } catch {
      // Handle any errors here
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user])

  // Handle search query change
  const handleSearch = (e) => {
    const query = e.target.value
    setQuery(query)

    // Filter products based on title (case-insensitive search)
    if (query) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }

  return (
    <div>
      <Layout>
        {loading ? (
          <Loading />
        ) : (
          <div className='p-6 bg-gray-100 min-h-screen'>
            <div className='flex items-center justify-between mb-5'>
              <h2 className='text-xl font-semibold text-blue-800'>
                Product List Uploaded by {user?.firstName}{' '}
                {user?.lastName || ''}
              </h2>
            </div>

            <div className='flex my-2 flex-wrap items-end gap-2'>
              <Input
                placeholder={'Search by title'}
                value={query}
                onChange={handleSearch}
              />
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full border-collapse shadow-lg'>
                <thead>
                  <tr className='bg-blue-800 text-white'>
                    <th className='p-2 border border-gray-300'>SL</th>
                    <th className='p-2 border border-gray-300'>Title</th>
                    <th className='p-2 border border-gray-300'>Uploaded On</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
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
                        <td className='p-2 border capitalize border-gray-300'>
                          {new Date(product.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
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
            </div>
          </div>
        )}
      </Layout>
    </div>
  )
}

export default page
