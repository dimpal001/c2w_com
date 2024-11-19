'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Button from '../components/Button'
import axios from 'axios'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import { ChevronDown, ChevronUp } from 'lucide-react'

const dataSections = [
  { title: 'Colors', data: [], type: 'colors' },
  { title: 'Sizes', data: [], type: 'sizes' },
  { title: 'Categories', data: [], type: 'categories' },
  { title: 'Types', data: [], type: 'customer-types' },
]

const Page = () => {
  const [sections, setSections] = useState(dataSections)
  const [expandedSection, setExpandedSection] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [newColorName, setNewColorName] = useState('')
  const [newColorValue, setNewColorValue] = useState('#000000')
  const [newItem, setNewItem] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedSection, setSelectedSection] = useState(null)

  useEffect(() => {
    document.title = 'Menu Management | Clothes2Wear'
  }, [])

  useEffect(() => {
    // Fetch data from the backend for each section
    async function fetchData() {
      try {
        const updatedSections = await Promise.all(
          dataSections.map(async (section) => {
            const response = await axios.get(
              `/api/admin/menu?type=${section.type}`
            )
            return { ...section, data: response.data }
          })
        )
        setSections(updatedSections)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleToggle = (title) => {
    setExpandedSection((prev) => (prev === title ? null : title))
  }

  const handleAddColor = async () => {
    try {
      const response = await axios.post('/api/admin/menu/colors', {
        name: newColorName,
        code: newColorValue,
      })

      const newColor = response.data.color

      setSections((prevSections) =>
        prevSections.map((section) =>
          section.title === 'Colors'
            ? { ...section, data: [...section.data, newColor] }
            : section
        )
      )

      setNewColorName('')
      setNewColorValue('#000000')
    } catch (error) {
      console.error('Error adding color:', error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  const handleAddItem = async (sectionTitle, type) => {
    try {
      const response = await axios.post(`/api/admin/menu/${type}`, {
        name: newItem,
      })

      let newData = response.data
      console.log(newData)

      setSections((prevSections) =>
        prevSections.map((section) =>
          section.title === sectionTitle
            ? { ...section, data: [...section.data, response.data] }
            : section
        )
      )

      console.log(sections)
      setNewItem('')
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
      setNewItem('')
    }
  }

  const handleDeleteItem = async (type, itemId) => {
    console.log(type)
    try {
      // Delete the item from the backend
      await axios.delete(`/api/admin/menu/${type}`, {
        params: { id: itemId },
      })

      // Update the sections state by removing the deleted item
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.type === type
            ? {
                ...section,
                data: section.data.filter((item) => item.id !== itemId),
              }
            : section
        )
      )
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100'>
        <h2 className='text-xl font-semibold mb-6 text-blue-800'>Menus</h2>
        {sections.map((section) => (
          <div
            key={section.title}
            className='mb-4 text-white border border-blue-800 rounded-sm'
          >
            <div
              className='p-4 cursor-pointer bg-blue-800 flex items-center justify-between font-semibold'
              onClick={() => handleToggle(section.title)}
            >
              {section.title}
              {expandedSection === section.title ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </div>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                expandedSection === section.title
                  ? 'max-h-[1000px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className='p-4'>
                {/* Table of existing data */}
                <table className='min-w-full text-blue-800 border-collapse'>
                  <thead>
                    <tr className='bg-blue-800 text-white'>
                      <th className='border px-4 py-2 text-left'>Data</th>
                      {section.title === 'Colors' && (
                        <th className='border px-4 py-2 text-left'>Color</th>
                      )}
                      <th className='border px-4 py-2 text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.data.map((item, index) => (
                      <tr key={index}>
                        <td className='border uppercase px-4 py-2'>
                          {item?.name}
                        </td>
                        {section.title === 'Colors' && (
                          <td className='border px-4 py-2'>
                            <div
                              className='w-6 h-6 rounded-full'
                              style={{ backgroundColor: item.code }}
                            />
                          </td>
                        )}
                        <td className='border flex justify-center py-2'>
                          <Button
                            onClick={() => {
                              setSelectedItem(item)
                              setSelectedSection(section)
                              setShowDeleteModal(true)
                            }}
                            label={'Delete'}
                            variant='error'
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Add new data section */}
                <div className='mt-4 text-blue-800'>
                  {section.title === 'Colors' ? (
                    <>
                      <div className='flex gap-4 border p-3 items-center'>
                        <label className='font-semibold'>Add New Color</label>
                        <input
                          type='text'
                          placeholder='Enter color name'
                          value={newColorName}
                          onChange={(e) => setNewColorName(e.target.value)}
                          className='border border-gray-300 p-2 rounded'
                        />
                        <input
                          type='color'
                          value={newColorValue}
                          onChange={(e) => setNewColorValue(e.target.value)}
                          className='border border-gray-300 rounded-sm'
                        />
                        <button
                          onClick={handleAddColor}
                          className='px-4 py-2 bg-blue-800 text-white rounded-sm'
                        >
                          Add Color
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <label className='block mb-2 font-semibold'>
                        Add New {section.title}
                      </label>
                      <input
                        type='text'
                        placeholder={`Enter new ${section.title.toLowerCase()}`}
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className='border border-gray-300 p-2 rounded-sm w-full mb-2'
                      />
                      <button
                        onClick={() =>
                          handleAddItem(section.title, section.type)
                        }
                        className='px-4 py-2 bg-blue-800 text-white rounded-sm'
                      >
                        Add
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {showDeleteModal && (
          <DeleteModal
            isOpen={true}
            onClose={() => setShowDeleteModal(false)}
            onDelete={() =>
              handleDeleteItem(selectedSection.type, selectedItem.id)
            }
          />
        )}
      </div>
    </Layout>
  )
}

export default Page
