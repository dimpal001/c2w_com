import React from 'react'

// eslint-disable-next-line react/prop-types
const Section = ({ children, className }) => {
  return (
    <section className={`${className} flex w-full items-end gap-6`}>
      {children}
    </section>
  )
}

export default Section
