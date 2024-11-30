/* eslint-disable react/prop-types */
import React from 'react'

const Skeleton = ({ className }) => {
  return (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`}></div>
  )
}

export default Skeleton
