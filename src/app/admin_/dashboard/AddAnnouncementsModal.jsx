/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@/app/Components/CustomModal'
import React from 'react'

const AddAnnouncementsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AddAnnouncementsModal
