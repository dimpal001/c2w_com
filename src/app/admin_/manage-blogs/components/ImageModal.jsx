/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { blogApi } from '../../components/apis'
import { useUserContext } from '@/app/context/UserContext'
import Button from '../../components/Button'
import { enqueueSnackbar } from 'notistack'
import DeleteModal from '@/app/Components/DeleteModal'
import { Upload } from 'lucide-react'
import { uploadImageToCDN } from '../../../../../utils/uploadImageToCDN'
import { cdnPath } from '@/app/Components/cdnPath'
import { deleteImageFromCDN } from '../../../../../utils/deleteImageFromCDN'

const ImageModal = ({
  isOpen,
  onClose,
  selectedItem,
  setImages,
  images,
  refresh,
}) => {
  const [note, setNote] = useState(selectedItem ? selectedItem?.note : null)
  const [altText, setAltText] = useState(
    selectedItem ? selectedItem?.altText : null
  )
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [editMode, setEditMode] = useState(selectedItem ? true : false)
  const [submitting, setSubmitting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [fileName, setFileName] = useState(null)

  const imageRef = useRef(null)

  const { user } = useUserContext()

  const handleSubmit = async () => {
    try {
      setSubmitting(true)

      if (editMode) {
        let imageUrl
        if (imageFile) {
          await deleteImageFromCDN(selectedItem?.imageUrl)
          imageUrl = await uploadImageToCDN(imageFile, fileName)
        } else {
          imageUrl = selectedItem?.imageUrl
        }

        const response = await axios.put(
          `${blogApi}/images`,
          {
            id: selectedItem?.id,
            imageUrl,
            altText,
            note,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        setImages((prev) => [...prev, response.data])
        setAltText(null)
        setNote(null)
        setFileName(null)
        setImageFile(null)
        enqueueSnackbar('Image has been updated!', { variant: 'success' })
      } else {
        const imageUrl = await uploadImageToCDN(imageFile, fileName, 'blog')
        console.log(imageUrl)
        const response = await axios.post(
          `${blogApi}/images`,
          {
            imageUrl,
            altText,
            note,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        if (setImages) {
          setImages((prev) => [...prev, response.data])
        }
        setAltText(null)
        setNote(null)
        setFileName(null)
        setImageFile(null)
        enqueueSnackbar('Image has been added!', { variant: 'success' })
      }
      onClose()
      refresh()
    } catch (error) {
      console.log(error.message)
      enqueueSnackbar(error?.response?.data?.message || '', {
        variant: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${blogApi}/categories/${selectedCategory?.id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      const filteredCategories = images.filter(
        (item) => item?.id !== selectedCategory?.id
      )
      setImages(filteredCategories)
      setSelectedCategory(null)
      setShowDeleteModal(false)
      enqueueSnackbar('Category has been deleted', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setFileName(file?.name)
    }
  }

  const selectImageRef = () => {
    imageRef.current.click()
  }

  return (
    <Modal size={'2xl'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          {editMode ? 'Edit' : 'Add'} Image
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div className='flex items-center gap-2'>
            <div className='w-full grid grid-cols-3 gap-2'>
              <Button
                onClick={selectImageRef}
                icon={Upload}
                label={'Select an image'}
              />
              <input
                type='file'
                ref={imageRef}
                onChange={handleImageChange}
                className='border hidden border-gray-300 p-[6px] rounded-sm w-full'
              />
              <input
                type='text'
                placeholder={`Alt text`}
                value={altText || ''}
                onChange={(e) => setAltText(e.target.value)}
                className='border border-gray-300 p-[6px] rounded-sm w-full'
              />
              <input
                type='text'
                placeholder={`Any note`}
                value={note || ''}
                onChange={(e) => setNote(e.target.value)}
                className='border border-gray-300 p-[6px] rounded-sm w-full'
              />
            </div>
          </div>
          <div className='mt-2'>
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                className='w-72 border object-cover'
                alt=''
              />
            )}
            {selectedItem && !imageFile && (
              <img
                src={cdnPath + selectedItem?.imageUrl}
                className='w-72 border object-cover'
                alt=''
              />
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          {editMode && (
            <Button
              onClick={() => {
                setSelectedCategory(null)
                setNote('')
                setEditMode(false)
              }}
              label={'Add New'}
            />
          )}
          <Button variant='secondary' onClick={onClose} label={'Close'} />
          <Button
            onClick={handleSubmit}
            loadingText={''}
            loading={submitting}
            label={editMode ? 'Save' : 'Add'}
          />
        </ModalFooter>
      </ModalContent>
      {showDeleteModal && (
        <DeleteModal
          isOpen={true}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </Modal>
  )
}

export default ImageModal
