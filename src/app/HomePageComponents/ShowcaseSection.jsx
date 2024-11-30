/* eslint-disable react/prop-types */
'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Skeleton from '../Components/Skeleton'

const ShowcaseSection = () => {
  const [showcases, setShowcases] = useState([])

  useEffect(() => {
    fetchShowcases()
  }, [])

  const fetchShowcases = async () => {
    try {
      const response = await axios.get('/api/customs/showcases/get')
      setShowcases(response.data.showcases)
      console.log(showcases)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full flex items-center gap-6 px-14 lg:h-[320px] '>
      {showcases.length > 0 &&
        showcases.map((showcase, index) => (
          <ShowcaseCard key={index} showcase={showcase} />
        ))}
      {showcases.length > 0 &&
        showcases.map((showcase, index) => (
          <ShowcaseCard key={index} showcase={showcase} />
        ))}

      {showcases.length === 0 &&
        Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className={'w-[200px] h-[270px]'} />
        ))}
    </div>
  )
}

const ShowcaseCard = ({ showcase }) => {
  return (
    <div className='w-[200px] relative rounded-xl h-[270px]'>
      <img
        src={showcase.imageUrl}
        className='w-[200px] rounded-xl h-[270px] object-cover'
        alt=''
      />
      <div className='absolute rounded-xl bottom-0 left-0 right-0 h-[120px] z-10 bg-gradient-to-t from-black to-transparent from-[1%]'></div>
      <p className='absolute text-lg inset-0 flex justify-start items-end py-3 px-5 z-20 font-bold text-white'>
        {showcase.title}
      </p>
    </div>
  )
}

export default ShowcaseSection
