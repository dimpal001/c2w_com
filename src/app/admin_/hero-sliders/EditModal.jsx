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

const EditModal = ({ isOpen, onClose, selectedHeroSlide, fetchHeroSlides }) => {
  const [newHeroSlide, setNewHeroSlide] = useState({
    imageUrl: selectedHeroSlide.imageUrl || '',
    hyperLink: selectedHeroSlide.hyperLink || '',
  })
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [image, setImage] = useState({
    blob: null,
    fileName: '',
    imageUrl: cdnPath + selectedHeroSlide.imageUrl || null,
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewHeroSlide((prev) => ({ ...prev, [name]: value }))
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
        await deleteImageFromCDN(selectedHeroSlide.imageUrl)
        imageUrl = await uploadImageToCDN(image.blob, image.fileName)
      } else {
        imageUrl = selectedHeroSlide.imageUrl
      }

      if (imageUrl) {
        const response = await axios.patch('/api/customs/hero-sliders/update', {
          id: selectedHeroSlide.id,
          imageUrl: imageUrl,
          hyperLink: newHeroSlide.hyperLink,
        })
        setNewHeroSlide({ imageUrl: '', hyperLink: '' })
        console.log(response)
        fetchHeroSlides()
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
            <div className='border p-4 mb-4 bg-white rounded'>
              <div className='grid grid-cols-2 gap-5'>
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
                    width={320}
                    height={180}
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
            label={'Update Slider'}
            onClick={updateShowcase}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditModal
