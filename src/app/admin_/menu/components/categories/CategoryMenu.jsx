'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import DeleteModal from '@/app/Components/DeleteModal'
import AddEditCategory from './AddEditCategory'
import SubCategories from './SubCategories'

const CategoryMenu = () => {
  const [expandSection, setExpandSection] = useState(false)
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [showSubCategories, setShowSubCategories] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const [fetchedItems, setFetchedItems] = useState([])

  async function fetchData() {
    try {
      const response = await axios.get('/api/admin/menu?type=categories')
      setFetchedItems(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onDelete = async () => {
    try {
      const response = await axios.delete(`/api/admin/menu/categories`, {
        params: { id: selectedItem.id },
      })
      setSelectedItem(null)
      enqueueSnackbar(response.data.message, { variant: 'success' })
      fetchData()
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Error deleting item:', error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  return (
    <div className='mb-4 text-white border border-blue-800 rounded-sm'>
      <div
        className='p-4 cursor-pointer bg-blue-800 flex items-center justify-between font-semibold'
        onClick={() => setExpandSection(!expandSection)}
      >
        Category Menu
        {expandSection ? <ChevronUp /> : <ChevronDown />}
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          expandSection ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='p-4'>
          {/* Table of existing data */}
          <div className='mb-2'>
            <Button
              onClick={() => {
                setShowAddEditModal(true)
                setIsEditMode(false)
                setSelectedItem(null)
              }}
              label={'Add Category'}
            />
          </div>

          <div className='overflow-scroll max-h-[400px] border border-blue-700 scrollbar-hide'>
            {fetchedItems && (
              <table className='min-w-full text-blue-800 border-collapse'>
                <thead>
                  <tr className='bg-blue-800 text-white'>
                    <th className='border px-4 py-2 text-left'>Data</th>
                    <th className='border px-4 py-2 text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchedItems.length > 0 &&
                    fetchedItems.map((item, index) => (
                      <tr key={index}>
                        <td className='border px-4 py-2 capitalize'>
                          {item?.name}
                        </td>
                        <td className='border flex justify-center py-2'>
                          <div className='flex items-center justify-center gap-2'>
                            <Button
                              onClick={() => {
                                setSelectedItem(item)
                                setShowSubCategories(true)
                                setIsEditMode(false)
                              }}
                              label={'Sub Categories'}
                            />
                            <Button
                              onClick={() => {
                                setSelectedItem(item)
                                setShowAddEditModal(true)
                                setIsEditMode(true)
                              }}
                              label={'Edit'}
                            />
                            <Button
                              onClick={() => {
                                setSelectedItem(item)
                                setShowDeleteModal(true)
                              }}
                              label={'Delete'}
                              variant='error'
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>

          {showAddEditModal && (
            <AddEditCategory
              isOpen={true}
              onClose={() => setShowAddEditModal(false)}
              refresh={fetchData}
              item={selectedItem}
              isEdit={isEditMode}
            />
          )}
          {showSubCategories && (
            <SubCategories
              isOpen={true}
              onClose={() => setShowSubCategories(false)}
              refresh={fetchData}
              category={selectedItem}
              isEdit={isEditMode}
            />
          )}
          {showDeleteModal && (
            <DeleteModal
              isOpen={true}
              onClose={() => setShowDeleteModal(false)}
              onDelete={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryMenu
