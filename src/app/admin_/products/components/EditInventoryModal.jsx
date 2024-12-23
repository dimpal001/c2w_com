/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@/app/Components/CustomModal'
import React, { useState } from 'react'
import Section from '../../components/Section'
import { Input, Select } from './SimilarProruct'

const EditInventoryModal = ({ isOpen, onClose, item, setFormData, sizes }) => {
  const [inventory, setInventory] = useState({
    size: { id: item.size.id, name: item.size.name },
    mrp: item.mrp,
    price: item.price,
    stock: item.stock,
    discount: item.discount,
    minQuantity: item.minQuantity,
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    const normalizedValue = name === 'isReturnable' ? value === 'true' : value

    const normalizeNumber = (val) => (isNaN(val) ? val : String(Number(val)))

    const calculatePriceFromDiscount = (mrp, discount) => {
      if (mrp && discount) {
        return (mrp * discount) / 100
      }
      return mrp
    }

    const calculateDiscountFromPrice = (mrp, price) => {
      if (mrp && price) {
        return ((mrp - price) / mrp) * 100
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
        const updatedPrice = calculatePriceFromDiscount(
          value,
          inventory.discount
        )
        setInventory((prev) => ({
          ...prev,
          [name]: normalizeNumber(value),
          price: updatedPrice,
        }))
      } else if (name === 'discount') {
        const updatedPrice = calculatePriceFromDiscount(inventory.mrp, value)
        setInventory((prev) => ({
          ...prev,
          [name]: [value],
          price: updatedPrice,
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
    } else {
      setFormData((prev) => ({ ...prev, [name]: normalizedValue }))
    }
  }

  return (
    <Modal size={'2xl'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          Edit Inventory
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <Section className={'grid grid-cols-3'}>
            <Select
              label='Select size'
              name='size'
              value={inventory.size.id}
              onChange={handleChange}
            >
              <option value=''>Select size</option>
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.name}
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
              label='Enter Discount Price'
              type='number'
              placeholder='Enter Price'
              name='discount'
              value={inventory.discount}
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
              label='Enter Stock'
              type='number'
              placeholder='Enter Stock'
              name='stock'
              value={inventory.stock}
              onChange={handleChange}
            />
            <Input
              label='Enter Minimum Qiantity'
              type='number'
              placeholder='Enter number'
              name='minQuantity'
              value={inventory.minQuantity}
              onChange={handleChange}
            />
          </Section>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditInventoryModal
