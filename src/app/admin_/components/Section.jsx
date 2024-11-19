import React from 'react'

// eslint-disable-next-line react/prop-types
const Section = ({ children, className }) => {
  return (
    <div
      className={`${className} bg-blue-50 p-4 rounded-[2px] shadow-md mb-6 flex flex-wrap gap-8`}
    >
      {children}
    </div>
  )
}

export default Section
