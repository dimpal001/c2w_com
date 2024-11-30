import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Loader size={30} className='animate-spin' />
    </div>
  )
}

export default Loading
