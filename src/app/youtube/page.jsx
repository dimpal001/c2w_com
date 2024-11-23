import React from 'react'

const page = () => {
  const videoId = 'LXb3EKWsInQ'
  return (
    <div className='min-h-screen w-full justify-center items-center flex'>
      <div className='relative w-full h-[550px] max-md:h-[200px] overflow-hidden bg-red-600'>
        <iframe
          className='absolute top-0 left-0 w-full h-full scale-[1.45]'
          src={`https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&autoplay=1&mute=1&loop=1&playlist=${videoId}`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
        <div className='absolute top-0 left-0 inset-0 bg-slate-900 opacity-60'></div>
      </div>
    </div>
  )
}

export default page
