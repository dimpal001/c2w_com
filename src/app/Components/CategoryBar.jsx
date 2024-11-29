'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CategoryBar = () => {
  const [categories, setCategories] = useState([])

  const handleFetchCategories = async () => {
    try {
      const response = await axios.get(`/api/admin/menu/categories`)
      setCategories(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetchCategories()
  }, [])
  return (
    <div className='uppercase flex max-sm:flex-wrap tracking-wider cursor-pointer text-sm font-semibold text-pink-600 p-3 gap-12 shadow-md border-t border-pink-200 shadow-pink-200 justify-center'>
      {categories.length > 0 &&
        categories.map((item, index) => <div key={index}>{item.name}</div>)}
    </div>
  )
}

export default CategoryBar
