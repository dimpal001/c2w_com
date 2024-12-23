/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import React, { useState } from 'react'
import Button from '../components/Button'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import ImageCroper from '@/app/Components/ImageCroper'
import { enqueueSnackbar } from 'notistack'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'
import axios from 'axios'
import { cdnPath } from '@/app/Components/cdnPath'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'

const AddEditProductWeek = ({ isOpen, onClose, item, refresh, editMode }) => {
  const [newHeroSlide, setNewHeroSlide] = useState({
    title: item?.title || '',
    imageUrl: item?.imageUrl || '',
    hyperLink: item?.hyperLink || '',
  })
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [image, setImage] = useState({
    blob: null,
    fileName: '',
    imageUrl: (item && cdnPath + item?.imageUrl) || null,
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewHeroSlide((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (blob, croppedImageUrl, fileName) => {
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
  }

  const updateShowcase = async () => {
    if (image.imageUrl === '') {
      enqueueSnackbar('Add an image', { variant: 'error' })
      return
    }
    if (newHeroSlide.title === '') {
      enqueueSnackbar('Enter Title', { variant: 'error' })
      return
    }
    if (newHeroSlide.hyperLink === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }
    try {
      setSubmitting(true)
      let imageUrl
      if (image.fileName !== '') {
        await deleteImageFromCDN(item?.imageUrl)
        imageUrl = await uploadImageToCDN(image.blob, image.fileName)
      } else {
        imageUrl = item?.imageUrl
      }

      if (imageUrl) {
        let response
        if (editMode) {
          response = await axios.patch(
            '/api/customs/fashion-week/product-week',
            {
              id: item?.id,
              title: newHeroSlide.title,
              imageUrl: imageUrl,
              hyperLink: newHeroSlide.hyperLink,
            }
          )
        } else {
          response = await axios.post(
            '/api/customs/fashion-week/product-week',
            {
              title: newHeroSlide.title,
              imageUrl: imageUrl,
              hyperLink: newHeroSlide.hyperLink,
            }
          )
        }

        onClose()
        refresh()
        setNewHeroSlide({ title: '', imageUrl: '', hyperLink: '' })
        setImage({ blob: null, fileName: '', imageUrl: null })
        enqueueSnackbar(response.data.message, { variant: 'success' })
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to handle task!'
      )
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Modal size={'4xl'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          {' '}
          {editMode ? 'Edit Selected Product' : 'Add Product Week'}
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div
            className={`transition-height ease-in-out overflow-hidden duration-500`}
          >
            <div className='border p-4 mb-4 bg-white rounded'>
              <div className='grid grid-cols-3 gap-5'>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Image</label>
                  <button
                    onClick={() => setShowImageCroper(true)}
                    className='border p-2 rounded flex justify-center w-full'
                  >
                    <Upload size={19} />
                  </button>
                </div>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Title</label>
                  <input
                    type='text'
                    name='title'
                    value={newHeroSlide.title}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Hyper Link</label>
                  <input
                    type='text'
                    name='hyperLink'
                    value={newHeroSlide.hyperLink}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
              </div>
              {image.imageUrl && (
                <div className='relative'>
                  <Image
                    width={180}
                    height={170}
                    src={image.imageUrl}
                    alt='Image'
                    className='py-2 pb-4 border'
                  />
                  <X
                    className='text-red-600 absolute top-3 left-1 cursor-pointer'
                    onClick={() => {
                      setImage({
                        blob: '',
                        imageUrl: '',
                        fileName: '',
                      })
                    }}
                    size={35}
                  />
                </div>
              )}
              {showImageCroper && (
                <ImageCroper
                  isOpen={true}
                  onClose={() => setShowImageCroper(false)}
                  aspectRatio={10 / 10}
                  onCropComplete={handleFile}
                />
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'Close'} variant='secondary' onClick={onClose} />
          <Button
            loading={submitting}
            label={editMode ? 'Update' : 'Add'}
            onClick={updateShowcase}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddEditProductWeek
