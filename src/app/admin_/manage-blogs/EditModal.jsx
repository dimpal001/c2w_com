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

const EditModal = ({ isOpen, onClose, selectedECProduct, refresh }) => {
  const [newECProduct, setNewECProduct] = useState({
    imageUrl: selectedECProduct.imageUrl || '',
    hyperLink: selectedECProduct.hyperLink || '',
    title: selectedECProduct.title || '',
    description: selectedECProduct.description || '',
  })
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [image, setImage] = useState({
    blob: null,
    fileName: '',
    imageUrl: cdnPath + selectedECProduct.imageUrl || null,
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewECProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (blob, croppedImageUrl, fileName) => {
    console.log(blob, croppedImageUrl, fileName)
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
  }

  const updateShowcase = async () => {
    if (newECProduct.hyperLink === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }
    try {
      setSubmitting(true)
      let imageUrl
      if (image.fileName !== '') {
        await deleteImageFromCDN(selectedECProduct.imageUrl)
        imageUrl = await uploadImageToCDN(image.blob, image.fileName)
      } else {
        imageUrl = selectedECProduct.imageUrl
      }

      if (imageUrl) {
        const response = await axios.patch('/api/customs/blogs', {
          id: selectedECProduct.id,
          imageUrl: imageUrl,
          hyperLink: newECProduct.hyperLink,
          title: newECProduct.title,
          description: newECProduct.description,
        })
        setNewECProduct({
          title: '',
          imageUrl: '',
          hyperLink: '',
          description: '',
        })
        console.log(response)
        refresh()
        onClose()
      }
    } catch (error) {
      console.log(error)
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
          Edit Selected Product
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div
            className={`transition-height ease-in-out overflow-hidden duration-500`}
          >
            <div className='border p-4 mb-4 bg-white rounded'>
              <div className='grid grid-cols-3 gap-3'>
                <div className='mb-2'>
                  <label className='block font-semibold'>Image</label>
                  <button
                    onClick={() => setShowImageCroper(true)}
                    className='border p-2 rounded flex justify-center w-full'
                  >
                    <Upload size={19} />
                  </button>
                </div>
                <div className='mb-2'>
                  <label className='block font-semibold'>Title</label>
                  <input
                    type='text'
                    name='title'
                    value={newECProduct.title}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div className='mb-2'>
                  <label className='block font-semibold'>Hyper Link</label>
                  <input
                    type='text'
                    name='hyperLink'
                    value={newECProduct.hyperLink}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div className='mb-2'>
                  <label className='block font-semibold'>Description</label>
                  <input
                    type='text'
                    name='description'
                    value={newECProduct.description}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
              </div>
              {image.imageUrl && (
                <div className='relative'>
                  <Image
                    width={110}
                    height={0}
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
                  aspectRatio={16 / 9}
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
            loadingText={'Saving'}
            label={'Update'}
            onClick={updateShowcase}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditModal
