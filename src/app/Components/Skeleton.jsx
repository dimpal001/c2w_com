/* eslint-disable react/prop-types */
import React from 'react'

const Skeleton = ({ className }) => {
  return (
    <div
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-wave ${className}`}
    ></div>
  )
}

export default Skeleton
