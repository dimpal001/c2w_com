import React, { useState } from 'react'
import Button from '../../components/Button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import { BellRing } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
function SendNotificationModal({ isOpen, onClose, userId }) {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [hyperLink, setHyperLink] = useState('')
  const [sending, setSending] = useState(false)

  const handleSendNotification = async () => {
    try {
      if (title === '') {
        enqueueSnackbar('Title is required!', { variant: 'error' })
        return
      }
      setSending(true)

      const response = await axios.post('/api/notifications/add', {
        userId,
        title,
        message,
        hyperLink,
      })

      if (response.status === 200) {
        enqueueSnackbar(response.data.message, { variant: 'success' })
        setTitle('')
        setMessage('')
        setHyperLink('')
        onClose()
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSending(false)
    }
  }

  return (
    <Modal size={'md'} isOpen={isOpen}>
      <ModalHeader>
        <h2 className='text-lg font-semibold text-gray-700'>
          <div className='flex gap-3 items-center'>
            <BellRing className='text-blue-800' />
            Send Notification
          </div>
        </h2>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody className='space-y-4'>
        {/* Title Input */}
        <div>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-2 w-full px-3 py-2 border border-gray-400 rounded-sm focus:outline-none focus:border-blue-800'
            placeholder='Notification Title'
          />
          <textarea
            placeholder='Message... (optional)'
            className='mt-2 w-full px-3 py-2 border border-gray-400 rounded-sm focus:outline-none focus:border-blue-800'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          ></textarea>
          <input
            type='text'
            value={hyperLink}
            onChange={(e) => setHyperLink(e.target.value)}
            className='mt-2 w-full px-3 py-2 border border-gray-400 rounded-sm focus:outline-none focus:border-blue-800'
            placeholder='Hyper Link (optional)'
          />
        </div>

        {/* Message Textarea */}
        <div></div>
      </ModalBody>
      <ModalFooter>
        <div className='flex justify-end gap-3 w-full'>
          <Button label={'Cancel'} onClick={onClose} variant='secondary' />
          <Button
            label={'Send Notification'}
            onClick={handleSendNotification}
            variant='primary'
            loading={sending}
            loadingText={'Sending...'}
          />
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default SendNotificationModal
