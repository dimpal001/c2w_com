/* eslint-disable react/prop-types */
import React from 'react'

const Sale = ({ className }) => {
  return (
    <svg
      className={`w-[67px] max-sm:w-[59px] ${className}`}
      id='Layer_2'
      data-name='Layer 2'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 634.48 518.43'
    >
      <defs>
        <linearGradient
          id='linear-gradient'
          x1='0'
          y1='37.95'
          x2='118.35'
          y2='37.95'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor='#c20b1e' />
          <stop offset='1' stopColor='#7d0017' />
        </linearGradient>
        <linearGradient
          id='linear-gradient-2'
          x1='-123.52'
          x2='-5.17'
          gradientTransform='translate(510.95) rotate(-180) scale(1 -1)'
          xlinkHref='#linear-gradient'
        />
        <linearGradient
          id='linear-gradient-3'
          x1='318.27'
          y1='518.43'
          x2='318.27'
          y2='0'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor='#c2001f' />
          <stop offset='.07' stopColor='#b50017' />
          <stop offset='.17' stopColor='#a9000f' />
          <stop offset='.28' stopColor='#a6000d' />
          <stop offset='.46' stopColor='#aa000f' />
          <stop offset='.64' stopColor='#b60016' />
          <stop offset='.75' stopColor='#c2001d' />
          <stop offset='1' stopColor='#ff4059' />
        </linearGradient>
      </defs>
      <g id='Layer_1-2' data-name='Layer 1'>
        <g>
          <path
            fill='url(#linear-gradient)'
            d='M31.35,0C18.01,0,11.71,24.85,0,75.9H118.35V0H31.35s34.6,0,0,0Z'
          />
          <path
            fill='url(#linear-gradient-2)'
            d='M603.13,0c13.34,0,19.64,24.85,31.35,75.9h-118.35V0h87s-34.6,0,0,0Z'
          />
          <path
            fill='url(#linear-gradient-3)'
            d='M605.19,0c-24.99,0-27.64,381.17-27.81,494-.03,17.85-18.54,29.64-34.73,22.13l-201.16-93.38c-14.72-6.83-31.7-6.83-46.42,0l-201.17,93.38c-16.19,7.51-34.7-4.29-34.73-22.13C59,381.17,56.34,0,31.35,0H605.19Z'
          />
        </g>
      </g>
    </svg>
  )
}

export default Sale
