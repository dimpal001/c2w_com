/* eslint-disable react/prop-types */
import React from 'react'

const Button = ({
  label,
  onClick,
  variant = 'primary',
  loading = false,
  loadingText,
  disabled,
}) => {
  const bgColor = {
    primary: 'bg-blue-800',
    white: 'bg-white',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    secondary: 'bg-gray-500',
    outline: 'bg-transparent',
  }[variant]

  const borderColor = {
    primary: 'border-blue-800',
    white: 'border-white',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    error: 'border-red-500',
    secondary: 'border-gray-500',
    outline: 'border-current',
  }[variant]

  const textColor = {
    primary: 'text-white',
    white: 'text-blue-800',
    success: 'text-white',
    warning: 'text-white',
    error: 'text-white',
    secondary: 'text-white',
    outline: 'text-blue-800',
  }[variant]

  const buttonClass =
    variant === 'outline'
      ? `border ${borderColor} ${textColor} p-[5px] rounded-sm px-3 text-sm`
      : `border ${borderColor} ${bgColor} ${textColor} p-[5px]  rounded-sm px-3 text-sm`

  const loadingClass = loading ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button
      onClick={onClick}
      className={`${buttonClass} ${loadingClass} ${
        disabled && 'opacity-60'
      } flex items-center justify-center`}
      disabled={disabled ? disabled : loading}
    >
      {loading ? (
        <span className='flex items-center space-x-2'>
          <svg
            className='animate-spin h-4 w-4 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          <span>{loadingText ? loadingText : 'Please wait'}</span>
        </span>
      ) : (
        label
      )}
    </button>
  )
}

export default Button
