/* eslint-disable react/prop-types */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Button from '../../components/Button'
import axios from 'axios'
import { FilePen, Upload, X } from 'lucide-react'
import ImageCroper from '@/app/Components/ImageCroper'
import { enqueueSnackbar } from 'notistack'
import { uploadImageToCDN } from '../../../../../utils/uploadImageToCDN'
import AddDiscount from '../create-product/AddDiscount'
import SimilarProruct from './SimilarProruct'
import { useRouter } from 'next/navigation'
import EditInventoryModal from './EditInventoryModal'

const ProductForm = ({ formData, setFormData, type }) => {
  const [inventory, setInventory] = useState({
    size: { id: '', name: '' },
    mrp: 0,
    price: 0,
    stock: 0,
    discount: 100,
    minQuantity: 1,
  })
  const [selectedInventory, setSelectedInventory] = useState(null)
  const [editInventoryModalOpen, setEditInventoryModalOpen] = useState(false)
  const router = useRouter()
  const [images, setImages] = useState([])
  const [currentImage, setCurrentImage] = useState({
    blob: null,
    fileName: '',
    imageUrl: null,
    altText: '',
    color: '',
  })
  const [sizes, setSizes] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [allSubCategories, setAllSubCategories] = useState([])
  const [colors, setColors] = useState([])
  const [customerTypes, setCustomerTypes] = useState([])
  const [showImageCropper, setShowImageCropper] = useState(false)
  const [tagInputValue, setTagInputValue] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sizesRes, categoriesRes, colorsRes, customerTypesRes] =
          await Promise.all([
            axios.get('/api/admin/menu?type=sizes'),
            axios.get('/api/admin/menu?type=categories'),
            axios.get('/api/admin/menu?type=colors'),
            axios.get('/api/admin/menu?type=customer-types'),
          ])
        setSizes(sizesRes.data)
        setAllCategories(categoriesRes.data)
        setColors(colorsRes.data)
        setCustomerTypes(customerTypesRes.data)
      } catch (error) {
        console.error('Error fetching menu data', error)
      }
    }
    fetchData()
    fetchAllSubcategories()
  }, [])

  setTimeout(() => {
    console.log(allCategories)
  }, 4000)

  const uppercaseText = (text) => text.toUpperCase()

  const fetchAllSubcategories = async () => {
    try {
      const response = await axios.get('/api/admin/menu/sub-categories')
      setAllSubCategories(response.data)
    } catch (error) {
      console.log(error)
    }
  }

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
    } else if (name === 'color') {
      setCurrentImage((prev) => ({ ...prev, color: value }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: normalizedValue }))
    }

    console.log(formData)
  }

  const handleCategoryChange = (category) => {
    setFormData((prevProduct) => {
      const isSelected = prevProduct.categories.some(
        (c) => c.id === category.id
      )

      return {
        ...prevProduct,
        categories: isSelected
          ? prevProduct.categories.filter((c) => c.id !== category.id)
          : [...prevProduct.categories, category],
        subcategories: isSelected
          ? prevProduct.subcategories.filter(
              (sub) => sub.categoryId !== category.id
            )
          : prevProduct.subcategories,
      }
    })
  }

  const addInventory = () => {
    if (inventory.size.name === '') {
      enqueueSnackbar('Select a valid size', { variant: 'error' })
      return
    }

    if (inventory.mrp < 0 || inventory.price < 0 || inventory.stock < 0) {
      enqueueSnackbar('MRP, Price, and Stock cannot be negative values.', {
        variant: 'error',
      })
      return
    }

    const inventoryWithSizeId = {
      ...inventory,
      size: inventory.size,
    }

    setFormData((prevData) => ({
      ...prevData,
      inventory: [...prevData.inventory, inventoryWithSizeId],
    }))

    setInventory({ size: { id: '', name: '' }, mrp: 0, price: 0, stock: 0 })

    console.log(formData)
  }

  const removeInventory = (indexToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      inventory: prevData.inventory.filter(
        (_, index) => index !== indexToRemove
      ),
    }))
  }

  const handleFileChange = (blob, croppedImageUrl, name, imageAltText) => {
    if (croppedImageUrl) {
      setImages((prev) => [
        ...prev,
        {
          blob: blob,
          imageUrl: croppedImageUrl,
          color: currentImage.color,
          fileName: name,
          altText: imageAltText,
        },
      ])
      console.log(imageAltText)
      console.log(currentImage)
      setCurrentImage({
        blob: null,
        imageUrl: '',
        color: '',
        fileName: '',
        altText: '',
      })
    }
  }

  const removeCard = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleSubmit = async () => {
    console.log(formData)
    if (formData) return null
    try {
      setSaving(true)
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const imageUrl = await uploadImageToCDN(image.blob, image.fileName)
          return { color: image.color, imageUrl, altText: image.altText }
        })
      )

      const submissionData = { ...formData, images: uploadedImages }
      console.log(submissionData)

      const response = await axios.post('/api/products/add', submissionData)
      enqueueSnackbar(response.data.message, { variant: 'success' })
      router.push('/admin_/products/product-list')
    } catch (error) {
      console.error('Error submitting product', error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handlEditSubmit = async () => {
    console.log(formData)
    try {
      setSaving(true)
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const imageUrl = await uploadImageToCDN(image.blob, image.fileName)
          return { color: image.color, imageUrl, altText: image.altText }
        })
      )

      const submissionData = {
        ...formData,
        images: uploadedImages,
      }

      const response = await axios.patch('/api/products/update', submissionData)
      enqueueSnackbar(response.data.message, { variant: 'success' })

      router.push('/admin_/products/product-list')
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleTagInputChange = (e) => {
    setTagInputValue(e.target.value)
  }

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInputValue.trim() !== '') {
      const newTag = tagInputValue.toLowerCase()

      // Update the formData.tags array
      setFormData((prevFormData) => ({
        ...prevFormData,
        tags: [...(prevFormData.tags || []), newTag],
      }))

      setTagInputValue('')
      e.preventDefault()
    }
  }

  const handleRemoveTag = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.filter((_, i) => i !== index),
    }))
  }

  const handleSubcategoryChange = (subcategory) => {
    const isSelected = formData.subcategories.some(
      (sub) => sub.id === subcategory.id
    )

    if (isSelected) {
      // Deselect subcategory
      setFormData((prev) => ({
        ...prev,
        subcategories: prev.subcategories.filter(
          (sub) => sub.id !== subcategory.id
        ),
      }))
    } else {
      // Select subcategory
      setFormData((prev) => ({
        ...prev,
        subcategories: [...prev.subcategories, subcategory],
      }))
    }
  }

  return (
    <div className='p-7 rounded-[4px]'>
      <Section className={'grid grid-cols-4'}>
        <Input
          type='text'
          label='Product Title'
          placeholder='Enter product title'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
        {/* <Select
          label='Select Type'
          name='customerTypeId'
          value={formData.customerTypeId}
          onChange={handleChange}
        >
          <option value=''>Select a customer type</option>
          {customerTypes.map((type) => (
            <option
              key={type.id}
              value={type.id}
              defaultValue={formData.customerTypeId === type.id}
            >
              {uppercaseText(type.name)}
            </option>
          ))}
        </Select> */}

        <Select
          label='Returnable'
          name='isReturnable'
          value={formData.isReturnable}
          onChange={handleChange}
        >
          <option value={false}>Product is not returnable</option>
          <option value={true}>Product is returnable</option>
        </Select>

        <Input
          type={'number'}
          name={'estimatedDeliveryDay'}
          label={'Estimated delivery days'}
          placeholder={'Enter days'}
          value={formData.estimatedDeliveryDay}
          onChange={handleChange}
        />
        <Input
          type={'number'}
          name={'displayPrice'}
          label={'Display Price'}
          placeholder={'Enter amount'}
          value={formData.displayPrice}
          onChange={handleChange}
        />
      </Section>

      <Devider />

      <Section>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-3'>
            <label>Categories:</label>
            <div className='flex gap-4 flex-wrap'>
              {allCategories?.map((category) => (
                <div
                  key={category.id}
                  className='capitalize flex gap-1 items-center text-sm'
                >
                  <input
                    type='checkbox'
                    id={category.id}
                    value={category.id}
                    checked={formData.categories.some(
                      (c) => c.id === category.id
                    )}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category.id}>{category.name}</label>
                </div>
              ))}
            </div>
          </div>
          {formData.categories.map((categoryId) => {
            const subcategories = allSubCategories.filter(
              (sub) => sub.categoryId === categoryId.id
            )

            return (
              <div key={categoryId} className='flex items-center gap-3'>
                <label>
                  Subcategories for{' '}
                  <span className='capitalize'>
                    {allCategories.find((c) => c.id === categoryId.id)?.name}
                  </span>
                  :
                </label>
                <div className='flex gap-4 flex-wrap'>
                  {subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className='capitalize flex gap-1 items-center text-sm'
                    >
                      <input
                        type='checkbox'
                        id={subcategory.id}
                        value={subcategory.id}
                        checked={formData.subcategories.some(
                          (sub) => sub.id === subcategory.id
                        )}
                        onChange={() => handleSubcategoryChange(subcategory)}
                      />
                      <label htmlFor={subcategory.id}>{subcategory.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      <Devider />

      <div className='mb-3'>
        {formData.inventory.length > 0 && (
          <table className='w-full border-collapse shadow-lg'>
            <thead>
              <tr className='bg-blue-800 text-white'>
                <th className='p-2 border border-gray-300'>SL</th>
                <th className='p-2 border border-gray-300'>Size</th>
                <th className='p-2 border border-gray-300'>MRP</th>
                <th className='p-2 border border-gray-300'>Price</th>
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
                    {item.mrp}
                  </td>
                  <td className='p-2 border text-center border-gray-300'>
                    {item.price}
                  </td>
                  <td className='p-2 border text-center border-gray-300'>
                    {item.stock}
                  </td>
                  <td className='p-2 border text-center border-gray-300'>
                    {item.minQuantity}
                  </td>
                  <td className={`p-2 border border-gray-300 text-center`}>
                    <div className='flex justify-center items-center gap-3'>
                      <X
                        onClick={() => removeInventory(index)}
                        className='text-red-600 cursor-pointer'
                      />
                      {/* <FilePen
                        onClick={() => {
                          setSelectedInventory(item)
                          setEditInventoryModalOpen(true)
                        }}
                        size={20}
                        className='text-blue-800 cursor-pointer'
                      /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Section className={'grid grid-cols-4'}>
        <Select
          label='Select size'
          name='size'
          value={inventory.size.id}
          onChange={handleChange}
        >
          <option value=''>Select size</option>
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
        <div className='flex items-center'>
          <button
            onClick={addInventory}
            className='p-[7px] px-5 bg-blue-800 rounded-sm text-white'
          >
            Add
          </button>
          {/* <Button label='Add' onClick={addInventory} /> */}
        </div>
      </Section>

      <Devider />

      <Section>
        <div>
          <div>
            {/* Display selected color and image in a single card */}
            <div className='mb-4 flex flex-wrap gap-5'>
              {formData.images.length > 0 &&
                formData.images.map((img, index) => (
                  <div
                    key={index}
                    className='border border-slate-700 rounded-md flex items-center justify-between'
                  >
                    <div className='border relative rounded-md'>
                      {/* Display Image */}
                      {img.imageUrl && (
                        <img
                          src={img.imageUrl}
                          alt='Selected Product'
                          className='w-40 object-cover'
                        />
                      )}
                      {/* Display Color */}
                      {img.color && (
                        <div
                          className={`w-full h-5`}
                          style={{
                            backgroundColor: img.color.code,
                          }}
                        ></div>
                      )}
                      {img.altText && (
                        <p className='text-xs text-center py-1'>
                          <span className='font-bold'>Alt:</span> {img.altText}
                        </p>
                      )}
                      <div className='absolute top-5 right-5'>
                        {/* Remove Button */}
                        <Button
                          label='Remove'
                          variant='error'
                          onClick={() => removeCard(index)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              {images.length > 0 &&
                images.map((img, index) => (
                  <div
                    key={index}
                    className='border border-slate-700 rounded-md flex items-center justify-between'
                  >
                    <div className='border relative rounded-md'>
                      {/* Display Image */}
                      {img.imageUrl && (
                        <img
                          src={img.imageUrl}
                          alt='Selected Product'
                          className='w-40 object-cover'
                        />
                      )}
                      {/* Display Color */}
                      {img.color && (
                        <div
                          className={`w-full h-5`}
                          style={{
                            backgroundColor: colors.find(
                              (color) => color.id === img.color
                            )?.code,
                          }}
                        ></div>
                      )}
                      {img.altText && (
                        <p className='text-xs text-center py-1'>
                          <span className='font-bold'>Alt:</span> {img.altText}
                        </p>
                      )}
                      <div className='absolute top-5 right-5'>
                        {/* Remove Button */}
                        <Button
                          label='Remove'
                          variant='error'
                          onClick={() => removeCard(index)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className='flex gap-10'>
            <Select
              label='Select color of the image'
              name='color'
              value={currentImage.color}
              onChange={handleChange}
            >
              <option value=''>Select a color</option>
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {uppercaseText(color.name)}
                </option>
              ))}
            </Select>
            {currentImage.color && (
              <div className='flex flex-col gap-1'>
                <label htmlFor='Upload Image'>Upload Image</label>
                <button
                  onClick={() => setShowImageCropper(true)}
                  className='flex gap-2 items-center justify-center p-[7px] px-4 rounded-sm text-white bg-blue-800'
                >
                  <Upload size={20} />
                  Upload image
                </button>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Devider />

      <Section>
        <TextArea
          label='Enter summary'
          placeholder='Enter here ...'
          rows={3}
          name='summary'
          value={formData.summary}
          onChange={handleChange}
        />
      </Section>

      <Devider />

      <Section>
        <TextArea
          label='Enter description'
          placeholder='Enter here ...'
          rows={3}
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
      </Section>

      <Devider />

      <Section>
        <TextArea
          label='Enter Return Policy'
          placeholder='Enter here ...'
          rows={3}
          name='returnPolicy'
          value={formData.returnPolicy}
          onChange={handleChange}
        />
      </Section>

      <Devider />

      <Section>
        <TextArea
          id='tags'
          label={'Add Tags'}
          placeholder='Write and hit enter ...'
          rows={3}
          name='tags'
          value={tagInputValue}
          onChange={handleTagInputChange}
          onKeyDown={handleAddTag}
        />
      </Section>
      <div className='flex flex-wrap gap-2 py-2'>
        {formData.tags.length > 0 &&
          formData.tags.map((tag, index) => (
            <div
              key={index}
              className='flex gap-2 items-center rounded-sm p-1 px-2 bg-gray-300'
            >
              <span>{tag}</span>
              <X
                size={16}
                onClick={() => handleRemoveTag(index)}
                className='text-red-500 cursor-pointer hover:text-red-600 hover:scale-110'
              />
            </div>
          ))}
      </div>

      <Devider />

      <Section>
        <TextArea
          label='Enter Long Tail Keyword'
          placeholder='Enter here ...'
          rows={3}
          name='longTailKeyword'
          value={formData.longTailKeyword}
          onChange={handleChange}
        />
      </Section>

      <Devider />

      <div>
        <SimilarProruct
          formData={formData}
          setFormData={setFormData}
          categories={allCategories}
          customerTypes={customerTypes}
          colors={colors}
        />
      </div>

      <Devider />

      <AddDiscount formData={formData} setFormData={setFormData} />
      {/* <div>
        <div className='mt-3'>
          {formData.discounts?.length > 0 && (
            <div>
              <ul className=' bg-green-600 text-white rounded-md'>
                {formData.discounts.map((id, index) => {
                  const discount = discounts.find(
                    (discount) => discount.id === id
                  )
                  return discount ? (
                    <li
                      key={id}
                      className={`grid grid-cols-5 py-2 px-3 ${
                        index % 2 === 0 ? 'bg-green-800' : 'bg-green-600'
                      }`}
                    >
                      <span className='uppercase'>{discount.code}</span>
                      <span>{discount.description}</span>
                      <span>{discount.type}</span>
                      <span>{discount.amount}</span>
                    </li>
                  ) : null
                })}
              </ul>
            </div>
          )}
        </div>
      </div> */}

      <Devider />

      <Section>
        <Button
          loading={saving}
          loadingText={'Saving...'}
          onClick={type === 'edit' ? handlEditSubmit : handleSubmit}
          label='Save Product'
        />
      </Section>

      {showImageCropper && (
        <ImageCroper
          isOpen={true}
          onClose={() => setShowImageCropper(false)}
          onCropComplete={handleFileChange}
        />
      )}

      {editInventoryModalOpen && (
        <EditInventoryModal
          isOpen={true}
          onClose={() => setEditInventoryModalOpen(false)}
          item={selectedInventory}
          formData={formData}
          setFormData={setFormData}
          sizes={sizes}
        />
      )}
    </div>
  )
}

export default ProductForm

// eslint-disable-next-line react/prop-types
const Input = ({ label, type, onChange, value, name, placeholder, width }) => {
  return (
    <div className={`flex flex-col gap-1 ${width && width}`}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
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

// eslint-disable-next-line react/prop-types

const TextArea = ({
  label,
  rows = 1,
  onChange,
  name,
  value,
  placeholder,
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

// eslint-disable-next-line react/prop-types
const Select = ({ label, onChange, name, children }) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={label}>{label}</label>
      <select
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

// eslint-disable-next-line react/prop-types
const Section = ({ children, className }) => {
  return (
    <section className={`${className} flex w-full items-end gap-6`}>
      {children}
    </section>
  )
}

const Devider = () => {
  return <div className='h-[1px] bg-slate-300 my-7 w-full' />
}
