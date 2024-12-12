'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Button from '../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import { FilePen, Trash2 } from 'lucide-react'

const Page = () => {
  const [discounts, setDiscounts] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedDiscount, setSelectedDiscount] = useState(null)
  const [isEditMode, setEditMode] = useState(false)
  const [newDiscount, setNewDiscount] = useState({
    code: selectedDiscount?.code || '',
    description: selectedDiscount?.description || '',
    amount: selectedDiscount?.amount || 0,
    orders: selectedDiscount?.orders || null,
    minPrice: selectedDiscount?.minPrice || null,
    type: selectedDiscount?.type || '',
    isSpecial: (selectedDiscount?.isSpecial && 'yes') || 'no',
    isWebAvailable: (selectedDiscount?.isWebAvailable && 'yes') || 'no',
    userEmails: selectedDiscount?.userEmails?.join(', ') || '',
  })
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchDiscounts()
  }, [])

  useEffect(() => {
    document.title = 'Discounts | Clothes2Wear'
  }, [])

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get('/api/customs/discounts/get')
      setDiscounts(response.data.discounts)
    } catch (error) {
      console.log(error)
    }
  }

  const addDiscount = async () => {
    // Basic validation for the fields
    if (newDiscount.code === '') {
      enqueueSnackbar('Enter Coupon Code', { variant: 'error' })
      return
    }
    if (newDiscount.code.length > 15) {
      enqueueSnackbar('Coupon Code is too long', { variant: 'error' })
      return
    }
    if (newDiscount.type === '') {
      enqueueSnackbar('Select Discount Type', { variant: 'error' })
      return
    }
    if (newDiscount.amount <= 0 || newDiscount.amount > 30000) {
      enqueueSnackbar('Enter valid Amount', { variant: 'error' })
      return
    }
    if (newDiscount.description === '') {
      enqueueSnackbar('Enter a description', { variant: 'error' })
      return
    }
    if (newDiscount.type === 'PERCENTAGE' && newDiscount.amount > 100) {
      enqueueSnackbar('Enter percentage between 1 to 100', { variant: 'error' })
      return
    }
    if (newDiscount.isSpecial === 'yes' && !newDiscount.userEmails) {
      enqueueSnackbar('Enter user email for special discount', {
        variant: 'error',
      })
      return
    }

    try {
      setSaving(true)
      const response = await axios.post('/api/customs/discounts/add', {
        code: newDiscount.code,
        type: newDiscount.type,
        orders: parseInt(newDiscount.orders),
        amount: parseFloat(newDiscount.amount),
        description: newDiscount.description,
        minPrice: parseFloat(newDiscount.minPrice),
        isSpecial: newDiscount.isSpecial === 'yes' ? true : false,
        isWebAvailable: newDiscount.isWebAvailable === 'yes' ? true : false,
        userEmails: newDiscount.userEmails || null,
      })
      setDiscounts((prev) => [...prev, response.data.discount])
      setNewDiscount({
        code: '',
        description: '',
        amount: 0,
        type: '',
        minPrice: null,
        isSpecial: 'no',
        userEmails: '',
      })
      setShowForm(false)
      enqueueSnackbar('Discount added successfully', { variant: 'success' })
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const updateDiscount = async () => {
    // Basic validation for the fields
    if (newDiscount.code === '') {
      enqueueSnackbar('Enter Coupon Code', { variant: 'error' })
      return
    }
    if (newDiscount.code.length > 15) {
      enqueueSnackbar('Coupon Code is too long', { variant: 'error' })
      return
    }
    if (newDiscount.type === '') {
      enqueueSnackbar('Select Discount Type', { variant: 'error' })
      return
    }
    if (newDiscount.amount <= 0 || newDiscount.amount > 30000) {
      enqueueSnackbar('Enter valid Amount', { variant: 'error' })
      return
    }
    if (newDiscount.description === '') {
      enqueueSnackbar('Enter a description', { variant: 'error' })
      return
    }
    if (newDiscount.type === 'PERCENTAGE' && newDiscount.amount > 100) {
      enqueueSnackbar('Enter percentage between 1 to 100', { variant: 'error' })
      return
    }
    if (newDiscount.isSpecial === 'yes' && !newDiscount.userEmails) {
      enqueueSnackbar('Enter user email for special discount', {
        variant: 'error',
      })
      return
    }

    try {
      setSaving(true)
      await axios.patch('/api/customs/discounts/update', {
        id: selectedDiscount.id,
        code: newDiscount.code,
        type: newDiscount.type,
        orders: parseInt(newDiscount.orders),
        amount: parseFloat(newDiscount.amount),
        description: newDiscount.description,
        minPrice: parseFloat(newDiscount.minPrice),
        isSpecial: newDiscount.isSpecial === 'yes' ? true : false,
        isWebAvailable: newDiscount.isWebAvailable === 'yes' ? true : false,
        userEmails: newDiscount.userEmails || null,
      })
      fetchDiscounts()
      setNewDiscount({
        code: '',
        description: '',
        amount: 0,
        type: '',
        minPrice: null,
        isSpecial: 'no',
        userEmails: '',
      })
      setShowForm(false)
      enqueueSnackbar('Discount added successfully', { variant: 'success' })
      setEditMode(false)
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const deleteDiscount = async () => {
    try {
      await axios.delete('/api/customs/discounts/delete', {
        data: { id: selectedDiscount.id },
      })

      setDiscounts((prev) =>
        prev.filter((item) => item.id !== selectedDiscount.id)
      )
      setShowDeleteModal(false)
      setSelectedDiscount(null)
      enqueueSnackbar('Discount deleted successfully', { variant: 'success' })
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Failed to delete discount', { variant: 'error' })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewDiscount((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Discounts</h2>
          <div className='flex items-center gap-2'>
            {isEditMode && showForm && (
              <Button
                variant='secondary'
                label={'Cancel Edit'}
                onClick={() => {
                  setNewDiscount({
                    code: '',
                    description: '',
                    amount: '',
                    orders: '',
                    minPrice: '',
                    type: '',
                    isSpecial: 'no',
                    userEmails: '',
                  })
                  setShowForm(false)
                  setEditMode(false)
                }}
              />
            )}
            <Button
              label={'Add a Discount'}
              onClick={() => {
                setNewDiscount({
                  code: '',
                  description: '',
                  amount: '',
                  orders: '',
                  minPrice: '',
                  type: '',
                  isSpecial: 'no',
                  userEmails: '',
                })
                setEditMode(false)
                setShowForm(true)
              }}
            />
          </div>
        </div>

        <div
          className={`transition-height ease-in-out overflow-hidden duration-500 ${
            showForm ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='border p-4 mb-4 rounded shadow-md bg-blue-50'>
            <h3 className='text-lg font-semibold mb-2'>Add New Discount</h3>
            <div className='grid grid-cols-4 gap-x-5 gap-y-3 w-full'>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Coupon Code</label>
                <input
                  type='text'
                  name='code'
                  placeholder='C2W201245'
                  value={newDiscount?.code}
                  onChange={handleChange}
                  className='border p-2 uppercase rounded w-full'
                />
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>
                  Discount Type
                </label>
                <select
                  name='type'
                  value={newDiscount.type}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                >
                  <option value=''>Select Type</option>
                  <option value='PERCENTAGE'>Percentage</option>
                  <option value='FIXED'>Fix amount</option>
                </select>
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Amount</label>
                <input
                  type='number'
                  name='amount'
                  value={newDiscount?.amount}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                  min={0}
                />
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Description</label>
                <input
                  type='text'
                  name='description'
                  value={newDiscount?.description}
                  onChange={handleChange}
                  placeholder='FLAT 20% discount'
                  className='border p-2 rounded w-full'
                />
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>
                  Minimum Price
                </label>
                <input
                  type='number'
                  name='minPrice'
                  value={newDiscount?.minPrice}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                  min={0}
                />
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>
                  Special Discount
                </label>
                <select
                  name='isSpecial'
                  value={newDiscount?.isSpecial}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                >
                  <option value={'no'}>No</option>
                  <option value={'yes'}>Yes</option>
                </select>
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>
                  Available for website
                </label>
                <select
                  name='isWebAvailable'
                  value={newDiscount?.isWebAvailable}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                >
                  <option value={'no'}>No</option>
                  <option value={'yes'}>Yes</option>
                </select>
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>
                  No. of Orders
                </label>
                <input
                  type='number'
                  name='orders'
                  value={newDiscount?.orders}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                  min={0}
                />
              </div>
            </div>

            {newDiscount?.isSpecial === 'yes' && (
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>
                  User Email for Special Discount
                </label>
                <input
                  type='email'
                  name='userEmails'
                  value={newDiscount?.userEmails}
                  onChange={handleChange}
                  placeholder='user@example.com'
                  className='border p-2 rounded w-full'
                />
              </div>
            )}

            <div className='flex gap-3'>
              <Button
                loadingText={'Saving'}
                loading={saving}
                label={'Save Discount'}
                onClick={isEditMode ? updateDiscount : addDiscount}
              />
              <Button
                label={'Close'}
                variant='secondary'
                onClick={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>

        <table className='min-w-full border-collapse border border-gray-300'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='border px-4 py-2 text-left'>Coupon Code</th>
              <th className='border px-4 py-2 text-left'>Description</th>
              <th className='border px-4 py-2 text-left'>Discount Type</th>
              <th className='border px-4 py-2 text-left'>Amount</th>
              <th className='border px-4 py-2 text-left'>Min. Price</th>
              <th className='border px-4 py-2 text-left'>
                Website availablity
              </th>
              <th className='border px-4 py-2 text-left'>User</th>
              <th className='border px-4 py-2 text-left'>Required Orders</th>
              <th className='border px-4 py-2 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id}>
                <td className='border px-4 py-2'>{discount?.code}</td>
                <td className='border px-4 py-2'>{discount?.description}</td>
                <td className='border px-4 py-2'>{discount?.type}</td>
                <td className='border px-4 py-2'>
                  {discount?.type === 'FIXED' ? '₹' : ''}
                  {discount?.type === 'FIXED'
                    ? discount?.amount.toFixed(2)
                    : discount?.amount}
                  {discount.type === 'PERCENTAGE' ? '%' : ''}
                </td>
                <td className='border px-4 py-2'>
                  ₹{discount?.minPrice?.toFixed(2)}
                </td>
                <td className='border px-4 py-2'>
                  {discount?.isWebAvailable ? 'Available' : 'Not available'}
                </td>
                <td
                  className={`border ${
                    !discount?.isSpecial && 'bg-gray-300'
                  } px-4 py-2`}
                >
                  {discount?.userEmails &&
                    discount?.userEmails?.map((email, index) => (
                      <span key={index}>
                        {email}
                        {index < discount?.userEmails?.length - 1 && ', '}
                      </span>
                    ))}
                </td>
                <td className='border px-4 py-2'>{discount?.orders}</td>
                <td className='border px-4 py-2'>
                  <div className='flex gap-3 justify-center items-center'>
                    <Trash2
                      className='text-red-600 cursor-pointer'
                      onClick={() => {
                        setSelectedDiscount(discount)
                        setShowDeleteModal(true)
                      }}
                      size={22}
                    />
                    <FilePen
                      onClick={() => {
                        setSelectedDiscount(discount)
                        setNewDiscount({
                          code: discount.code,
                          description: discount.description,
                          amount: discount.amount,
                          orders: discount.orders,
                          minPrice: discount.minPrice,
                          type: discount.type,
                          isSpecial: discount.isSpecial === true ? 'yes' : 'no',
                          isWebAvailable:
                            discount.isWebAvailable === true ? 'yes' : 'no',
                          userEmails: discount.userEmails?.join(', ') || '',
                        })
                        setShowForm(true)
                        setEditMode(true)
                      }}
                      className='text-blue-800 cursor-pointer'
                      size={22}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <DeleteModal
          isOpen={true}
          onClose={() => setShowDeleteModal(false)}
          onDelete={deleteDiscount}
          title={'Delete Discount?'}
        />
      )}
    </Layout>
  )
}

export default Page
