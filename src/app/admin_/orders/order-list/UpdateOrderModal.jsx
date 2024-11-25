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
import { enqueueSnackbar } from 'notistack'

const UpdateOrderModal = ({ isOpen, onClose, order, onCompleted }) => {
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(order?.status || '')
  const [notes, setNotes] = useState(order?.notes || '')
  const [trackingId, setTrackingId] = useState(order?.trackingId || '')

  const handleUpdate = async () => {
    setSubmitting(true)
    try {
      const response = await axios.patch('/api/orders/update', {
        id: order?.id,
        status,
        notes,
        trackingId,
      })
      if (response.status === 200) {
        onClose()
        onCompleted(response.data)
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
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
          <div className='space-y-4'>
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
                className='mt-2 block w-full rounded-sm px-4 py-2 border border-gray-300'
              >
                <option value='PENDING'>Pending</option>
                <option value='APPROVED'>Approved</option>
                <option value='SHIPPED'>Shipped</option>
                <option value='INTRANSIT'>Intransit</option>
                <option value='DELIVERED'>Delivered</option>
                <option value='CANCELLED'>Cancelled</option>
              </select>
            </div>

            {/* Add Note */}
            <div>
              <label htmlFor='note' className='block text-gray-700 font-medium'>
                Order Note
              </label>
              <textarea
                id='note'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows='4'
                placeholder='Add a note (optional)'
                className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-sm'
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
                className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-sm'
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
