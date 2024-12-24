/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const ImageMagnifier = ({ imageUrl }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPosition({ x, y })
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  return (
    <div className='relative inline-block'>
      {/* Main Image */}
      <img
        src={imageUrl}
        alt='Magnifiable'
        className='w-full rounded-xl h-auto'
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* Magnifier */}
      {isHovering && (
        <div
          className='absolute w-44 h-44 border-2 border-gray-200 rounded-full overflow-hidden pointer-events-none'
          style={{
            top: `${position.y}%`,
            left: `${position.x}%`,
            transform: 'translate(-50%, -50%)',
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: '600%',
          }}
        />
      )}
    </div>
  )
}

export default ImageMagnifier
