/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import React, { useRef, useState } from 'react'
import Button from '../components/Button'
import { Upload, X } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'
import axios from 'axios'
import { cdnPath } from '@/app/Components/cdnPath'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'
import Image from 'next/image'
import ImageCroper from '@/app/Components/ImageCroper'

const EditModal = ({
  isOpen,
  onClose,
  selectedTrendingProducts,
  fetchTrendingProducts,
}) => {
  const [newTrendingProduct, setNewTrendingProduct] = useState({
    hyperLink: selectedTrendingProducts.hyperLink || '',
    title: selectedTrendingProducts.title || '',
    videoUrl: cdnPath + selectedTrendingProducts.videoUrl || '',
    price: selectedTrendingProducts.price || '',
    avatarUrl: selectedTrendingProducts.avatarUrl || '',
  })
  const [video, setVideo] = useState(null)
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [fileName, setFileName] = useState(null)
  const [image, setImage] = useState({
    blob: null,
    fileName: null,
    imageUrl: cdnPath + selectedTrendingProducts.avatarUrl || null,
  })

  const fileInputRef = useRef(null)

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewTrendingProduct((prev) => ({ ...prev, [name]: value }))
  }

  const updateShowcase = async () => {
    if (newTrendingProduct.title === '') {
      enqueueSnackbar('Enter Title', { variant: 'error' })
      return
    }
    if (newTrendingProduct.hyperLink === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }
    try {
      setSubmitting(true)
      let videoUrl
      let avatarUrl

      console.log(fileName)

      if (fileName !== null) {
        await deleteImageFromCDN(selectedTrendingProducts.videoUrl)
        videoUrl = await uploadImageToCDN(video, fileName)
      } else {
        videoUrl = selectedTrendingProducts.videoUrl
      }

      console.log(image.fileName)

      if (image.fileName !== null) {
        await deleteImageFromCDN(selectedTrendingProducts.avatarUrl)
        avatarUrl = await uploadImageToCDN(image.blob, image.fileName)
      } else {
        avatarUrl = selectedTrendingProducts.avatarUrl
      }

      if (videoUrl) {
        const response = await axios.patch('/api/customs/trending/update', {
          id: selectedTrendingProducts.id,
          title: newTrendingProduct.title,
          videoUrl: videoUrl,
          price: newTrendingProduct.price,
          hyperLink: newTrendingProduct.hyperLink,
          avatarUrl: avatarUrl,
        })
        setNewTrendingProduct({
          title: '',
          videoUrl: '',
          hyperLink: '',
          price: '',
          avatarUrl: '',
        })

        console.log(response?.message)
        fetchTrendingProducts()
        onClose()
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setVideo(file)
      setFileName(file.name)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFile = (blob, croppedImageUrl, fileName) => {
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
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
              <div className='grid grid-cols-3 gap-5'>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Title</label>
                  <input
                    type='text'
                    name='title'
                    value={newTrendingProduct.title}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Title</label>
                  <input
                    type='text'
                    name='price'
                    value={newTrendingProduct.price}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>

                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Hyper Link</label>
                  <input
                    type='text'
                    name='hyperLink'
                    value={newTrendingProduct.hyperLink}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Video</label>
                  <input
                    type='file'
                    ref={fileInputRef}
                    accept='video/*'
                    onChange={handleFileChange}
                    className='hidden'
                  />
                  <button
                    onClick={handleButtonClick}
                    className='border p-2 rounded flex justify-center w-full'
                  >
                    <Upload size={19} />
                  </button>
                </div>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>
                    Avatar Image
                  </label>
                  <input
                    type='file'
                    ref={fileInputRef}
                    accept='image/*'
                    onChange={handleFileChange}
                    className='hidden'
                  />
                  <button
                    onClick={() => setShowImageCroper(true)}
                    className='border p-2 rounded flex justify-center w-full'
                  >
                    <Upload size={19} />
                  </button>
                </div>
              </div>
              <div className='flex gap-2'>
                <video
                  controls
                  src={
                    video
                      ? URL.createObjectURL(video)
                      : newTrendingProduct.videoUrl
                  }
                  className='w-52 mb-3'
                ></video>
                {image.imageUrl && (
                  <div className='relative'>
                    <Image
                      width={90}
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
              </div>
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
      {showImageCroper && (
        <ImageCroper
          isOpen={true}
          onClose={() => setShowImageCroper(false)}
          onCropComplete={handleFile}
          aspectRatio={4 / 4}
        />
      )}
    </Modal>
  )
}

export default EditModal
