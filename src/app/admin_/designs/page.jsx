'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Button from '../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'
import ButtonsModal from './ButtonsModal.jsx'

const Page = () => {
  const [buttons, setButtons] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showButtonModal, setShowButtonModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    fetchButtons()
  }, [])

  const fetchButtons = async () => {
    try {
      const response = await axios.get('/api/admin/designs/button')
      setButtons(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    document.title = 'Design Configuration | Clothes2Wear'
  }, [])

  const deleteShowcase = async () => {
    try {
      const response = await axios.delete('/api/admin/designs/button', {
        data: { id: selectedItem.id },
      })

      if (response.status === 200) {
        const deleteImage = await deleteImageFromCDN(selectedItem.imageUrl)
        console.log(deleteImage)
      }

      setButtons((prev) => prev.filter((item) => item.id !== selectedItem.id))
      setShowDeleteModal(false)
      setSelectedItem(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>
            Design Configuration
          </h2>
          <div className='flex items-center gap-2'>
            <Button
              label={'Add Button'}
              onClick={() => {
                setShowButtonModal(true)
                setEditMode(false)
                setSelectedItem(null)
              }}
            />
          </div>
        </div>

        <table className='min-w-full border-collapse border border-gray-300'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='border px-4 py-2 text-left'>Button</th>
              <th className='border px-4 py-2 text-left'>Icon</th>
              <th className='border px-4 py-2 text-left'>Link</th>
              <th className='border px-4 py-2 text-center w-28'>Action</th>
            </tr>
          </thead>
          <tbody>
            {buttons.length > 0 &&
              buttons.map((item, index) => (
                <tr key={index} className='border-b'>
                  <td className='border px-4 py-2'>{item?.name}</td>
                  <td className='border px-4 py-2'>
                    <img
                      width={30}
                      src={item?.iconUrl}
                      alt={item?.iconUrl}
                      className='w-18 h-18 object-cover rounded'
                    />
                    {/* <img
                      src={`https://cdn.thefashionsalad.com/clothes2wear/${item?.iconUrl}`}
                      alt={item?.iconUrl}
                      className='w-18 h-32 object-cover rounded'
                    /> */}
                  </td>
                  <td className='border px-4 py-2'>
                    <a
                      href={item?.hyperLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 underline'
                    >
                      {item?.link}
                    </a>
                  </td>
                  <td className='border px-2 text-center py-2'>
                    <div className='flex flex-col gap-2'>
                      <Button
                        onClick={() => {
                          setSelectedItem(item)
                          setShowButtonModal(true)
                          setEditMode(true)
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
        {showDeleteModal && (
          <DeleteModal
            isOpen={true}
            onClose={() => setShowDeleteModal(false)}
            onDelete={() => deleteShowcase()}
          />
        )}
        {showButtonModal && (
          <ButtonsModal
            isOpen={true}
            onClose={() => setShowButtonModal(false)}
            item={selectedItem}
            refresh={fetchButtons}
            editMode={editMode}
          />
        )}
      </div>
    </Layout>
  )
}

export default Page
