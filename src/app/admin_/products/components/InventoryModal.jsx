/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@/app/Components/CustomModal'
import React, { useState, useEffect } from 'react'
import Section from './Section'
import Select from './Select'
import { enqueueSnackbar } from 'notistack'
import Input from './Input'

const InventoryModal = ({
  isOpen,
  onClose,
  sizes,
  setFormData,
  isEditMode,
  inventoryData,
}) => {
  const uppercaseText = (text) => text.toUpperCase()
  console.log(sizes)

  const [inventory, setInventory] = useState({
    size: { id: '', name: '' },
    mrp: 0,
    price: 0,
    stock: 1,
    discount: 0,
    minQuantity: 1,
  })

  useEffect(() => {
    if (isEditMode && inventoryData) {
      setInventory({
        ...inventoryData,
        size: sizes.find((size) => size.id === inventoryData.size.id) || {
          id: '',
          name: '',
        },
      })
    }
  }, [isEditMode, inventoryData, sizes])

  const handleChange = (e) => {
    const { name, value } = e.target

    const normalizeNumber = (val) => (isNaN(val) ? val : String(Number(val)))

    const calculateDiscountFromPrice = (mrp, price) => {
      if (mrp && price) {
        const discountPrice = (price / mrp) * 100
        const roundedDiscount =
          discountPrice % 1 >= 0.5
            ? Math.ceil(discountPrice)
            : Math.floor(discountPrice)
        return 100 - roundedDiscount
      }
      return 0
    }

    if (
      ['size', 'mrp', 'price', 'discount', 'stock', 'minQuantity'].includes(
        name
      )
    ) {
      if (name === 'size') {
        const selectedSize = sizes.find((size) => size.id === value)
        setInventory((prev) => ({ ...prev, size: selectedSize }))
      } else if (name === 'mrp') {
        const updatedDiscount = calculateDiscountFromPrice(
          value,
          inventory.price
        )
        setInventory((prev) => ({
          ...prev,
          [name]: normalizeNumber(value),
          discount: updatedDiscount,
        }))
      } else if (name === 'price') {
        const updatedDiscount = calculateDiscountFromPrice(inventory.mrp, value)
        setInventory((prev) => ({
          ...prev,
          [name]: normalizeNumber(value),
          discount: updatedDiscount,
        }))
      } else {
        setInventory((prev) => ({ ...prev, [name]: normalizeNumber(value) }))
      }
    }
  }

  const handleSubmit = () => {
    if (inventory.size.name === '') {
      enqueueSnackbar('Select a valid size', { variant: 'error' })
      return
    }

    if (inventory.stock === 0) {
      enqueueSnackbar('Enter a valid stock.', { variant: 'error' })
      return
    }

    if (inventory.minQuantity === 0) {
      enqueueSnackbar('Enter a valid minimum quantity.', { variant: 'error' })
      return
    }

    if (inventory.mrp <= 0 || inventory.price <= 0 || inventory.stock < 0) {
      enqueueSnackbar('MRP, Price, and Stock cannot be negative values.', {
        variant: 'error',
      })
      return
    }

    if (isEditMode) {
      setFormData((prevData) => ({
        ...prevData,
        inventory: prevData.inventory.map((item) =>
          item.id === inventory.id ? inventory : item
        ),
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        inventory: [...prevData.inventory, inventory],
      }))
    }

    resetForm()
    onClose()
  }

  const resetForm = () => {
    setInventory({
      size: { id: '', name: '' },
      mrp: 0,
      price: 0,
      stock: 1,
      discount: 0,
      minQuantity: 1,
    })
  }

  return (
    <Modal size={'3xl'} isOpen={isOpen}>
      <ModalHeader>
        {isEditMode ? 'Edit Inventory' : 'Add Inventory'}
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <div>
          <Section className={'grid grid-cols-4'}>
            <Select
              label='Select size'
              name='size'
              value={inventory.size.id}
              onChange={handleChange}
            >
              {!isEditMode && <option value=''>Select size</option>}
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {uppercaseText(size.name)}
                </option>
              ))}
            </Select>
            <Input
              label='Enter MRP'
              type='number'
              placeholder='Enter MRP'
              name='mrp'
              value={inventory.mrp}
              onChange={handleChange}
            />
            <Input
              label='Enter Price'
              type='number'
              placeholder='Enter Price'
              name='price'
              value={inventory.price}
              onChange={handleChange}
            />
            <Input
              label='Enter Discount Price (%)'
              type='number'
              placeholder='Discount'
              name='discount'
              value={inventory.discount}
              disabled={true}
              onChange={handleChange}
            />
            <Input
              label='Enter Stock'
              type='number'
              placeholder='Enter Stock'
              name='stock'
              value={inventory.stock}
              onChange={handleChange}
            />
            <Input
              label='Enter Minimum Quantity'
              type='number'
              placeholder='Enter number'
              name='minQuantity'
              value={inventory.minQuantity}
              onChange={handleChange}
            />
            <div className='flex items-center'>
              <button
                onClick={handleSubmit}
                className='p-[7px] px-5 bg-blue-800 rounded-sm text-white'
              >
                {isEditMode ? 'Update' : 'Add'}
              </button>
            </div>
          </Section>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default InventoryModal
