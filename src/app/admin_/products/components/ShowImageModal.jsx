/* eslint-disable react/prop-types */
import { cdnPath } from '@/app/Components/cdnPath'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
} from '@/app/Components/CustomModal'
import React from 'react'

const ShowImageModal = ({ isOpen, onClose, imageUrl }) => {
  return (
    <Modal isOpen={isOpen} size={'full'}>
      <ModalCloseButton onClick={onClose} />
      <ModalBody className={'w-full'}>
        <div className='flex items-center w-full justify-center h-full'>
          <img
            src={cdnPath + imageUrl}
            className='max-h-[90vh] object-contain'
            alt={imageUrl}
          />
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ShowImageModal
