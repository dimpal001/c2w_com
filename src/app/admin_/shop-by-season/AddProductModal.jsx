/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@/app/Components/CustomModal'
import React, { useState } from 'react'
import Button from '../components/Button'
import ImageCroper from '@/app/Components/ImageCroper'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

const AddProductModal = ({
  isOpen,
  onClose,
  selectedSeason,
  setSelectedSeason,
  fetchSeasons,
}) => {
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [newProduct, setNewProduct] = useState({
    seasonId: '',
    imageUrl: '',
    hyperLink: '',
    description: '',
  })
  const [image, setImage] = useState({
    blob: null,
    fileName: '',
    imageUrl: null,
  })

  const addProduct = async () => {
    if (newProduct.description === '') {
      enqueueSnackbar('Enter short description', { variant: 'error' })
      return
    }
    if (image.fileName === '') {
      enqueueSnackbar('Add image', { variant: 'error' })
      return
    }
    if (newProduct.hyperLink === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }
    try {
      setSubmitting(true)
      const imageUrl = await uploadImageToCDN(image.blob, image.fileName)

      if (imageUrl) {
        await axios.post(
          '/api/customs/shop-by-season/add',
          {
            seasonId: selectedSeason.id,
            description: newProduct.description,
            imageUrl: imageUrl,
            hyperLink: newProduct.hyperLink,
          },
          { withCredentials: true }
        )
        setNewProduct({ description: '', imageUrl: '', hyperLink: '' })
        setSelectedSeason(null)
        fetchSeasons()
        setImage(null)
        setSelectedSeason(null)
        onClose()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (blob, croppedImageUrl, fileName) => {
    console.log(blob, croppedImageUrl, fileName)
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Add product to the season</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <div
            className={`transition-height ease-in-out overflow-hidden duration-500`}
          >
            <div className='border p-4 mb-4 bg-white rounded'>
              <h3 className='text-lg font-semibold mb-2'>
                Add New Product to the selected Season
              </h3>
              <div className='grid grid-cols-2 gap-5'>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>
                    Short Description
                  </label>
                  <input
                    type='text'
                    name='description'
                    value={newProduct.description}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>
                    Upload Image
                  </label>
                  <button
                    onClick={() => setShowImageCroper(true)}
                    className='border p-2 rounded flex justify-center w-full'
                  >
                    <Upload size={19} />
                  </button>
                </div>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Hyper Link</label>
                  <input
                    type='text'
                    name='hyperLink'
                    value={newProduct.hyperLink}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
              </div>
              {image.imageUrl && (
                <div className='relative'>
                  <Image
                    width={160}
                    height={90}
                    src={image.imageUrl}
                    alt='Image'
                    className=' border border-gray-700 mb-2'
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
              <div className='flex gap-3'>
                <Button
                  loading={submitting}
                  loadingText={'Submitting'}
                  label={'Save Product'}
                  onClick={addProduct}
                />
                <Button label={'Close'} variant='secondary' onClick={onClose} />
              </div>
            </div>
          </div>
        </ModalBody>
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

export default AddProductModal
