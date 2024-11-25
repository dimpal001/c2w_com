/* eslint-disable react/prop-types */
import Button from '@/app/admin_/components/Button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'
import { uploadImageToCDN } from '../../../../../../utils/uploadImageToCDN'
import Image from 'next/image'
import { X } from 'lucide-react'
import { cdnPath } from '@/app/Components/cdnPath'
import { deleteImageFromCDN } from '../../../../../../utils/deleteImageFromCDN'

const AddEditModal = ({ isOpen, onClose, item, refresh, isEdit }) => {
  const [altText, setAltText] = useState(item?.altText || '')
  const imageurl = cdnPath + item?.logoUrl
  const [image, setImage] = useState({
    blob: null,
    logoUrl: (item?.logoUrl && imageurl) || null,
    fileName: null,
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      if (isEdit) {
        let imageUrl
        if (image.blob) {
          await deleteImageFromCDN(item.logoUrl)
          imageUrl = await uploadImageToCDN(image.blob, image.logoUrl)
        } else {
          imageUrl = image.logoUrl
        }
        await axios.patch(`/api/admin/logos`, {
          id: item.id,
          altText: altText,
          logoUrl: imageUrl,
        })

        setImage({
          blob: null,
          logoUrl: null,
          fileName: null,
        })
      } else {
        if (!image.blob) {
          enqueueSnackbar('Select a logo', { variant: 'error' })
          return
        }
        const imageUrl = await uploadImageToCDN(image.blob, image.logoUrl)
        await axios.post(`/api/admin/logos`, {
          altText: altText,
          logoUrl: imageUrl,
        })

        setImage({
          blob: null,
          logoUrl: null,
          fileName: null,
        })
      }

      setImage({
        blob: null,
        logoUrl: null,
        fileName: null,
      })
      refresh()
      onClose()
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImage({
        blob: file,
        logoUrl: URL.createObjectURL(file),
        fileName: file.name,
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <Modal size={'md'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          {isEdit ? 'Edit' : 'Add'} Logo <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div className='flex gap-2 items-center'>
            <div className='mb-2'>
              <label className='block mb-1 font-semibold'>Icon</label>
              <input
                type='file'
                className='border py-[6px] w-full px-2 rounded-sm'
                onChange={handleFile}
              />
            </div>
            <div className='mb-2'>
              <label className='block mb-1 font-semibold'>Alt Text</label>
              <input
                type='text'
                name='altText'
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className='border p-2 rounded w-full'
              />
            </div>
          </div>
          {image.logoUrl && (
            <div className='relative'>
              <Image
                width={110}
                height={0}
                src={image.logoUrl}
                alt='Image'
                className='py-2 pb-4 border'
              />
              <X
                className='text-red-600 absolute top-3 left-1 cursor-pointer'
                onClick={() => {
                  setImage({
                    blob: null,
                    logoUrlUrl: null,
                    fileName: null,
                  })
                }}
                size={35}
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant='secondary' onClick={onClose} label={'Close'} />
          <Button
            loading={submitting}
            label={isEdit ? 'Edit' : 'Add'}
            onClick={handleSubmit}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddEditModal
