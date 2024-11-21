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
import Button from '../../components/Button'
import axios from 'axios'
import { CheckCircle } from 'lucide-react'

const UpdateOrderModal = ({ isOpen, onClose, order }) => {
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(order?.status || '')
  const [note, setNote] = useState('')
  const [trackingId, setTrackingId] = useState('')

  const handleUpdate = async () => {
    setSubmitting(true)
    try {
      const response = await axios.post('/api/orders/update', {
        orderId: order?.orderId,
        status,
        note,
        trackingId,
      })
      console.log(response.data)
    } catch (error) {
      console.error('Error updating order:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal size={'2xl'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader className='flex justify-between items-center'>
          <div className='text-lg font-semibold text-gray-800'>
            Update Order (
            <span className='text-blue-800'>#{order?.orderId}</span>)
          </div>
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div className='space-y-6'>
            {/* Order Status */}
            <div>
              <label
                htmlFor='status'
                className='block text-gray-700 font-medium'
              >
                Order Status
              </label>
              <select
                id='status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='Pending'>Pending</option>
                <option value='Shipped'>Shipped</option>
                <option value='Delivered'>Delivered</option>
                <option value='Cancelled'>Cancelled</option>
              </select>
            </div>

            {/* Add Note */}
            <div>
              <label htmlFor='note' className='block text-gray-700 font-medium'>
                Order Note
              </label>
              <textarea
                id='note'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows='4'
                placeholder='Add a note (optional)'
                className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* Tracking ID */}
            <div>
              <label
                htmlFor='trackingId'
                className='block text-gray-700 font-medium'
              >
                Tracking ID
              </label>
              <input
                id='trackingId'
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                type='text'
                placeholder='Enter Tracking ID'
                className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className='space-x-4'>
          <Button label={'Close'} variant='secondary' onClick={onClose} />
          <Button
            label={'Update Order'}
            onClick={handleUpdate}
            loading={submitting}
            loadingText={'Updating...'}
            className='flex items-center space-x-2'
          >
            <CheckCircle size={20} />
            <span>Update</span>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateOrderModal
