/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@/app/Components/CustomModal'
import React from 'react'

const OtpModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody></ModalBody>
    </Modal>
  )
}

export default OtpModal
