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
import { X } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'

const ButtonsModal = ({ isOpen, onClose, item, refresh, editMode }) => {
  const [newHeroSlide, setNewHeroSlide] = useState({
    name: item?.name || '',
    iconUrl: item?.iconUrl || '',
    link: item?.link || '',
  })
  const [image, setImage] = useState({
    blob: null,
    iconUrl: item?.iconUrl || null,
    fileName: '',
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewHeroSlide((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImage({
        blob: file,
        iconUrl: URL.createObjectURL(file),
        fileName: file.name,
      })
    }
    reader.readAsDataURL(file)
  }

  const updateDesign = async () => {
    if (newHeroSlide.name === '') {
      enqueueSnackbar('Enter name', { variant: 'error' })
      return
    }
    if (newHeroSlide.link === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }
    try {
      setSubmitting(true)
      let iconUrls
      if (image.fileName !== '') {
        await deleteImageFromCDN(item?.iconUrl)
        console.log(image.blog, image.fileName)
        iconUrls = await uploadImageToCDN(image.blob, image.fileName)
      } else {
        iconUrls = item?.iconUrl
      }

      if (iconUrls) {
        let response
        if (editMode) {
          response = await axios.patch('/api/admin/designs/button', {
            id: item?.id,
            name: newHeroSlide.name,
            iconUrl: iconUrls,
            link: newHeroSlide.link,
          })
        } else {
          response = await axios.post('/api/admin/designs/button', {
            name: newHeroSlide.name,
            iconUrl: iconUrls,
            link: newHeroSlide.link,
          })
        }

        setNewHeroSlide({ name: '', iconUrl: '', link: '' })
        enqueueSnackbar(response.data.message, { variant: 'success' })
        refresh()
        onClose()
      }
    } catch (error) {
      console.log(error)
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
                  <label className='block mb-1 font-semibold'>Icon</label>
                  <input
                    type='file'
                    className='border py-[6px] w-full px-2 rounded-sm'
                    onChange={handleFile}
                  />
                </div>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>name</label>
                  <input
                    type='text'
                    name='name'
                    value={newHeroSlide.name}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
                <div className='mb-2'>
                  <label className='block mb-1 font-semibold'>Hyper Link</label>
                  <input
                    type='text'
                    name='link'
                    value={newHeroSlide.link}
                    onChange={handleChange}
                    className='border p-2 rounded w-full'
                  />
                </div>
              </div>
              {image.iconUrl && (
                <div className='relative'>
                  <Image
                    width={100}
                    height={100}
                    src={image.iconUrl}
                    alt='Image'
                    className='py-2 pb-4 border'
                  />
                  <X
                    className='text-red-600 absolute top-3 left-1 cursor-pointer'
                    onClick={() => {
                      setImage({
                        blob: '',
                        iconUrl: '',
                        fileName: '',
                      })
                    }}
                    size={35}
                  />
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button label={'Close'} variant='secondary' onClick={onClose} />
          <Button
            loading={submitting}
            label={editMode ? 'Update' : 'Add'}
            onClick={updateDesign}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ButtonsModal
