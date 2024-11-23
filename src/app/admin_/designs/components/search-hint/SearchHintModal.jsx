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
import Button from '../../../components/Button'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'

const SearchHintModal = ({ isOpen, onClose, item, refresh, editMode }) => {
  const [newHeroSlide, setNewHeroSlide] = useState({
    text: item?.text || '',
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewHeroSlide((prev) => ({ ...prev, [name]: value }))
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

      let response
      if (editMode) {
        response = await axios.patch('/api/admin/designs/search-hint', {
          id: item?.id,
          text: newHeroSlide.text,
        })
      } else {
        response = await axios.post('/api/admin/designs/search-hint', {
          text: newHeroSlide.text,
        })
      }

      setNewHeroSlide({ text: '' })
      enqueueSnackbar(response.data.message, { variant: 'success' })
      refresh()
      onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Modal size={'sm'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          {' '}
          {editMode ? 'Edit Search Hint' : 'Add Search Hint'}
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div>
            <label className='block mb-1 font-semibold'>Text</label>
            <input
              type='text'
              name='text'
              placeholder='Enter text here ..'
              value={newHeroSlide.text}
              onChange={handleChange}
              className='border border-slate-400 p-2 rounded w-full'
            />
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

export default SearchHintModal
