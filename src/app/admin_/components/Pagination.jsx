/* eslint-disable react/prop-types */
import React from 'react'
import Button from './Button'

const Pagination = ({
  currentPage,
  totalPage,
  onPreviousClick,
  onNextClick,
}) => {
  return (
    <>
      {totalPage > 0 && (
        <div className='flex items-center gap-4 p-2 justify-end'>
          <div>
            <Button
              disabled={currentPage === 1 ? true : false}
              label={'Previous'}
              onClick={onPreviousClick}
            />
          </div>
          <div>
            {currentPage} of {totalPage}
          </div>
          <div>
            <Button
              disabled={currentPage === totalPage ? true : false}
              label={'Next'}
              onClick={onNextClick}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Pagination
