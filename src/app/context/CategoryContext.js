/* eslint-disable react/prop-types */
// context/CategoryContext.js
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `/api/admin/menu/categories?type=visible`
        )
        setCategories(response.data)
      } catch {
        /* empty */
      }
    }

    if (categories.length === 0) {
      fetchCategories()
    }
  }, [categories])

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategories = () => {
  return useContext(CategoryContext)
}
