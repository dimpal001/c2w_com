'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Input, Select } from '../components/SimilarProruct'
import Loading from '../../components/Loading'
import { enqueueSnackbar } from 'notistack'
import Pagination from '../../components/Pagination'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import {
  AlertCircle,
  CheckCircle,
  Ellipsis,
  FilePen,
  FileText,
  Star,
  Trash2,
} from 'lucide-react'
import DeleteModal from '@/app/Components/DeleteModal'
import { deleteImageFromCDN } from '../../../../../utils/deleteImageFromCDN'
import ErrorComponent from '../../components/ErrorComponent'

const page = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [productList, setProductList] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [colors, setColors] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [color, setColor] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [fetching, setFetching] = useState(false)
  const [currentPage, setCurrentPage] = useState(null)
  const [totalPage, setTotalPages] = useState(null)
  const [copiedIndex, setCopiedIndex] = useState(null)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [debouncedMinPrice, setDebouncedMinPrice] = useState('')
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState('')
  const [filteredSubCategories, setFilteredSubCategories] = useState([])
  const [sortOption, setSortOption] = useState('newest')

  const router = useRouter()

  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Product List | Clothes2Wear'
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, colorsRes] = await Promise.all([
          axios.get('/api/admin/menu?type=categories'),
          axios.get('/api/admin/menu?type=colors'),
        ])

        setColors(colorsRes.data)
        setAllCategories(categoriesRes.data)
      } catch (error) {
        setError(error.message || 'An unexpected error occured!')
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const handler1 = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)

    return () => {
      clearTimeout(handler1)
    }
  }, [searchQuery])

  useEffect(() => {
    const handler2 = setTimeout(() => {
      setDebouncedMinPrice(minPrice)
    }, 500)

    return () => {
      clearTimeout(handler2)
    }
  }, [minPrice])

  useEffect(() => {
    const handler3 = setTimeout(() => {
      setDebouncedMaxPrice(maxPrice)
    }, 500)

    return () => {
      clearTimeout(handler3)
    }
  }, [maxPrice])

  const fetchProductList = async (page) => {
    try {
      setFetching(true)
      const params = {
        searchQuery,
        categoryId,
        subCategoryId,
        minPrice,
        maxPrice,
        color,
        sortOption,
        page: page || 1,
      }
      const response = await axios.get(`/api/products/get/filter`, { params })
      setProductList(response.data.products)
      setCurrentPage(parseInt(response.data.currentPage))
      setTotalPages(parseInt(response.data.totalPages))
    } catch (error) {
      setError(error.message || 'An unexpected error occured!')
    } finally {
      setFetching(false)
    }
  }

  const handleActiveDeactiveProduct = async (id, isActive) => {
    try {
      const response = await axios.patch(
        '/api/products/update/active-product',
        {
          id,
          isActive,
        }
      )
      enqueueSnackbar(response.data.message, { variant: 'success' })
      fetchProductList()
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  const handlePreviousPage = () => {
    const newPage = currentPage - 1
    setCurrentPage(newPage)
    fetchProductList(newPage)
  }

  const handleNextPage = () => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)
    fetchProductList(newPage)
  }

  const handleProductDelete = async () => {
    try {
      await Promise.all(
        selectedProduct.images.map(async (image) => {
          await deleteImageFromCDN(image.imageUrl)
        })
      )
      const response = await axios.delete(`/api/products/delete`, {
        data: { id: selectedProduct?.id },
      })

      setProductList((prev) =>
        prev.filter((item) => item?.id != selectedProduct?.id)
      )
      setDeleteModalOpen(false)
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchProductList()
  }, [
    debouncedQuery,
    categoryId,
    subCategoryId,
    debouncedMinPrice,
    debouncedMaxPrice,
    color,
    sortOption,
  ])

  useEffect(() => {
    const selectedCategory = allCategories.find(
      (category) => category?.id === categoryId
    )
    if (selectedCategory) {
      setFilteredSubCategories(selectedCategory.subcategories)
    } else {
      setFilteredSubCategories([])
    }
  }, [categoryId, allCategories])

  if (error) {
    return (
      <Layout>
        <ErrorComponent message={error} retry={fetchProductList} />
      </Layout>
    )
  }

  return (
    <>
      <Layout>
        <div className='p-6 bg-gray-100 min-h-screen'>
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-xl font-semibold text-blue-800'>
              Product List
            </h2>
            <div className='flex items-center gap-2'>
              <Button
                onClick={() => router.push('/admin_/products/reviews')}
                label={'Reviews'}
              />
              <Button
                onClick={() => router.push('/admin_/products/size-chart')}
                label={'Size Chart'}
              />
              <Button
                onClick={() => router.push('/admin_/products/create-product')}
                label={'Add Product'}
              />
            </div>
          </div>

          {/* Filters */}
          <div className='flex my-2 flex-wrap items-end gap-2'>
            <Input
              type='text'
              placeholder='Search by title'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Select
              value={categoryId}
              className={'w-full'}
              onChange={(e) => setCategoryId(e.target.value)}
              name='category'
            >
              <option value=''>Select Category</option>
              {allCategories?.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category.name.toUpperCase()}
                </option>
              ))}
            </Select>

            <Select
              value={subCategoryId}
              className={'w-full'}
              onChange={(e) => setSubCategoryId(e.target.value)}
              name='subcategories'
              disabled={!categoryId}
            >
              <option value=''>Select Sub Category</option>
              {filteredSubCategories?.map((subCategory) => (
                <option key={subCategory?.id} value={subCategory?.id}>
                  {subCategory.name.toUpperCase()}
                </option>
              ))}
            </Select>

            <Select
              value={color}
              className={'w-full'}
              onChange={(e) => setColor(e.target.value)}
              name='color'
            >
              <option value=''>Select Color</option>
              {colors?.map((colorOption) => (
                <option key={colorOption?.id} value={colorOption?.id}>
                  {colorOption.name.toUpperCase()}
                </option>
              ))}
            </Select>

            <Input
              small={true}
              type='number'
              placeholder='Min Price'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <Input
              small={true}
              type='number'
              placeholder='Max Price'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            <Select
              value={sortOption}
              className='w-full'
              onChange={(e) => setSortOption(e.target.value)}
              name='sort'
            >
              <option value=''>Sort By</option>
              <option value='alphabet'>Alphabet (A-Z)</option>
              <option value='newest'>Newest</option>
              <option value='oldest'>Oldest</option>
            </Select>
          </div>

          {/* Orders Table */}
          {fetching ? (
            <Loading />
          ) : productList.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse shadow-lg'>
                <thead>
                  <tr className='bg-blue-800 text-white'>
                    <th className='p-2 border border-gray-300'>SL</th>
                    <th className='p-2 border border-gray-300'>Title</th>
                    <th className='p-2 border border-gray-300'>Product ID</th>
                    <th className='p-2 border border-gray-300'>Amount</th>
                    <th className='p-2 border border-gray-300'>Status</th>
                    <th className='p-2 border border-gray-300'>Hyper Link</th>
                    <th className='p-2 border border-gray-300 w-40'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.length > 0 &&
                    productList.map((product, index) => (
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
                          <span
                            onClick={() =>
                              router.push(
                                `/admin_/products/single-product/${product?.id}`
                              )
                            }
                            className='hover:text-blue-800 hover:underline cursor-pointer'
                          >
                            {product.styleId}
                          </span>
                        </td>
                        <td className='p-2 border capitalize border-gray-300'>
                          ₹{product.displayPrice.toFixed(2)}
                        </td>
                        <td
                          className={`p-2 border capitalize border-gray-300 ${
                            product.isActive ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {product.isActive ? 'Active' : 'Not active'}
                        </td>
                        <td className='p-2 border capitalize border-gray-300 w-40'>
                          <p
                            onClick={() => {
                              const linkToCopy = `https://clothes2wear.com/product/${product?.slug}`
                              navigator.clipboard
                                .writeText(linkToCopy)
                                .then(() => {
                                  setCopiedIndex(index)
                                  setTimeout(() => setCopiedIndex(null), 5000)
                                })
                            }}
                            className={`${
                              copiedIndex === index
                                ? 'text-green-600'
                                : 'text-blue-800'
                            } font-semibold cursor-pointer`}
                          >
                            {copiedIndex === index
                              ? 'Link copied'
                              : 'Copy Link'}
                          </p>
                        </td>
                        <td
                          className={`p-2 border border-gray-300 text-center`}
                        >
                          <div className='flex justify-center'>
                            <Dropdown>
                              <DropdownTrigger>
                                <Ellipsis className='cursor-pointer' />
                              </DropdownTrigger>
                              <DropdownMenu
                                className='p-3 rounded-md'
                                aria-label='Static Actions'
                              >
                                <DropdownItem
                                  onClick={() =>
                                    router.push(
                                      `/admin_/products/edit-product/${product?.id}`
                                    )
                                  }
                                  className='py-2 flex items-center gap-2 px-4 hover:bg-gray-300 rounded-sm'
                                >
                                  <div className='flex items-center gap-2'>
                                    <FilePen size={15} />
                                    <p>Edit</p>
                                  </div>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    router.push(
                                      `/admin_/products/reviews?productId=${product.styleId}`
                                    )
                                  }
                                  className='py-2 px-4 hover:bg-gray-300 rounded-sm'
                                >
                                  <div className='flex items-center gap-2'>
                                    <Star size={15} />
                                    <p>All Reviews</p>
                                  </div>
                                </DropdownItem>
                                <DropdownItem className='py-2 px-4 hover:bg-gray-300 rounded-sm'>
                                  {product.isActive ? (
                                    <p
                                      onClick={() =>
                                        handleActiveDeactiveProduct(
                                          product?.id,
                                          false
                                        )
                                      }
                                      className='flex items-center gap-2'
                                    >
                                      <AlertCircle size={15} />
                                      Deactive
                                    </p>
                                  ) : (
                                    <p
                                      onClick={() =>
                                        handleActiveDeactiveProduct(
                                          product?.id,
                                          true
                                        )
                                      }
                                      className='flex items-center gap-2'
                                    >
                                      <CheckCircle size={15} />
                                      Active
                                    </p>
                                  )}
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    router.push(
                                      `/admin_/products/single-product/${product?.id}`
                                    )
                                  }
                                  className='text-yellow-600 py-2 px-4 hover:bg-gray-300 rounded-sm'
                                >
                                  <div className='flex items-center gap-2'>
                                    <FileText size={15} />
                                    <p>Details</p>
                                  </div>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    setSelectedProduct(product)
                                    setDeleteModalOpen(true)
                                  }}
                                  className='text-red-600 py-2 px-4 hover:bg-red-600 hover:text-white rounded-sm'
                                >
                                  <div className='flex items-center gap-2'>
                                    <Trash2 size={15} />
                                    <p>Delete</p>
                                  </div>
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                onPreviousClick={handlePreviousPage}
                onNextClick={handleNextPage}
              />
              {deleteModalOpen && (
                <DeleteModal
                  isOpen={true}
                  onClose={() => setDeleteModalOpen(false)}
                  onDelete={handleProductDelete}
                />
              )}
            </div>
          ) : (
            <div className='bg-blue-50 shadow-md w-full p-5 rounded-md flex items-center'>
              <p>No product found</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default page
