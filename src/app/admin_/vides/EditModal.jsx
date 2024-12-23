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

const EditModal = ({ isOpen, onClose, item, refresh }) => {
  const [newItem, setNewItem] = useState({
    hyperLink: item.hyperLink || '',
    title: item.title || '',
    videoUrl: cdnPath + item.videoUrl || '',
    price: item.price || '',
    description: item.description || '',
  })
  const [video, setVideo] = useState(null)
  const [fileName, setFileName] = useState(null)

  const fileInputRef = useRef(null)

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  const updateShowcase = async () => {
    if (newItem.title === '') {
      enqueueSnackbar('Enter Title', { variant: 'error' })
      return
    }
    if (newItem.hyperLink === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }
    try {
      setSubmitting(true)
      let videoUrl
      if (fileName !== null) {
        await deleteImageFromCDN(item.videoUrl)
        videoUrl = await uploadImageToCDN(video, fileName)
      } else {
        videoUrl = item.videoUrl
      }

      if (videoUrl) {
        await axios.patch('/api/vides', {
          id: item.id,
          title: newItem.title,
          videoUrl: videoUrl,
          price: newItem.price,
          hyperLink: newItem.hyperLink,
          description: newItem.description,
        })
        setNewItem({
          title: '',
          videoUrl: '',
          hyperLink: '',
          price: '',
          avatarUrl: '',
        })
        refresh()
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
              <div className='grid grid-cols-3 gap-5'>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Title</label>
                  <input
                    type='text'
                    name='title'
                    value={newItem.title}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Title</label>
                  <input
                    type='text'
                    name='price'
                    value={newItem.price}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
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
              </div>
              <div className='flex gap-2'>
                <video
                  controls
                  src={video ? URL.createObjectURL(video) : newItem.videoUrl}
                  className='w-52 mb-3'
                ></video>
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
    </Modal>
  )
}

export default EditModal
