/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import axios from 'axios'
import { X } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'

const AddDiscount = ({ formData, setFormData }) => {
  const [showTable, setShowTable] = useState(false)
  const [discounts, setDiscounts] = useState([])

  // Fetch discounts from the API
  const fetchDiscounts = async () => {
    try {
      const response = await axios.get('/api/customs/discounts/get')
      setDiscounts(response.data.discounts)
    } catch (error) {
      console.log(error)
    }
  }

  // Handle selecting a discount
  const handleSelectDiscounts = (item) => {
    const isAlreadySelected = formData.discounts?.some(
      (discount) => discount.id === item.id
    )

    if (isAlreadySelected) {
      enqueueSnackbar('This discount is already selected!', {
        variant: 'warning',
      })
      return
    }

    const updatedDiscounts = [...(formData.discounts || []), item]
    setFormData((prev) => ({ ...prev, discounts: updatedDiscounts }))
  }

  // Handle removing a selected discount
  const handleRemoveDiscount = (item) => {
    // Remove the selected discount by filtering out the matched item
    const updatedDiscounts = formData.discounts.filter(
      (discount) => discount.id !== item.id
    )
    setFormData((prev) => ({ ...prev, discounts: updatedDiscounts }))
  }

  useEffect(() => {
    fetchDiscounts()
  }, [])

  return (
    <div>
      <Button label={'Add Discount'} onClick={() => setShowTable(!showTable)} />

      {/* Display the selected discount codes */}
      <div className='mt-3'>
        {formData.discounts?.length > 0 && (
          <div>
            <ul className=' bg-green-600 text-white rounded-md'>
              {formData.discounts.map((item, index) => {
                const discount = discounts.find(
                  (discount) => discount.id === item.id
                )
                return discount ? (
                  <li
                    key={item.id}
                    className={`grid grid-cols-5 py-2 px-3 ${
                      index % 2 === 0 ? 'bg-green-800' : 'bg-green-600'
                    }`}
                  >
                    <span className='uppercase'>{discount.code}</span>
                    <span>{discount.description}</span>
                    <span>{discount.type}</span>
                    <span>{discount.amount}</span>
                    <span className='flex justify-end'>
                      <X
                        className='text-red-500 cursor-pointer'
                        onClick={() => handleRemoveDiscount(item)}
                      />
                    </span>
                  </li>
                ) : null
              })}
            </ul>
          </div>
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out max-h-0 ${
          showTable ? 'max-h-screen' : ''
        }`}
      >
        <div className='py-3'>
          <table className='min-w-full text-xs bg-white border border-gray-200'>
            <thead>
              <tr className='bg-blue-800 text-white'>
                <th className='py-2 px-4 text-start border'>Coupon Code</th>
                <th className='py-2 px-4 text-start border'>Description</th>
                <th className='py-2 px-4 text-start border'>Amount</th>
                <th className='py-2 px-4 text-start border'>Min. Price</th>
                <th className='py-2 px-4 text-start border'>Max. Price</th>
                <th className='py-2 px-4 text-start border'>Type</th>
                <th className='py-2 px-4 text-start border'>Action</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((item) => (
                <tr key={item.id}>
                  <td className='py-2 px-4 border uppercase'>{item.code}</td>
                  <td className='py-2 px-4 border'>{item.description}</td>
                  <td className='py-2 px-4 border'>{item.amount}</td>
                  <td className='py-2 px-4 border'>{item.minPrice}</td>
                  <td className='py-2 px-4 border'>{item.maxPrice}</td>
                  <td className='py-2 px-4 border'>{item.type}</td>
                  <td className='py-2 px-4 border'>
                    <div className='flex justify-center'>
                      <Button
                        label={'Activate'}
                        onClick={() => handleSelectDiscounts(item)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AddDiscount
