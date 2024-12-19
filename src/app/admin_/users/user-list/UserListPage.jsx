'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Loading from '../../components/Loading'
import { enqueueSnackbar } from 'notistack'
import Pagination from '../../components/Pagination'
import Button from '../../components/Button'
import { Input, Select } from '../../products/components/SimilarProruct'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import {
  Ban,
  BellPlus,
  Ellipsis,
  Info,
  Lock,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import BanUserModal from './BanUserModal'
import DeleteModal from '@/app/Components/DeleteModal'
import SendNotificationModal from './SendNotificationModal'
import Layout from '../../components/Layout'
import ErrorComponent from '../../components/ErrorComponent'

const page = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [userRole, setUserRole] = useState('')
  const [userList, setUserList] = useState([])
  const [fetching, setFetching] = useState(false)
  const [currentPage, setCurrentPage] = useState(null)
  const [totalPage, setTotalPages] = useState(null)

  const [banModalOpen, setBanModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [notificationModalOpen, setNotificationModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [error, setError] = useState(null)
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const router = useRouter()

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  const fetchUserList = async (page) => {
    try {
      setFetching(true)
      const params = {
        searchQuery: debouncedQuery,
        userRole,
        page: page || 1,
      }
      const response = await axios.get(`/api/users/get/filter`, { params })
      setUserList(response.data.users)
      setCurrentPage(parseInt(response.data.currentPage))
      setTotalPages(parseInt(response.data.totalPages))
    } catch (error) {
      console.log(error)
      setError(error.message || 'An unexpected errir occured!')
    } finally {
      setFetching(false)
    }
  }

  const handleChangeUserStatus = async (id, status) => {
    try {
      const response = await axios.patch('/api/users/update/change-status', {
        id,
        status,
      })
      enqueueSnackbar(response.data.message, { variant: 'success' })
      fetchUserList()
      setSelectedUser(null)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSelectedUser(null)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`/api/users/delete`, {
        id,
      })
      enqueueSnackbar(response.data.message, { variant: 'success' })
      fetchUserList()
      setSelectedUser(null)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSelectedUser(null)
    }
  }

  const handlePreviousPage = () => {
    const newPage = currentPage - 1
    setCurrentPage(newPage)
    fetchUserList(newPage)
  }

  const handleNextPage = () => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)
    fetchUserList(newPage)
  }

  useEffect(() => {
    fetchUserList()
  }, [debouncedQuery, userRole])

  const handleBanUser = async () => {
    handleChangeUserStatus(selectedUser.id, 'BANNED')
    setBanModalOpen(false)
  }

  const handleDeleteUser = async () => {
    handleDelete(selectedUser.id)
    setDeleteModalOpen(false)
  }

  if (error) {
    return (
      <Layout>
        <ErrorComponent message={error} retry={fetchUserList} />
      </Layout>
    )
  }

  return (
    <>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between gap-2 mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>User List</h2>
          <div className='flex items-center gap-4'>
            <Button
              onClick={() => router.push('/admin_/users/create-user')}
              label={'Add User'}
            />
          </div>
        </div>

        {/* Filters */}
        <div className='flex flex-wrap my-2 items-end gap-2'>
          <Input
            type='text'
            placeholder='Search by name'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select onChange={(e) => setUserRole(e.target.value)}>
            <option value=''>Select role</option>
            <option value='BUYER'>Buyer</option>
            <option value='SELLER'>Seller</option>
            <option value='ADMIN'>Admin</option>
            <option value='STAFF'>Staff</option>
          </Select>
        </div>

        {/* Orders Table */}
        {fetching ? (
          <Loading />
        ) : userList.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse shadow-lg'>
              <thead>
                <tr className='bg-blue-800 text-white'>
                  <th className='p-2 border border-gray-300'>SL</th>
                  <th className='p-2 border border-gray-300'>Full Name</th>
                  <th className='p-2 border border-gray-300'>Email</th>
                  <th className='p-2 border border-gray-300'>Role</th>
                  <th className='p-2 border border-gray-300'>Status</th>
                  <th className='p-2 border border-gray-300'>Registered on</th>
                  <th className='p-2 border border-gray-300 w-40'>Action</th>
                </tr>
              </thead>
              <tbody>
                {userList.length > 0 &&
                  userList.map((user, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      <td className='p-2 border text-center border-gray-300'>
                        {index + 1}
                      </td>
                      <td className='p-2 border capitalize border-gray-300'>
                        <span
                          onClick={() =>
                            router.push(`/admin_/users/single-user/${user.id}`)
                          }
                          className='hover:text-blue-800 hover:underline cursor-pointer'
                        >
                          {user.firstName + ' ' + user.lastName}
                        </span>
                      </td>
                      <td className='p-2 border border-gray-300'>
                        <span
                          onClick={() =>
                            router.push(`/admin_/users/single-user/${user.id}`)
                          }
                          className='hover:text-blue-800 hover:underline cursor-pointer'
                        >
                          {user.email}
                        </span>
                      </td>
                      <td className='p-2 border capitalize border-gray-300'>
                        {user.role}
                      </td>
                      <td
                        className={`p-2 border capitalize border-gray-300 ${
                          user.status === 'ACTIVE'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {user.status}
                      </td>
                      <td className='p-2 border capitalize border-gray-300'>
                        {new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          hour12: true,
                        }).format(new Date(user.createdAt))}
                      </td>
                      <td className={`p-2 border border-gray-300 text-center`}>
                        <div className='flex justify-center'>
                          <Dropdown>
                            <DropdownTrigger>
                              <Ellipsis className='cursor-pointer' />
                            </DropdownTrigger>
                            <DropdownMenu
                              className='p-3 rounded-md'
                              aria-label='Static Actions'
                            >
                              <DropdownItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setNotificationModalOpen(true)
                                }}
                                className='py-2 px-4 hover:bg-gray-300 rounded-sm'
                              >
                                <div className='flex items-center gap-2'>
                                  <BellPlus size={15} />
                                  <p>Send Notification</p>
                                </div>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setBanModalOpen(true)
                                }}
                                className='py-2 px-4 hover:bg-gray-300 rounded-sm'
                              >
                                <div className='flex items-center gap-2'>
                                  <Ban size={15} />
                                  <p>Ban</p>
                                </div>
                              </DropdownItem>
                              <DropdownItem className='py-2 px-4 hover:bg-gray-300 rounded-sm'>
                                {user.status === 'ACTIVE' ? (
                                  <p
                                    onClick={() =>
                                      handleChangeUserStatus(
                                        user.id,
                                        'DEACTIVE'
                                      )
                                    }
                                    label={'Deactive'}
                                    className='flex items-center gap-2'
                                  >
                                    <Lock size={15} />
                                    <p>Deactive</p>
                                  </p>
                                ) : (
                                  <p
                                    onClick={() =>
                                      handleChangeUserStatus(user.id, 'ACTIVE')
                                    }
                                    label={'Active'}
                                    className='flex items-center gap-2'
                                  >
                                    <ShieldCheck size={15} />
                                    <p>Active</p>
                                  </p>
                                )}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  router.push(
                                    `/admin_/users/single-user/${user.id}`
                                  )
                                }
                                className='text-yellow-500 py-2 px-4 hover:bg-gray-300 rounded-sm'
                              >
                                <div className='flex items-center gap-2'>
                                  <Info size={15} />
                                  <p>Details</p>
                                </div>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setDeleteModalOpen(true)
                                }}
                                className='text-red-600 py-2 px-4 hover:bg-red-600 hover:text-white rounded-sm'
                              >
                                <div className='flex items-center gap-2'>
                                  <Trash2 size={15} />
                                  <p>Delete</p>
                                </div>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onPreviousClick={handlePreviousPage}
              onNextClick={handleNextPage}
            />
            {banModalOpen && (
              <BanUserModal
                isOpen={true}
                onClose={() => setBanModalOpen(false)}
                onBanSubmit={handleBanUser}
              />
            )}
            {notificationModalOpen && (
              <SendNotificationModal
                isOpen={true}
                onClose={() => setNotificationModalOpen(false)}
                userId={selectedUser.id}
              />
            )}
            {deleteModalOpen && (
              <DeleteModal
                isOpen={true}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={handleDeleteUser}
              />
            )}
          </div>
        ) : (
          <div className='bg-blue-50 shadow-md w-full p-5 rounded-md flex items-center'>
            <p>No user found</p>
          </div>
        )}
      </div>
    </>
  )
}

export default page
