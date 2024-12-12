/* eslint-disable react/prop-types */
import { cdnPath } from '@/app/Components/cdnPath'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@/app/Components/CustomModal'
import React from 'react'

const ShowImageModal = ({ isOpen, onClose, image }) => {
  return (
    <div className='w-screen h-screen'>
      <Modal size={'full'} isOpen={isOpen}>
        <ModalHeader>
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody className={'w-full scrollbar-hide lg:h-screen'}>
          <div className='flex justify-center items-center scrollbar-hide max-w-full lg:h-screen'>
            <img
              src={cdnPath + image}
              alt='Modal Content'
              className='max-w-full h-full object-cover rounded-md shadow-lg'
            />
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ShowImageModal
