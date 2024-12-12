/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import axios from 'axios'

const Sidebar = ({ onHandleFilter, toggleFilterDrawer }) => {
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [minPrice, setMinPrice] = useState(100)
  const [maxPrice, setMaxPrice] = useState(40000)
  const minGap = 1000
  const maxRange = 40000

  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedMinPrice, setSelectedMinPrice] = useState('')
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('')

  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice)
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice)

  useEffect(() => {
    fetchSizes()
    fetchColors()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedMinPrice(debouncedMinPrice)
    }, 500)
    return () => clearTimeout(timer)
  }, [debouncedMinPrice])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedMaxPrice(debouncedMaxPrice)
    }, 500)
    return () => clearTimeout(timer)
  }, [debouncedMaxPrice])

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (value + minGap <= maxPrice) {
      setMinPrice(value)
      setDebouncedMinPrice(value)
    }
  }

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (value - minGap >= minPrice) {
      setMaxPrice(value)
      setDebouncedMaxPrice(value)
    }
  }

  const fetchSizes = async () => {
    try {
      const response = await axios.get('/api/admin/menu/sizes')
      setSizes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchColors = async () => {
    try {
      const response = await axios.get('/api/admin/menu/colors')
      setColors(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSizeChange = (e, size) => {
    const { checked } = e.target
    if (checked) {
      setSelectedSizes((prev) => {
        if (!prev.some((s) => s.id === size.id)) {
          return [...prev, size]
        }
        return prev
      })
    } else {
      setSelectedSizes((prev) => prev.filter((s) => s.id !== size.id))
    }
  }

  const handleColorChange = (e, color) => {
    const { checked } = e.target

    if (checked) {
      setSelectedColors((prev) => {
        if (!prev.some((c) => c.id === color.id)) {
          return [...prev, color]
        }
        return prev
      })
    } else {
      setSelectedColors((prev) => prev.filter((c) => c.id !== color.id))
    }
  }

  const [showSizeFilter, setShowSizeFilter] = useState(true)
  const [showColorFilter, setShowColorFilter] = useState(true)

  const handleApplyFilters = () => {
    localStorage.setItem('selectedColors', JSON.stringify(selectedColors))
    localStorage.setItem('selectedSizes', JSON.stringify(selectedSizes))
    localStorage.setItem('selectedMinPrice', selectedMinPrice)
    localStorage.setItem('selectedMaxPrice', selectedMaxPrice)
    onHandleFilter()
    toggleFilterDrawer()
  }

  return (
    <div className='w-64 overflow-scroll max-md:w-full max-sm:min-h-[600px] max-sm:p-6 bg-pink-50 shadow-sm shadow-pink-300 p-3 rounded-lg'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-semibold text-gray-800'>Filter</h2>
        <span
          onClick={handleApplyFilters}
          className='py-[7px] lg:text-sm cursor-pointer px-5 bg-blue-700 text-white rounded-full'
        >
          Apply
        </span>
      </div>

      <div className='overflow-scroll scrollbar-hide max-h-[500px]'>
        {/* Price Range */}
        <div className='mb-4 bg-neutral-200 p-4 rounded-md'>
          <h3 className='text-lg font-medium text-gray-700 mb-4'>
            Price Range
          </h3>

          {/* Range Wrapper */}
          <div className=' h-8'>
            {/* Minimum Handle */}
            <input
              type='range'
              max={maxRange}
              value={minPrice}
              onChange={handleMinChange}
              className='w-full  accent-pink-500 h-2 pointer-events-none slider-thumb'
              style={{ pointerEvents: 'auto' }}
            />

            {/* Maximum Handle */}
            <input
              type='range'
              max={maxRange}
              value={maxPrice}
              onChange={handleMaxChange}
              className='w-full top-4 h-2 accent-pink-500 pointer-events-none slider-thumb'
              style={{ pointerEvents: 'auto' }}
            />
          </div>

          {/* Values */}
          <div className='flex justify-between text-sm text-gray-600 mt-4'>
            <span>₹{minPrice}</span>
            <span>₹{maxPrice}</span>
          </div>
        </div>

        {/* Size Filter */}
        <div className='mb-4 bg-neutral-200 p-3 rounded-md'>
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={() => setShowSizeFilter(!showSizeFilter)}
          >
            <h3 className='text-lg font-medium text-gray-700'>Size</h3>
            {showSizeFilter ? (
              <ChevronUp className='w-5 h-5 text-gray-600' />
            ) : (
              <ChevronDown className='w-5 h-5 text-gray-600' />
            )}
          </div>
          {showSizeFilter && (
            <div className='mt-2'>
              {sizes.map((size) => (
                <label
                  key={size.id}
                  className='flex items-center space-x-2 mb-2'
                >
                  <input
                    type='checkbox'
                    onChange={(e) => handleSizeChange(e, size)}
                    className='accent-pink-500'
                  />
                  <span className='text-gray-700 uppercase'>{size.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Color Filter */}
        <div className='mb-4 bg-neutral-200 p-3 rounded-md'>
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={() => setShowColorFilter(!showColorFilter)}
          >
            <h3 className='text-lg font-medium text-gray-700'>Color</h3>
            {showColorFilter ? (
              <ChevronUp className='w-5 h-5 text-gray-600' />
            ) : (
              <ChevronDown className='w-5 h-5 text-gray-600' />
            )}
          </div>
          {showColorFilter && (
            <div className='mt-2'>
              {colors.map((color) => (
                <label
                  key={color.id}
                  className='flex items-center space-x-2 mb-2 text-gray-700'
                >
                  <input
                    type='checkbox'
                    onChange={(e) => handleColorChange(e, color)}
                    className='accent-pink-500'
                  />
                  <span
                    className={`w-4 h-4 rounded-full border border-gray-300`}
                    style={{ backgroundColor: color.code }}
                  ></span>
                  <span className='capitalize'>{color.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
