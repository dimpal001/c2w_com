/* eslint-disable react/prop-types */

import React from 'react'
import Skeleton from '../Components/Skeleton'
import { cdnPath } from '../Components/cdnPath'

const ShowcaseSection = ({ showcases }) => {
  return (
    <div className='w-auto flex overflow-auto scrollbar-hide items-center gap-6 px-14 max-sm:px-5 max-sm:gap-3 md:h-[320px] max-sm:h-[192px]'>
      {showcases.length > 0 &&
        showcases.map((showcase, index) => (
          <ShowcaseCard key={index} showcase={showcase} />
        ))}

      {!showcases &&
        Array.from({ length: 5 }, (_, index) => (
          <Skeleton
            key={index}
            className={
              'md:w-[200px] rounded-xl max-sm:w-[100px] max-sm:min-w-[100px] md:min-w-[200px] max-sm:h-[146px] md:h-[270px]'
            }
          />
        ))}
    </div>
  )
}

const ShowcaseCard = ({ showcase, onClick }) => {
  return (
    <a
      rel='noreferrer'
      target='_blank'
      href={showcase.hyperLink}
      onClick={onClick}
      className='md:w-[200px] cursor-pointer max-sm:w-[100px] max-sm:min-w-[100px] md:min-w-[200px] relative rounded-xl max-sm:h-[146px] md:h-[270px]'
    >
      <img
        src={cdnPath + showcase.imageUrl}
        className='md:w-[200px] max-sm:w-[100px] rounded-xl max-sm:h-[146px] md:h-[270px] object-cover'
        alt='clothes2wear'
      />
      <div className='absolute rounded-xl bottom-0 left-0 right-0 h-[120px] z-10 bg-gradient-to-t from-black to-transparent from-[1%]'></div>
      <p className='absolute max-sm:text-xs text-lg inset-0 flex justify-start items-end max-sm:py-1 max-sm:px-2 py-3 px-5 z-20 font-bold text-white'>
        {showcase.title}
      </p>
    </a>
  )
}

export default ShowcaseSection
