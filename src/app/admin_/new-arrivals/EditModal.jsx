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

const EditModal = ({
  isOpen,
  onClose,
  selectedNewArrival,
  fetchNewArrivals,
}) => {
  const [newNewArrival, setNewNewArrival] = useState({
    imageUrl: selectedNewArrival.imageUrl || '',
    hyperLink: selectedNewArrival.hyperLink || '',
    title: selectedNewArrival.title || '',
    price: selectedNewArrival.price || '',
    mrp: selectedNewArrival.mrp || '',
    description: selectedNewArrival.description || '',
  })
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [image, setImage] = useState({
    blob: null,
    fileName: '',
    imageUrl: cdnPath + selectedNewArrival.imageUrl || null,
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewNewArrival((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (blob, croppedImageUrl, fileName) => {
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
  }

  const updateShowcase = async () => {
    if (newNewArrival.title === '') {
      enqueueSnackbar('Enter Title', { variant: 'error' })
      return
    }
    if (newNewArrival.hyperLink === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }
    try {
      setSubmitting(true)
      let imageUrl
      if (image.fileName !== '') {
        await deleteImageFromCDN(selectedNewArrival.imageUrl)
        imageUrl = await uploadImageToCDN(image.blob, image.fileName)
      } else {
        imageUrl = selectedNewArrival.imageUrl
      }

      if (imageUrl) {
        await axios.patch('/api/customs/new-arrivals/update', {
          id: selectedNewArrival.id,
          imageUrl: imageUrl,
          hyperLink: newNewArrival.hyperLink,
          title: newNewArrival.title,
          description: newNewArrival.description,
          price: parseInt(newNewArrival.price),
          mrp: parseInt(newNewArrival.mrp),
        })
        setNewNewArrival({ title: '', imageUrl: '', hyperLink: '' })
        fetchNewArrivals()
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
          Edit Selected Product
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div
            className={`transition-height ease-in-out overflow-hidden duration-500`}
          >
            <div className='border p-4 bg-white rounded'>
              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <label className='block mb-1 font-semibold'>Title</label>
                  <input
                    type='text'
                    name='title'
                    value={newNewArrival.title}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div>
                  <label className='block mb-1 font-semibold'>Hyper Link</label>
                  <input
                    type='text'
                    name='hyperLink'
                    value={newNewArrival.hyperLink}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div>
                  <label className='block mb-1 font-semibold'>
                    Description
                  </label>
                  <input
                    type='text'
                    name='description'
                    value={newNewArrival.description}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div>
                  <label className='block mb-1 font-semibold'>Image</label>
                  <button
                    onClick={() => setShowImageCroper(true)}
                    className='border p-2 rounded flex justify-center w-full'
                  >
                    <Upload size={19} />
                  </button>
                </div>
                <div>
                  <label className='block mb-1 font-semibold'>Price</label>
                  <input
                    type='number'
                    name='price'
                    value={newNewArrival.price}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div>
                  <label className='block mb-1 font-semibold'>
                    Discount Price
                  </label>
                  <input
                    type='number'
                    name='mrp'
                    value={newNewArrival.mrp}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
              </div>
              {image.imageUrl && (
                <div className='relative'>
                  <Image
                    width={130}
                    height={60}
                    src={image.imageUrl}
                    alt='Image'
                    className='py-2'
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
            onClick={updateShowcase}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditModal
