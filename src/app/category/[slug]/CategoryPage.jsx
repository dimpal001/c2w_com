'use client'

/* eslint-disable react/prop-types */
import CategoryBar from '@/app/Components/CategoryBar'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import ProductCard1 from '@/app/Components/ProductCard1'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import axios from 'axios'
import { Frown, Loader } from 'lucide-react'
import { useSearch } from '@/app/context/SearchContext'
import { useUserContext } from '@/app/context/UserContext'
import Skeleton from '@/app/Components/Skeleton'

const CategoryPage = ({ slug }) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false)

  const [isEmptyProduct, setIsEmptyProduct] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [hasMoreProducts, setHasMoreProducts] = useState(true)

  const { searchQuery } = useSearch()
  const { user } = useUserContext()

  const [products, setProducts] = useState([])

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen((prevState) => !prevState)
  }

  const toggleSortDrawer = () => {
    setSortDrawerOpen((prevState) => !prevState)
  }

  useEffect(() => {
    fetchFilterData(1)
  }, [searchQuery])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.scrollHeight

      if (scrollPosition && !loadingMore && hasMoreProducts) {
        setCurrentPage(currentPage + 1)
        fetchFilterData(currentPage + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentPage, loadingMore, hasMoreProducts])

  const fetchFilterData = async (page = 1) => {
    const storedColors =
      JSON.parse(localStorage.getItem('selectedColors')) || []
    const storedSizes = JSON.parse(localStorage.getItem('selectedSizes')) || []
    const storedMinPrice = localStorage.getItem('selectedMinPrice') || 100
    const storedMaxPrice = localStorage.getItem('selectedMaxPrice') || 40000

    try {
      setIsEmptyProduct(false)
      setFetching(page === 1)
      setLoadingMore(page !== 1)
      const params = {
        searchQuery: searchQuery,
        colors:
          storedColors.length > 0 ? JSON.stringify(storedColors) : undefined,
        sizes: storedSizes.length > 0 ? JSON.stringify(storedSizes) : undefined,
        minPrice: storedMinPrice,
        maxPrice: storedMaxPrice,
        categorySlug: slug || null,
        page: page,
        userId: user?.id || null,
      }

      const response = await axios.get('/api/search', { params })
      setProducts((prevProducts) =>
        page === 1
          ? response.data.products
          : [...prevProducts, ...response.data.products]
      )

      setHasMoreProducts(
        response.data.totalProducts > products.length ? true : false
      )

      if (response.data.products.length === 0) {
        setIsEmptyProduct(true)
      }
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setFetching(false)
      setLoadingMore(false)
    }
  }

  return (
    <div>
      <div className='max-sm:hidden'>
        <CategoryBar />
      </div>

      <div className='p-3 flex md:gap-10 gap-2 items-start max-md:flex-col'>
        {/* Filter */}
        <div className='max-sm:w-full lg:sticky top-[70px] left-4'>
          <div className='max-md:hidden'>
            <Sidebar onHandleFilter={() => fetchFilterData()} />
          </div>
          <div className='lg:hidden w-full'>
            <div className='mb-1 gap-2 justify-end w-full flex '>
              {/* <span
                onClick={toggleSortDrawer}
                className='text-sm p-[8px] text-pink-600 px-5 font-semibold rounded-full bg-pink-100'
              >
                Sort by
              </span> */}
              <span
                onClick={toggleFilterDrawer}
                className='text-sm p-[5px] text-pink-600 px-5 font-semibold rounded-full bg-pink-100'
              >
                Filter
              </span>
            </div>
            <Drawer
              open={filterDrawerOpen}
              onClose={toggleFilterDrawer}
              direction='bottom'
              className='w-screen'
              size={600}
            >
              <div className='w-full'>
                <Sidebar
                  onHandleFilter={fetchFilterData}
                  toggleFilterDrawer={toggleFilterDrawer}
                />
              </div>
            </Drawer>

            <Drawer
              open={sortDrawerOpen}
              onClose={toggleSortDrawer}
              direction='bottom'
              className='w-screen'
              size={180}
            >
              <div className='w-full p-6'>
                {/* Sort By Section */}
                <div className='mb-6'>
                  <h2 className='text-2xl font-semibold text-gray-800'>
                    Sort by
                  </h2>
                  <div className='space-y-2 p-5'>
                    {/* Low to High Option */}
                    <label className='flex items-center space-x-2'>
                      <input
                        type='radio'
                        name='sort'
                        value='low-to-high'
                        // onChange={() => handleSort('low-to-high')}
                        className='accent-pink-500'
                      />
                      <span className='text-pink-600 font-semibold'>
                        Low to High Price
                      </span>
                    </label>

                    {/* High to Low Option */}
                    <label className='flex items-center space-x-2'>
                      <input
                        type='radio'
                        name='sort'
                        value='high-to-low'
                        // onChange={() => handleSort('high-to-low')}
                        className='accent-pink-500'
                      />
                      <span className='text-pink-600 font-semibold'>
                        High to Low Price
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </Drawer>
          </div>
        </div>

        {/* Products */}
        <div className='w-full'>
          {fetching ? (
            <div className='flex gap-6 mt-5 h-full flex-wrap max-sm:grid grid-cols-2 max-sm:gap-2'>
              {/* <Loader className='animate-spin' /> */}
              {Array.from({ length: 12 }, (_, index) => (
                <Skeleton
                  key={index}
                  className={
                    'w-60 max-sm:w-[182px] max-w-60 max-sm:max-w-[182px] h-96 max-sm:h-72 max-sm:max-h-72 max-h-96'
                  }
                />
              ))}
            </div>
          ) : (
            <div className='max-sm:min-h-[600px]'>
              <p className='lg:py-2 max-sm:pb-2 max-sm:text-sm text-neutral-600'>
                {products?.length} products found
              </p>

              {/* Show Products  */}
              <div className='flex gap-6 flex-wrap max-sm:grid grid-cols-2 max-sm:gap-2'>
                {products.map((item, index) => (
                  <ProductCard1 key={index} product={item} />
                ))}
              </div>

              {/* Load more  */}
              <div className='flex justify-center items-center'>
                {loadingMore && (
                  <div className='flex justify-center items-center py-2'>
                    <Loader className='animate-spin' size={24} />
                  </div>
                )}
              </div>

              <div>
                {isEmptyProduct && products.length === 0 && (
                  <div className='flex items-center justify-center flex-col h-[450px] w-full'>
                    <Frown className='text-zinc-300' size={120} />
                    <p className='text-2xl font-bold text-zinc-300'>
                      No Products found!
                    </p>
                    <p className='text-zinc-300 text-center'>
                      Your search did not match any products.
                      <br /> Please try again
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
