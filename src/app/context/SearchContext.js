/* eslint-disable react/prop-types */
// SearchContext.js

import React, { createContext, useContext, useState, useEffect } from 'react'

const SearchContext = createContext()

export const useSearch = () => {
  return useContext(SearchContext)
}

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const query = searchParams.get('search') || ''
    setSearchQuery(query)
  }, [])

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}
