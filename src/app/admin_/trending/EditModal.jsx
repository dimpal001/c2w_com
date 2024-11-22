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
import { Upload } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'
import axios from 'axios'
import { cdnPath } from '@/app/Components/cdnPath'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'

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
    categoryHyperLink: selectedTrendingProducts.categoryHyperLink || '',
  })
  const [video, setVideo] = useState(null)
  const [fileName, setFileName] = useState(null)

  console.log(selectedTrendingProducts)

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
      if (fileName !== null) {
        await deleteImageFromCDN(selectedTrendingProducts.videoUrl)
        videoUrl = await uploadImageToCDN(video, fileName)
      } else {
        videoUrl = selectedTrendingProducts.videoUrl
      }

      if (videoUrl) {
        const response = await axios.patch('/api/customs/trending/update', {
          id: selectedTrendingProducts.id,
          title: newTrendingProduct.title,
          videoUrl: videoUrl,
          price: newTrendingProduct.price,
          hyperLink: newTrendingProduct.hyperLink,
          categoryHyperLink: newTrendingProduct.categoryHyperLink,
        })
        setNewTrendingProduct({
          title: '',
          videoUrl: '',
          hyperLink: '',
          price: '',
          categoryHyperLink: '',
        })
        console.log(response)
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
                  <label className='block mb-1 font-semibold'>Image</label>
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
                  <label className='block mb-1 font-semibold'>Hyper Link</label>
                  <input
                    type='text'
                    name='hyperLink'
                    value={newTrendingProduct.hyperLink}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
              </div>
              <video
                controls
                src={
                  video
                    ? URL.createObjectURL(video)
                    : newTrendingProduct.videoUrl
                }
                className='w-52 mb-3'
              ></video>
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
