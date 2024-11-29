'use client'

/* eslint-disable react/prop-types */
import CategoryBar from '@/app/Components/CategoryBar'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import ProductCard1 from '@/app/Components/ProductCard1'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import axios from 'axios'

const products = [
  {
    image: 'https://picsum.photos/254/457',
    title: 'Cool Product',
    price: '45999/-',
  },
  {
    image: 'https://picsum.photos/254/747',
    title: 'Cool Product',
    price: '45999/-',
  },
  {
    image: 'https://picsum.photos/254/857',
    title: 'Cool Product',
    price: '45999/-',
  },
  {
    image: 'https://picsum.photos/254/241',
    title: 'Cool Product',
    price: '45999/-',
  },
  {
    image: 'https://picsum.photos/257/457',
    title: 'Cool Product',
    price: '45999/-',
  },
  {
    image: 'https://picsum.photos/687/457',
    title: 'Cool Product',
    price: '45999/-',
  },
  {
    image: 'https://picsum.photos/254/357',
    title: 'Cool Product',
    price: '45999/-',
  },
  {
    image: 'https://picsum.photos/957/457',
    title: 'Cool Product',
    price: '45999/-',
  },
  {
    image: 'https://picsum.photos/847/857',
    title: 'Cool Product',
    price: '45999/-',
  },
  {
    image: 'https://picsum.photos/857/657',
    title: 'Cool Product',
    price: '45999/-',
  },
  {
    image: 'https://picsum.photos/758/457',
    title: 'Cool Product',
    price: '45999/-',
  },
  {
    image: 'https://picsum.photos/758/757',
    title: 'Cool Product',
    price: '45999/-',
  },
]

const CategoryPage = ({ slug }) => {
  console.log(slug)

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false)

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen((prevState) => !prevState)
  }

  const toggleSortDrawer = () => {
    setSortDrawerOpen((prevState) => !prevState)
  }

  const fetchFilterData = async () => {
    const storedColors =
      JSON.parse(localStorage.getItem('selectedColors')) || []
    const storedSizes = JSON.parse(localStorage.getItem('selectedSizes')) || []
    const storedMinPrice = localStorage.getItem('selectedMinPrice') || ''
    const storedMaxPrice = localStorage.getItem('selectedMaxPrice') || ''

    try {
      const params = {
        colors:
          storedColors.length > 0 ? JSON.stringify(storedColors) : undefined,
        sizes: storedSizes.length > 0 ? JSON.stringify(storedSizes) : undefined,
        minPrice: storedMinPrice,
        maxPrice: storedMaxPrice,
      }

      const { data } = await axios.get('/api/search', { params })
      console.log(data) // Handle the response
    } catch (error) {
      console.log('Error:', error.message)
    }
  }

  return (
    <div>
      <div className='max-sm:hidden'>
        <CategoryBar />
      </div>

      <div className='p-3 flex md:gap-4 gap-2 items-start max-md:flex-col'>
        {/* Filter */}
        <div className='max-sm:w-full lg:sticky top-2 left-4'>
          <div className='max-md:hidden'>
            <Sidebar onHandleFilter={() => fetchFilterData()} />
          </div>
          <div className='lg:hidden w-full'>
            <div className='mb-1 gap-2 justify-end w-full flex '>
              <span
                onClick={toggleSortDrawer}
                className='text-sm p-[8px] text-pink-600 px-5 font-semibold rounded-full bg-pink-100'
              >
                Sort by
              </span>
              <span
                onClick={toggleFilterDrawer}
                className='text-sm p-[8px] text-pink-600 px-5 font-semibold rounded-full bg-pink-100'
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
                <Sidebar onHandleFilter={() => fetchFilterData()} />
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
        <div className='flex gap-6 flex-wrap max-sm:grid grid-cols-2 max-sm:gap-2'>
          {products.map((item, index) => (
            <ProductCard1 key={index} product={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
