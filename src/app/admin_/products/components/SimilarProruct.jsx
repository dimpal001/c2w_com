/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@/app/Components/CustomModal'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { CircleCheckBig, X } from 'lucide-react'

const SimilarProruct = ({
  formData,
  setFormData,
  categories,
  customerTypes,
  colors,
}) => {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [customerTypeId, setCustomerTypeId] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [color, setColor] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchProducts = async () => {
    try {
      const params = {
        searchQuery,
        categoryId,
        customerTypeId,
        minPrice,
        maxPrice,
        color,
        page: 1,
      }
      const response = await axios.get(`/api/products/get/filter`, { params })
      setProducts(response.data.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [searchQuery, categoryId, customerTypeId, minPrice, maxPrice, color])

  const handleSelectProduct = (product) => {
    setFormData((prev) => {
      const isSelected = prev.similarProducts.some(
        (item) => item.id === product.id
      )

      if (isSelected) {
        // Remove product
        return {
          ...prev,
          similarProducts: prev.similarProducts.filter(
            (item) => item.id !== product.id
          ),
        }
      } else {
        // Add product
        return {
          ...prev,
          similarProducts: [...prev.similarProducts, product],
        }
      }
    })
  }

  const handleRemoveClick = (product) => {
    setFormData((prev) => {
      // Remove product
      return {
        ...prev,
        similarProducts: prev.similarProducts.filter(
          (item) => item.id !== product.id
        ),
      }
    })
  }

  return (
    <div>
      <div>
        <Button
          onClick={() => setIsModalOpen(true)}
          label={'Add similar products'}
        />
        <div className='py-2'>
          <p>You can add upto 6 products.</p>
        </div>
        <div className=' grid grid-cols-5 gap-2'>
          {formData.similarProducts.length > 0 &&
            formData.similarProducts.map((product) => (
              <SimilarProductCard
                key={product.id}
                product={product}
                onRemove={() => handleRemoveClick(product)}
              />
            ))}
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={true} size={'6xl'}>
          <ModalHeader>
            Add similar style products{' '}
            <ModalCloseButton onClick={() => setIsModalOpen(false)} />
          </ModalHeader>
          <ModalBody>
            <div className='max-h-[400px]'>
              {/* Search and filter inputs */}
              <div>
                <div className='flex p-3 flex-wrap gap-2'>
                  <Input
                    type='text'
                    placeholder='Search query'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Select
                    onChange={(e) => setCategoryId(e.target.value)}
                    name='category'
                  >
                    <option value=''>Select Category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                  <Select
                    onChange={(e) => setCustomerTypeId(e.target.value)}
                    name='customerType'
                  >
                    <option value=''>Select Customer Type</option>
                    {customerTypes?.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                  <Select
                    onChange={(e) => setColor(e.target.value)}
                    name='color'
                  >
                    <option value=''>Select Color</option>
                    {colors?.map((colorOption) => (
                      <option key={colorOption.id} value={colorOption.id}>
                        {colorOption.name.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                  <Input
                    small={true}
                    type='number'
                    placeholder='Min Price'
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <Input
                    small={true}
                    type='number'
                    placeholder='Max Price'
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Product list */}
              <div className='min-h-20 grid grid-cols-5 py-3 gap-2'>
                {products.length > 0 &&
                  products.map((product) => (
                    <SimilarProductCard
                      key={product.id}
                      product={product}
                      onSelect={() => handleSelectProduct(product)}
                      isSelected={
                        formData?.similarProducts?.length > 0 &&
                        formData?.similarProducts?.some(
                          (item) => item.id === product.id
                        )
                      }
                      similarProducts={formData.similarProducts}
                      isChecked={true}
                    />
                  ))}
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  )
}

export const SimilarProductCard = ({
  product,
  onSelect,
  isSelected,
  similarProducts,
  isChecked,
  onRemove,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer relative border rounded-md shadow-md ${
        isSelected ? 'border-blue-600 bg-blue-100' : 'border-gray-300 bg-white'
      } hover:shadow-lg transition-transform transform`}
    >
      <img
        src={product.thumbnailUrl}
        alt={product.title}
        className='object-cover h-36 w-full rounded-t-md'
      />
      <div className='flex flex-col p-2'>
        <h3 className=' text-gray-800'>{product?.title?.slice(0, 20)}</h3>
        <p className='text-blue-800 text-xs mt-1'>
          Price: {product?.displayPrice}
        </p>
        {isSelected && (
          <CircleCheckBig
            strokeWidth={3}
            className='text-green-500 absolute bottom-2 right-2'
            size={25}
          />
        )}
        {isChecked && (
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={isSelected || similarProducts.includes(product.id)}
              onChange={(e) => {
                e.stopPropagation()
                onSelect()
              }}
              className='mr-2 cursor-pointer hidden'
            />
            <span className='text-sm text-blue-800 hidden'>Select Product</span>
          </div>
        )}
        {!isChecked && (
          <X
            className='text-red-600 absolute cursor-pointer bottom-3 right-3'
            onClick={onRemove}
          />
        )}
      </div>
    </div>
  )
}

export default SimilarProruct

export const Input = ({
  className,
  label,
  type,
  onChange,
  value,
  name,
  placeholder,
  small,
  onKeyDown,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        onKeyDown={onKeyDown}
        name={name}
        type={type ? type : 'text'}
        onChange={onChange}
        value={value}
        className={`${className} px-2 py-[6px] ${
          small && 'max-w-28'
        } border focus:outline-none text-blue-800 focus:border-blue-800 border-slate-500 rounded-sm`}
        placeholder={placeholder}
      />
    </div>
  )
}

export const Select = ({ label, onChange, name, children, className }) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={label}>{label}</label>
      <select
        className={`${className} px-3 py-[7px] text-blue-800 border bg-white focus:outline-none focus:border-blue-800 border-slate-500 rounded-sm `}
        name={name}
        id={label}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  )
}
