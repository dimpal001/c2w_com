/* eslint-disable react/prop-types */
'use client'

import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import axios from 'axios'
import { Loader2, Upload, X } from 'lucide-react'
import ImageCroper from '@/app/Components/ImageCroper'
import { enqueueSnackbar } from 'notistack'
import { uploadImageToCDN } from '../../../../../utils/uploadImageToCDN'
import AddDiscount from '../create-product/AddDiscount'
import SimilarProruct from './SimilarProruct'
import { useRouter } from 'next/navigation'
import { deleteImageFromCDN } from '../../../../../utils/deleteImageFromCDN'
import { cdnPath } from '@/app/Components/cdnPath'
import Devider from './Devider'
import Section from './Section'
import Select from './Select'
import TextArea from './TextArea'
import Input from './Input'
import SizeChartSection from './SizeChartSection'
import CustomEditor from './CustomEditor'
import InventorySection from './InventorySection'

const ProductForm = ({
  formData,
  setFormData,
  type,
  thumbnailImage,
  handleSetThumbnail,
  imageSetting,
}) => {
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
  const [fabrics, setFabrics] = useState([])
  const [imagesToDelete, setImagesToDelete] = useState([])
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
        const [
          sizesRes,
          fabricsRes,
          categoriesRes,
          colorsRes,
          customerTypesRes,
        ] = await Promise.all([
          axios.get('/api/admin/menu?type=sizes'),
          axios.get('/api/admin/menu?type=fabrics'),
          axios.get('/api/admin/menu?type=categories'),
          axios.get('/api/admin/menu?type=colors'),
          axios.get('/api/admin/menu?type=customer-types'),
        ])
        setSizes(sizesRes.data)
        setFabrics(fabricsRes.data)
        setAllCategories(categoriesRes.data)
        setColors(colorsRes.data)
        setCustomerTypes(customerTypesRes.data)
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data?.message || 'Failed to handle task!'
        )
      }
    }
    fetchData()
    fetchAllSubcategories()
  }, [])

  const uppercaseText = (text) => text.toUpperCase()

  const fetchAllSubcategories = async () => {
    try {
      const response = await axios.get('/api/admin/menu/sub-categories')
      setAllSubCategories(response.data)
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to handle task!'
      )
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    const normalizedValue = name === 'isReturnable' ? value === 'true' : value

    if (name === 'customerTypeId') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    } else if (name === 'color') {
      setCurrentImage((prev) => ({ ...prev, color: value }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: normalizedValue }))
    }
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

  const removeFormDataCard = (indexToRemove, image) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter((_, index) => index !== indexToRemove),
    }))
    setImagesToDelete((prev) => [...prev, image.imageUrl])
  }

  const handleSubmit = async () => {
    if (formData.userId === '' || formData.userId === null) {
      enqueueSnackbar(
        'Unfortunately, you have been logged out for some reason. Please log in again in the same browser session.',
        { variant: 'error' }
      )
      return
    }

    if (formData.title === '') {
      enqueueSnackbar('Add the title', { variant: 'error' })
      return
    }
    if (formData.estimatedDeliveryDay === 0) {
      enqueueSnackbar('Add a valid estimated delivery days', {
        variant: 'error',
      })
      return
    }
    if (formData.displayPrice === 0) {
      enqueueSnackbar('Add a valid display price', {
        variant: 'error',
      })
      return
    }
    if (formData.customerTypeId === '') {
      enqueueSnackbar('Select a customer type', {
        variant: 'error',
      })
      return
    }
    if (formData.categories.length === 0) {
      enqueueSnackbar('Select a category', {
        variant: 'error',
      })
      return
    }
    if (formData.inventory.length === 0) {
      enqueueSnackbar('Add an inventory', {
        variant: 'error',
      })
      return
    }
    if (images.length === 0) {
      enqueueSnackbar('Add an image', {
        variant: 'error',
      })
      return
    }
    if (formData.summary === '') {
      enqueueSnackbar('Enter summary', {
        variant: 'error',
      })
      return
    }
    if (formData.description === '') {
      enqueueSnackbar('Enter description', {
        variant: 'error',
      })
      return
    }

    try {
      setSaving(true)
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const imageUrl = await uploadImageToCDN(image.blob, image.fileName)
          return { color: image.color, imageUrl, altText: image.altText }
        })
      )

      const submissionData = { ...formData, images: uploadedImages }

      const response = await axios.post('/api/products/add', submissionData)
      enqueueSnackbar(response.data.message, { variant: 'success' })
      router.push('/admin_/products/product-list')
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handlEditSubmit = async () => {
    if (formData.title === '') {
      enqueueSnackbar('Add the title', { variant: 'error' })
      return
    }
    if (formData.estimatedDeliveryDay === 0) {
      enqueueSnackbar('Add a valid estimated delivery days', {
        variant: 'error',
      })
      return
    }
    if (formData.displayPrice === 0) {
      enqueueSnackbar('Add a valid display price', {
        variant: 'error',
      })
      return
    }
    if (formData.customerTypeId === '') {
      enqueueSnackbar('Select a customer type', {
        variant: 'error',
      })
      return
    }
    if (formData.categories.length === 0) {
      enqueueSnackbar('Select a category', {
        variant: 'error',
      })
      return
    }
    if (formData.inventory.length === 0) {
      enqueueSnackbar('Add an inventory', {
        variant: 'error',
      })
      return
    }
    if (images.length === 0 && formData.images.length === 0) {
      enqueueSnackbar('Add an image', {
        variant: 'error',
      })
      return
    }
    if (formData.summary === '') {
      enqueueSnackbar('Enter summary', {
        variant: 'error',
      })
      return
    }
    if (formData.description === '') {
      enqueueSnackbar('Enter description', {
        variant: 'error',
      })
      return
    }

    await Promise.all(
      imagesToDelete.map(async (image) => {
        await deleteImageFromCDN(image)
      })
    )

    try {
      setSaving(true)

      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const imageUrl = await uploadImageToCDN(image.blob, image.fileName)
          return { color: image.color, imageUrl, altText: image.altText }
        })
      )

      const existingImages = (formData.images || []).map((image) => ({
        ...image,
        color: image.colorId,
      }))

      const allImages = [...existingImages, ...uploadedImages]

      const submissionData = {
        ...formData,
        images: allImages,
      }

      const response = await axios.patch('/api/products/update', submissionData)
      enqueueSnackbar(response.data.message, { variant: 'success' })

      router.push('/admin_/products/product-list')
    } catch (error) {
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
      setFormData((prev) => ({
        ...prev,
        subcategories: [...prev.subcategories, subcategory],
      }))
    }
  }

  return (
    <div className='rounded-[4px]'>
      <Section className={'grid grid-cols-4 p-5 rounded-sm bg-stone-300'}>
        <Input
          type='text'
          label='Product Title'
          placeholder='Enter product title'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />

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

      <Section className={'rounded-sm bg-stone-300 p-5'}>
        <div>
          <div className='flex items-center gap-5'>
            <Select
              label='Select A Fabric '
              name='fabricId'
              defaultValue={formData?.fabricId}
              value={formData?.fabricId}
              onChange={handleChange}
            >
              <option value=''>Select A Fabric</option>
              {fabrics.map((fabric) => (
                <option key={fabric?.id} value={fabric?.id}>
                  {fabric?.name}
                </option>
              ))}
            </Select>
            <Select
              label='Select Customer Type'
              name='customerTypeId'
              defaultValue={formData.customerTypeId}
              value={formData.customerTypeId}
              onChange={handleChange}
            >
              <option value=''>Select Customer Type</option>
              {customerTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {uppercaseText(type.name)}
                </option>
              ))}
            </Select>
            <Select
              label='COD Available'
              name='isCODAvailable'
              value={formData?.isCODAvailable || false}
              onChange={handleChange}
            >
              <option value={false}>COD not available</option>
              <option value={true}>COD available</option>
            </Select>
            <Input
              type={'text'}
              name={'sellerCode'}
              label={'Enter Seller Code'}
              placeholder={'Enter code'}
              value={formData?.sellerCode}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className='flex items-center gap-3 mt-3'>
              <label>Categories:</label>
              <div className='flex gap-4 flex-wrap'>
                {allCategories?.map((category) => (
                  <div
                    key={category.id}
                    className='capitalize flex gap-1 py-1 items-center text-sm'
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
            {formData?.categories.map((categoryId) => {
              const subcategories = allSubCategories.filter(
                (sub) => sub.categoryId === categoryId.id
              )

              return (
                <div key={categoryId} className='flex items-center py-1 gap-3'>
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
                        <label htmlFor={subcategory.id}>
                          {subcategory.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      <Devider />

      <InventorySection
        formData={formData}
        setFormData={setFormData}
        sizes={sizes}
      />

      <Devider />

      <div className='p-5 bg-stone-300 rounded-sm'>
        <SizeChartSection
          formData={formData}
          setFormData={setFormData}
          categories={allCategories}
          customerTypes={customerTypes}
          colors={colors}
        />
      </div>

      <Devider />

      <Section className={'rounded-sm p-5 bg-stone-300'}>
        <div>
          <div>
            {/* Display selected color and image in a single card */}
            <div className='mb-4 grid grid-cols-5 gap-5'>
              {formData.images.length > 0 &&
                formData.images.map((img, index) => (
                  <div
                    key={index}
                    className='border border-slate-700 rounded-lg overflow-hidden max-w-xs mx-auto mb-4 shadow-md transition-transform transform hover:scale-105'
                  >
                    <div className='relative max-w-[220px] flex flex-col justify-between h-full bg-white'>
                      {/* Display Image */}
                      {img.imageUrl && (
                        <img
                          src={cdnPath + img.imageUrl}
                          alt='Selected Product'
                          className='w-[220px] h-auto object-cover rounded-t-lg'
                        />
                      )}

                      <div className='p-3'>
                        {/* Color Name and Color Code */}
                        {img.color && (
                          <div className='flex items-center gap-2 mb-2'>
                            <div
                              className='w-6 h-6 rounded-full'
                              style={{
                                backgroundColor:
                                  img.color.slug === 'multicolor'
                                    ? 'transparent'
                                    : img.color.code,
                                background:
                                  img.color.slug === 'multicolor'
                                    ? 'linear-gradient(to right, #dc2626, #2563eb, #16a34a)'
                                    : img.color.code,
                              }}
                            ></div>
                            <span className='text-sm capitalize font-medium'>
                              {img.color.name}
                            </span>
                          </div>
                        )}

                        {/* Alt Text */}
                        <p className='text-xs text-gray-600 overflow-scroll scrollbar-hide text-nowrap'>
                          <span className='font-bold text-blue-700'>Alt:</span>{' '}
                          {img.altText}
                        </p>

                        {/* Set Thumbnail Button */}
                        <div className='mt-3'>
                          <button
                            onClick={() => handleSetThumbnail(img.imageUrl)}
                            disabled={thumbnailImage === img.imageUrl}
                            className={`w-full p-2 rounded-lg text-white ${
                              thumbnailImage === img.imageUrl
                                ? 'bg-gray-600'
                                : 'bg-blue-700'
                            } flex items-center justify-center gap-2`}
                          >
                            {thumbnailImage === img.imageUrl ? (
                              'Thumbnail'
                            ) : imageSetting ? (
                              <Loader2 className='animate-spin w-5 h-5' />
                            ) : (
                              'Set Thumbnail'
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <div className='absolute top-2 right-2 flex items-center gap-2'>
                        <X
                          onClick={() => removeFormDataCard(index, img)}
                          className='text-red-500 cursor-pointer hover:w-10 hover:h-10 transition-all duration-300 w-8 h-8'
                          strokeWidth={3}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              {images.length > 0 &&
                images.map((img, index) => (
                  <div
                    key={index}
                    className='border border-slate-700 rounded-lg overflow-hidden max-w-xs mx-auto mb-4 shadow-md transition-transform transform hover:scale-105'
                  >
                    <div className='relative flex max-w-[220px] flex-col justify-between h-full bg-white'>
                      {/* Display Image */}
                      {img.imageUrl && (
                        <img
                          src={img.imageUrl}
                          alt='Selected Product'
                          className='w-[220px] h-auto object-cover rounded-t-lg'
                        />
                      )}

                      <div className='p-3'>
                        {/* Display Color */}
                        {img.color && (
                          <div className='flex items-center gap-2 mb-2'>
                            <div
                              className='w-6 h-6 rounded-full'
                              style={{
                                backgroundColor:
                                  colors.find((color) => color.id === img.color)
                                    ?.slug === 'multicolor'
                                    ? 'transparent'
                                    : colors.find(
                                        (color) => color.id === img.color
                                      )?.code,
                                background:
                                  colors.find((color) => color.id === img.color)
                                    ?.slug === 'multicolor'
                                    ? 'linear-gradient(to right, #dc2626, #2563eb, #16a34a)'
                                    : colors.find(
                                        (color) => color.id === img.color
                                      )?.code,
                              }}
                            ></div>
                            <span className='text-sm capitalize font-medium'>
                              {
                                colors.find((color) => color.id === img.color)
                                  ?.name
                              }
                            </span>
                          </div>
                        )}

                        {/* Alt Text */}
                        {img.altText && (
                          <p className='text-xs text-gray-600'>
                            <span className='font-bold text-blue-700'>
                              Alt:
                            </span>{' '}
                            {img.altText}
                          </p>
                        )}
                      </div>

                      {/* Remove Button */}
                      <div className='absolute top-2 right-2 flex items-center gap-2'>
                        <Button
                          label='Remove'
                          variant='error'
                          onClick={() => removeCard(index)}
                          className='w-24 p-2 text-white rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-300'
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className='flex gap-10'>
            <Select
              color={
                colors.filter((color) => color.id === currentImage.color)[0]
                  ?.code
              }
              label='Select color of the image'
              name='color'
              value={currentImage.color}
              onChange={handleChange}
            >
              <option value=''>Select a color</option>
              {colors
                ?.slice(1)
                ?.filter((item) => item.slug === 'multicolor')
                ?.map((color) => (
                  <option value={color.id} key={color.id}>
                    {uppercaseText(color.name)}
                  </option>
                ))}
              {colors.map((color) => (
                <option
                  key={color.id}
                  value={color.id}
                  style={{ backgroundColor: color.code }}
                >
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

      <Section className={'rounded-sm p-5 bg-stone-300'}>
        <CustomEditor
          name='summary'
          label={'Enter Summary'}
          value={formData.summary}
          onChange={(content) => {
            setFormData((prevData) => ({
              ...prevData,
              summary: content,
            }))
          }}
        />
      </Section>

      <Devider />

      <Section className={'rounded-sm p-5 bg-stone-300'}>
        <CustomEditor
          name='description'
          label={'Enter description'}
          value={formData.description}
          onChange={(content) => {
            setFormData((prevData) => ({
              ...prevData,
              description: content,
            }))
          }}
        />
      </Section>

      {/* <Devider />

      <Section className={'rounded-sm p-5 bg-stone-300'}>
        <TextArea
          disabled={true}
          label='Enter Return Policy'
          placeholder='Enter here ...'
          rows={3}
          name='returnPolicy'
          value={formData.returnPolicy}
          onChange={handleChange}
        />
      </Section> */}

      <Devider />

      <div className='rounded-sm p-5 bg-stone-300'>
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
                className='flex gap-2 items-center rounded-sm p-1 px-2 bg-white'
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
      </div>

      <Devider />

      <Section className={'rounded-sm p-5 bg-stone-300'}>
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

      <div className='rounded-sm p-5 bg-stone-300'>
        <SimilarProruct
          formData={formData}
          setFormData={setFormData}
          categories={allCategories}
          customerTypes={customerTypes}
          colors={colors}
        />
      </div>

      <Devider />

      <div className='rounded-sm p-5 bg-stone-300'>
        <AddDiscount formData={formData} setFormData={setFormData} />
      </div>

      <Devider />

      <Section>
        <Button
          variant='success'
          loading={saving}
          loadingText={'Saving...'}
          onClick={type === 'edit' ? handlEditSubmit : handleSubmit}
          label='Save Product'
        />
      </Section>

      {showImageCropper && (
        <ImageCroper
          aspectRatio={10 / 17}
          isOpen={true}
          onClose={() => setShowImageCropper(false)}
          onCropComplete={handleFileChange}
        />
      )}
    </div>
  )
}

export default ProductForm
