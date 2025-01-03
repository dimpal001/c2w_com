/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { usePathname } from 'next/navigation'

const Sidebar = ({ onHandleFilter, toggleFilterDrawer }) => {
  const [sizes, setSizes] = useState([])
  const [fabrics, setFabrics] = useState([])
  const [colors, setColors] = useState([])
  const [minPrice, setMinPrice] = useState(100)
  const [maxPrice, setMaxPrice] = useState(40000)
  const minGap = 1000
  const maxRange = 40000

  const pathname = usePathname()
  const currentPath = pathname.split('/')[2]

  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedFabrics, setSelectedFabrics] = useState([])
  const [selectedMinPrice, setSelectedMinPrice] = useState('')
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('')

  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice)
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice)

  useEffect(() => {
    fetchSizes()
    fetchColors()
    fetchFebrics()
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
      const allSizes = response.data

      if (currentPath === 'kids-wear') {
        const newSizes = allSizes.filter((size) => size?.name?.length > 4)
        setSizes(newSizes)
      } else if (currentPath === 'accessories') {
        // Exclude sizes that include 'x', 'xl', 's', 'm'
        const newSizes = allSizes.filter(
          (size) =>
            !['x', 'l', 's', 'm'].some((substring) =>
              size?.slug?.toLowerCase().includes(substring)
            )
        )
        setSizes(newSizes)
      } else {
        setSizes(allSizes)
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to handle task!',
        { variant: 'error' }
      )
    }
  }

  const fetchFebrics = async () => {
    try {
      const response = await axios.get('/api/admin/menu/fabrics')
      const allFabrics = response.data

      setFabrics(allFabrics)
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to handle task!',
        { variant: 'error' }
      )
    }
  }

  const fetchColors = async () => {
    try {
      const response = await axios.get('/api/admin/menu/colors')
      setColors(response.data)
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to handle task!'
      )
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

  const handleFabricChange = (e, fabric) => {
    const { checked } = e.target
    if (checked) {
      setSelectedFabrics((prev) => {
        if (!prev.some((s) => s.id === fabric.id)) {
          return [...prev, fabric]
        }
        return prev
      })
    } else {
      setSelectedFabrics((prev) => prev.filter((s) => s.id !== fabric.id))
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
  const [showFabricFilter, setShowFabricFilter] = useState(true)
  const [showColorFilter, setShowColorFilter] = useState(true)

  const handleApplyFilters = () => {
    localStorage.setItem('selectedColors', JSON.stringify(selectedColors))
    localStorage.setItem('selectedSizes', JSON.stringify(selectedSizes))
    localStorage.setItem('selectedFabrics', JSON.stringify(selectedFabrics))
    localStorage.setItem('selectedMinPrice', selectedMinPrice)
    localStorage.setItem('selectedMaxPrice', selectedMaxPrice)
    onHandleFilter()
    toggleFilterDrawer()
  }

  return (
    <div className='w-80 overflow-scroll max-md:w-full max-sm:min-h-[600px] max-sm:p-6 bg-pink-50 shadow-sm shadow-pink-300 p-3 rounded-lg'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-semibold text-gray-800'>Filter</h2>
        <span
          onClick={handleApplyFilters}
          className='py-[7px] md:text-sm cursor-pointer px-5 bg-blue-700 text-white rounded-full'
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
              {colors
                .filter((color) => color.slug !== 'nocolor')
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((color) => (
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
                      className={`w-6 h-6 rounded-full border border-gray-300`}
                      style={{
                        background:
                          color.slug === 'multicolor'
                            ? 'linear-gradient(to right, #dc2626, #2563eb, #16a34a)'
                            : color.code,
                      }}
                    ></span>
                    <span className='capitalize'>{color.name}</span>
                  </label>
                ))}
            </div>
          )}
        </div>

        {/* Size Filter */}
        <div className='mb-4 bg-neutral-200 p-3 rounded-md'>
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={() => setShowFabricFilter(!showFabricFilter)}
          >
            <h3 className='text-lg font-medium text-gray-700'>Fabric</h3>
            {showFabricFilter ? (
              <ChevronUp className='w-5 h-5 text-gray-600' />
            ) : (
              <ChevronDown className='w-5 h-5 text-gray-600' />
            )}
          </div>
          {showFabricFilter && (
            <div className='mt-2'>
              {fabrics.map((fabric) => (
                <label
                  key={fabric.id}
                  className='flex items-center space-x-2 mb-2'
                >
                  <input
                    type='checkbox'
                    onChange={(e) => handleFabricChange(e, fabric)}
                    className='accent-pink-500'
                  />
                  <span className='text-gray-700 capitalize'>
                    {fabric.name}
                  </span>
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
