/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import React, { useState, useEffect } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import Button from '../components/Button'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'

const CreateEditStaffModal = ({ isOpen, onClose, staff, refresh }) => {
  const [privileges, setPrivileges] = useState([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    privileges: [],
  })
  const [submitting, setSubmitting] = useState(false)

  const fetchPrivileges = async () => {
    try {
      const response = await axios.get('/api/privileges')
      setPrivileges(response.data.privileges)

      if (staff) {
        const selectedPrivileges = response.data.privileges
          .filter((privilege) =>
            staff.UserPrivilege.some(
              (staffPrivilege) =>
                staffPrivilege.privilege.name === privilege.name
            )
          )
          .map((privilege) => privilege.id)

        setFormData((prev) => ({
          ...prev,
          privileges: selectedPrivileges,
        }))
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchPrivileges()
  }, [])

  useEffect(() => {
    if (staff) {
      setFormData({
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        mobileNumber: staff.mobileNumber,
        privileges: staff.UserPrivilege.map(
          (privilege) => privilege.privilege.id
        ),
      })
    }
  }, [staff])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePrivilegeToggle = (privilegeId) => {
    setFormData({
      ...formData,
      privileges: formData.privileges.includes(privilegeId)
        ? formData.privileges.filter((id) => id !== privilegeId)
        : [...formData.privileges, privilegeId],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSubmitting(true)
      let response
      if (staff) {
        response = await axios.put('/api/staff', {
          id: staff?.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          privileges: formData.privileges,
        })
      } else {
        response = await axios.post('/api/staff', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          privileges: formData.privileges,
        })
      }

      if (response.status === 200) {
        enqueueSnackbar(response.data.message, { variant: 'success' })
        onClose()
        refresh()
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Something went wrong',
        { variant: 'error' }
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal size={'6xl'} isOpen={isOpen}>
      <ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <h3 className='text-2xl font-semibold text-gray-700'>
          {staff ? 'Edit Staff' : 'Create Staff'}
        </h3>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Staff Name */}
          <div className={`grid grid-cols-4 gap-4 ${staff && 'grid-cols-3'}`}>
            <div className='flex flex-col'>
              <label htmlFor='firstName' className='text-gray-600'>
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                required
                className='mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='First Name'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='lastName' className='text-gray-600'>
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                required
                className='mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Last Name'
              />
            </div>

            {/* Email */}
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-gray-600'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Email'
              />
            </div>

            {/* Password */}
            {!staff && (
              <div className='flex flex-col'>
                <label htmlFor='password' className='text-gray-600'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required={!staff}
                  className='mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Password'
                />
              </div>
            )}
          </div>

          {/* Privileges */}
          <div>
            <h4 className='text-xl font-semibold text-gray-700'>
              Assign Privileges
            </h4>
            <div className='grid grid-cols-5 gap-4 mt-4'>
              {privileges.map((privilege) => (
                <div
                  key={privilege.id}
                  className='flex items-center space-x-2 cursor-pointer'
                  onClick={() => handlePrivilegeToggle(privilege.id)} // Pass ID instead of name
                >
                  <div
                    className={`p-3 rounded-full ${
                      formData.privileges.includes(privilege.id)
                        ? 'bg-blue-800 text-white'
                        : 'bg-gray-300'
                    }`}
                  >
                    {formData.privileges.includes(privilege.id) ? (
                      <CheckCircle size={20} />
                    ) : (
                      <XCircle size={20} />
                    )}
                  </div>
                  <span className='text-gray-600 capitalize'>
                    {privilege.name.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <ModalFooter>
            <Button onClick={onClose} label='Cancel' variant='secondary' />
            <Button
              loading={submitting}
              type='submit'
              label={staff ? 'Save Changes' : 'Create Staff'}
              variant='primary'
            />
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default CreateEditStaffModal
