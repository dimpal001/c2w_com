/* eslint-disable react/prop-types */
import { RefreshCw } from 'lucide-react'
import React from 'react'

const ErrorComponent = ({ message, retry }) => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center rounded-sm w-[500px] h-[300px] bg-gray-200 p-4'>
        <h1 className='text-2xl font-semibold text-red-600 mb-2'>
          Something went wrong
        </h1>
        <p className='text-gray-700 mb-4'>{message}</p>
        {retry && (
          <button
            onClick={retry}
            className='bg-blue-600 flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-blue-800'
          >
            <RefreshCw size={20} />
            Retry
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorComponent
