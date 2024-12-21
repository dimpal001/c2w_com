/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'

// eslint-disable-next-line react/prop-types

const TextArea = ({
  label,
  rows = 1,
  onChange,
  name,
  value,
  placeholder,
  disabled,
  onKeyDown,
}) => {
  const textAreaRef = useRef(null)

  const adjustHeight = () => {
    const textArea = textAreaRef.current
    if (textArea) {
      textArea.style.height = 'auto'
      textArea.style.height = `${textArea.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [value])

  return (
    <div className='flex w-full flex-col gap-1'>
      <label htmlFor={label}>{label}</label>
      <textarea
        disabled={disabled}
        ref={textAreaRef}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          onChange(e)
          adjustHeight()
        }}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        id={label}
        className='px-2 py-[6px] w-full border focus:outline-none focus:border-blue-800 border-slate-500 rounded-sm resize-none'
        style={{ overflow: 'hidden' }}
      ></textarea>
    </div>
  )
}

export default TextArea
