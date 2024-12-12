/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Loader2, Quote } from 'lucide-react'
import { SlideItem, Slider } from '@/app/HomePageComponents/Slider'
import Image from 'next/image'
import axios from 'axios'
import { cdnPath } from '@/app/Components/cdnPath'

const QuoteSection = () => {
  const [quotes, setQuotes] = useState([])
  const [fetching, setFetching] = useState(true)

  const fetchQuotes = async () => {
    try {
      setFetching(true)
      const response = await axios.get('/api/customs/quotes')
      setQuotes(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  return (
    <div className='flex justify-center mt-3 items-center bg-transparent'>
      {!fetching ? (
        <Slider
          className={'max-sm:p-3'}
          autoSlide={true}
          slideInterval={5000}
          showArrows={false}
          showIndicators={false}
        >
          {quotes.length > 0 &&
            quotes.map((item, index) => (
              <SlideItem key={index}>
                <div>
                  {item.imageUrl ? (
                    <Image
                      width={500}
                      height={200}
                      layout='intrinsic'
                      className='lg:w-[500px] rounded-tl-2xl rounded-br-2xl lg:h-[200px] -skew-x-12'
                      alt=''
                      src={cdnPath + item.imageUrl}
                    />
                  ) : (
                    <Card data={item} />
                  )}
                </div>
              </SlideItem>
            ))}
        </Slider>
      ) : (
        <div className='flex items-center justify-center p-10 gap-7'>
          Loading <Loader2 className='animate-spin' />
        </div>
      )}
    </div>
  )
}

const Card = ({ data }) => {
  return (
    <div className='w-full relative gap-5 max-sm:p-5 -skew-x-12 justify-center items-center rounded-2xl lg:w-[500px] lg:h-[150px] bg-gradient-to-r from-pink-500 to-blue-400 text-white flex mt-3'>
      <p className='font-semibold plhu max-sm:text-sm text-center'>
        {data?.text}
      </p>
      <Quote className='absolute -top-3 w-10 h-10 right-5 fill-pink-600 text-pink-600' />
    </div>
  )
}

export default QuoteSection
