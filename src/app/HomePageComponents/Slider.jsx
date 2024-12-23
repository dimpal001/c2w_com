'use client'

/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SlideItem = ({ children, className }) => (
  <div className={`flex items-center justify-center ${className}`}>
    {children}
  </div>
)

const Slider = ({
  children,
  className,
  showArrows = true,
  showIndicators = true,
  autoSlide = true,
  slideInterval = 3000,
  slideDirection = 'slideLeft',
}) => {
  const slides = React.Children.toArray(children)
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef(null)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    )
  }

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    if (autoSlide) {
      resetTimeout()
      timeoutRef.current = setTimeout(handleNext, slideInterval)
    }
    return () => resetTimeout()
  }, [currentIndex, autoSlide, slideInterval])

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <div className='relative flex w-full h-full'>
        <motion.div
          key={currentIndex}
          initial={{
            x: slideDirection === 'slideRight' ? '-100%' : '100%',
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: slideDirection === 'slideRight' ? '100%' : '-100%',
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className='flex w-full h-full justify-center items-center'
        >
          {slides[currentIndex]}
        </motion.div>
      </div>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            className='absolute left-2 z-30 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-[4px] rounded-full hover:bg-pink-600'
            onClick={handlePrev}
          >
            <ChevronLeft size={15} className='max-sm:w-6 max-sm:h-6' />
          </button>
          <button
            className='absolute right-2 z-30 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-[4px] rounded-full hover:bg-pink-600'
            onClick={handleNext}
          >
            <ChevronRight size={15} className='max-sm:w-6 max-sm:h-6' />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { Slider, SlideItem }
