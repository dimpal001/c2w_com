/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { FilePen, X } from 'lucide-react'
import Button from '../../components/Button'
import InventoryModal from './InventoryModal'

const InventorySection = ({ formData, setFormData, sizes }) => {
  const [openInventoryModal, setOpenInventoryModal] = useState(false)
  const [selectedInventory, setSelectedInventory] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)

  const removeInventory = (indexToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      inventory: prevData.inventory.filter(
        (_, index) => index !== indexToRemove
      ),
    }))
  }

  return (
    <div className='rounded-sm p-5 bg-stone-300'>
      <div className='mb-2'>
        <Button
          label={'Add Inventory'}
          onClick={() => {
            setIsEditMode(false)
            setSelectedInventory(null)
            setOpenInventoryModal(true)
          }}
        />
      </div>
      <div className='mb-3'>
        {formData.inventory.length > 0 && (
          <table className='w-full border-collapse shadow-lg'>
            <thead>
              <tr className='bg-blue-800 text-white'>
                <th className='p-2 border border-gray-300'>SL</th>
                <th className='p-2 border border-gray-300'>Size</th>
                <th className='p-2 border border-gray-300'>MRP</th>
                <th className='p-2 border border-gray-300'>Price</th>
                <th className='p-2 border border-gray-300'>Discount</th>
                <th className='p-2 border border-gray-300'>Stock</th>
                <th className='p-2 border border-gray-300 w-40'>
                  Minimum Quantity
                </th>
                <th className='p-2 border border-gray-300'>Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.inventory.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                >
                  <td className='p-2 border text-center uppercase border-gray-300'>
                    {index + 1}
                  </td>
                  <td className='p-2 border text-center uppercase border-gray-300'>
                    {item?.size?.name
                      ? item?.size?.name
                      : sizes.find((size) => size.id === item.size)?.name}
                  </td>
                  <td className='p-2 border text-center border-gray-300'>
                    {parseInt(item?.mrp)?.toFixed(2)}
                  </td>
                  <td className='p-2 border text-center border-gray-300'>
                    {parseInt(item?.price)?.toFixed(2)}
                  </td>
                  <td className='p-2 border text-center border-gray-300'>
                    {item?.discount}%
                  </td>
                  <td className='p-2 border text-center border-gray-300'>
                    {item?.stock}
                  </td>
                  <td className='p-2 border text-center border-gray-300'>
                    {item?.minQuantity}
                  </td>
                  <td className={`p-2 border border-gray-300 text-center`}>
                    <div className='flex justify-center items-center gap-5'>
                      <X
                        onClick={() => removeInventory(index)}
                        className='text-red-600 cursor-pointer'
                      />
                      <FilePen
                        className='cursor-pointer text-blue-700'
                        onClick={() => {
                          setIsEditMode(true)
                          setSelectedInventory(item)
                          setOpenInventoryModal(true)
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {openInventoryModal && (
        <InventoryModal
          isOpen={true}
          onClose={() => setOpenInventoryModal(false)}
          sizes={sizes}
          setFormData={setFormData}
          inventoryData={selectedInventory}
          isEditMode={isEditMode}
        />
      )}
    </div>
  )
}

export default InventorySection
