'use client'

import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import CreateEditStaffModal from './CreateEditStaffModal'
import axios from 'axios'
import { FilePen } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'

const ManageStaffPage = () => {
  const [showCreateEditModal, setShowCreateEditModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [staffs, setStaffs] = useState([])

  const fetchStaffs = async () => {
    try {
      const response = await axios.get('/api/staff')

      setStaffs(response.data.staffs)
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to handle task!'
      )
    }
  }

  useEffect(() => {
    fetchStaffs()
  }, [])
  return (
    <>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Manage Staff</h2>
          <div className='flex items-center gap-2'>
            <Button
              onClick={() => {
                setSelectedStaff(null)
                setShowCreateEditModal(true)
              }}
              label={'Create a Staff'}
            />
          </div>
        </div>
        <div>
          <table className='min-w-full border-collapse border border-gray-300'>
            <thead className='bg-blue-800 text-white'>
              <tr>
                <th className='border px-4 py-2 text-left'>Full name</th>
                <th className='border px-4 py-2 text-left'>Email</th>
                <th className='border px-4 py-2 text-left'>Privileges</th>
                <th className='border px-4 py-2 text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {staffs &&
                staffs.length > 0 &&
                staffs.map((item, index) => (
                  <tr key={index} className='border-b'>
                    <td className='border px-4 py-2'>
                      {item?.firstName} {item?.lastName}
                    </td>
                    <td className='border px-4 py-2'>{item?.email}</td>
                    <td className='border px-4 py-2'>
                      <div className='flex flex-wrap gap-2 capitalize'>
                        {item?.UserPrivilege.map((prv, index) => (
                          <span
                            className='text-xs py-[6px] px-4 rounded-full bg-blue-800 text-white'
                            key={index}
                          >
                            {prv.privilege.name.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className='border px-2 text-center py-2'>
                      <div className='flex justify-center'>
                        <FilePen
                          onClick={() => {
                            setSelectedStaff(item)
                            setShowCreateEditModal(true)
                          }}
                          className='text-blue-600 cursor-pointer'
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showCreateEditModal && (
        <CreateEditStaffModal
          isOpen={true}
          onClose={() => setShowCreateEditModal(false)}
          refresh={() => fetchStaffs()}
          staff={selectedStaff}
        />
      )}
    </>
  )
}

export default ManageStaffPage
