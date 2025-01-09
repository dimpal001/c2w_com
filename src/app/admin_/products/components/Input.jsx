/* eslint-disable react/prop-types */
import React from 'react'

// eslint-disable-next-line react/prop-types
const Input = ({
  label,
  type,
  onChange,
  value,
  name,
  placeholder,
  width,
  disabled,
}) => {
  return (
    <div className={`flex flex-col ${label && 'gap-1'} ${width && width}`}>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        id={label}
        disabled={disabled}
        name={name}
        type={type ? type : 'text'}
        onChange={onChange}
        value={value}
        className={`px-2 py-[6px] border focus:outline-none focus:border-blue-800 border-slate-500 rounded-sm`}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
