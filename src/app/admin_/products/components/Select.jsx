import React from 'react'

// eslint-disable-next-line react/prop-types
const Select = ({ label, onChange, name, children, defaultValue, value }) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={label}>{label}</label>
      <select
        value={value}
        defaultValue={defaultValue}
        className='px-3 py-[7px] border bg-white focus:outline-none focus:border-blue-800 border-slate-500 rounded-sm '
        name={name}
        id={label}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  )
}

export default Select
