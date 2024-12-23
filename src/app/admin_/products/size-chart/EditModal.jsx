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
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import ImageCroper from '@/app/Components/ImageCroper'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { cdnPath } from '@/app/Components/cdnPath'
import { deleteImageFromCDN } from '../../../../../utils/deleteImageFromCDN'
import { uploadImageToCDN } from '../../../../../utils/uploadImageToCDN'
import Button from '../../components/Button'

const EditModal = ({ isOpen, onClose, selectedItem, fetchItems }) => {
  const [newItem, setNewItem] = useState({
    title: selectedItem.title || '',
    imageUrl: selectedItem.imageUrl || '',
  })
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [image, setImage] = useState({
    blob: null,
    fileName: '',
    imageUrl: cdnPath + selectedItem.imageUrl || null,
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (blob, croppedImageUrl, fileName) => {
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
  }

  const handleUpdate = async () => {
    if (newItem.title === '') {
      enqueueSnackbar('Enter Title', { variant: 'error' })
      return
    }
    try {
      setSubmitting(true)
      let imageUrl
      if (image.fileName !== '') {
        await deleteImageFromCDN(selectedItem.imageUrl)
        imageUrl = await uploadImageToCDN(image.blob, image.fileName)
      } else {
        imageUrl = selectedItem.imageUrl
      }

      if (imageUrl) {
        await axios.patch('/api/products/size-chart/update', {
          id: selectedItem.id,
          title: newItem.title,
          imageUrl: imageUrl,
        })
        setNewItem({ title: '', imageUrl: '' })
        fetchItems()
        onClose()
      }
    } catch (error) {
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
          Edit Selected Size
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div
            className={`transition-height ease-in-out overflow-hidden duration-500`}
          >
            <div className='border p-4 mb-4 bg-white rounded'>
              <div className='grid grid-cols-3 gap-5'>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Label</label>
                  <input
                    type='text'
                    name='title'
                    value={newItem.title}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Image</label>
                  <button
                    onClick={() => setShowImageCroper(true)}
                    className='border p-2 rounded flex justify-center w-full'
                  >
                    <Upload size={19} />
                  </button>
                </div>
              </div>
              {image.imageUrl && (
                <div className='relative'>
                  <Image
                    width={160}
                    height={90}
                    src={image.imageUrl}
                    alt='Image'
                    className='py-2 pb-4'
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
                  aspectRatio={9 / 16}
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
            onClick={handleUpdate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditModal
