/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'
import Button from '../../components/Button'
import { cdnPath } from '@/app/Components/cdnPath'
import { uploadImageToCDN } from '../../../../../utils/uploadImageToCDN'
import { deleteImageFromCDN } from '../../../../../utils/deleteImageFromCDN'
import ImageCroper from '@/app/Components/ImageCroper'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'

const AddEditProductModal = ({
  isOpen,
  onClose,
  product,
  editMode,
  occasionId,
  refresh,
}) => {
  const [newItem, setNewItem] = useState({
    hyperLink: product?.hyperLink || '',
    shopByOccasionId: occasionId,
  })

  const [showImageCroper, setShowImageCroper] = useState(false)

  const imageurl = cdnPath + product?.imageUrl

  const [image, setImage] = useState({
    blob: null,
    imageUrl: (product?.imageUrl && imageurl) || null,
    fileName: null,
  })

  const handleFile = (blob, croppedImageUrl, fileName) => {
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
  }

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      let response
      if (editMode) {
        if (image.imageUrl === '') {
          enqueueSnackbar('Add an image', { variant: 'error' })
          return
        }
        if (newItem.hyperLink === '') {
          enqueueSnackbar('Add hyper link', { variant: 'error' })
          return
        }

        let url

        if (image.blob) {
          await deleteImageFromCDN(product?.imageUrl)
          url = await uploadImageToCDN(image.blob, image.fileName)
        } else {
          url = product?.imageUrl
        }

        if (url) {
          response = await axios.patch(
            '/api/customs/shop-by-occasion/product',
            {
              id: product?.id,
              imageUrl: url,
              hyperLink: newItem.hyperLink,
            }
          )
        }

        setImage({ blob: null, imageUrl: null, fileName: null })
      } else {
        if (image.blob === null) {
          enqueueSnackbar('Add an image', { variant: 'error' })
          return
        }
        if (newItem.hyperLink === '') {
          enqueueSnackbar('Add hyper link', { variant: 'error' })
          return
        }

        let url
        if (image.blob) {
          url = await uploadImageToCDN(image.blob, image.fileName)
        }

        response = await axios.post('/api/customs/shop-by-occasion/product', {
          imageUrl: url,
          hyperLink: newItem.hyperLink,
          shopByOccasionId: newItem.shopByOccasionId,
        })
        setImage({ blob: null, imageUrl: null, fileName: null })
      }

      setNewItem({
        occasionName: '',
        categoryHyperLinks: '',
      })

      enqueueSnackbar(response.data.message, { variant: 'success' })
      refresh()
      onClose()

      setImage({ blob: null, imageUrl: null, fileName: null })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal size={'xl'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          {editMode ? 'Edit' : 'Create'} Product
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div className='grid grid-cols-2 gap-3'>
            <div className='mb-2'>
              <label className='block mb-1 font-semibold'>Image</label>
              <button
                onClick={() => setShowImageCroper(true)}
                className='border flex justify-center items-center bg-white p-2 rounded w-full'
              >
                <Upload size={20} />
              </button>
            </div>
            <div className='mb-2'>
              <label className='block mb-1 font-semibold'>Hyper Link</label>
              <input
                type='text'
                name='hyperLink'
                value={newItem.hyperLink}
                onChange={handleChange}
                className='border p-2 rounded w-full'
              />
            </div>
          </div>
          {image.imageUrl !== null && (
            <div className='relative'>
              <Image
                width={90}
                height={160}
                src={image.imageUrl}
                alt='Image'
                className=' border border-gray-700 mb-2'
              />
              <X
                className='text-red-600 absolute top-3 left-1 cursor-pointer'
                onClick={() => {
                  setImage({
                    blob: null,
                    imageUrl: null,
                    fileName: null,
                  })
                }}
                size={35}
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} label={'Close'} variant='secondary' />
          <Button
            loading={submitting}
            onClick={handleSubmit}
            label={editMode ? 'Edit' : 'Add'}
          />
        </ModalFooter>
      </ModalContent>
      {showImageCroper && (
        <ImageCroper
          isOpen={true}
          onClose={() => setShowImageCroper(false)}
          aspectRatio={9 / 16}
          onCropComplete={handleFile}
        />
      )}
    </Modal>
  )
}

export default AddEditProductModal
