'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import { FilePen, Trash2, Upload, X } from 'lucide-react'
import Image from 'next/image'
import ImageCroper from '@/app/Components/ImageCroper'
import EditModal from './EditModal'
import { cdnPath } from '@/app/Components/cdnPath'
import { uploadImageToCDN } from '../../../../../utils/uploadImageToCDN'
import { deleteImageFromCDN } from '../../../../../utils/deleteImageFromCDN'
import Layout from '../../components/Layout'
import Button from '../../components/Button'

const SizeChatPage = () => {
  const [items, setItems] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [saving, setSaving] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    imageUrl: '',
  })
  const [image, setImage] = useState({
    blob: null,
    fileName: '',
    imageUrl: null,
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/products/size-chart/get')
      setItems(response.data.sizeCharts)
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to handle task!'
      )
    }
  }

  useEffect(() => {
    document.title = 'Size Chart | Clothes2Wear'
  }, [])

  const handleFile = (blob, croppedImageUrl, fileName) => {
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
  }

  const handleAddItem = async () => {
    if (newItem.title === '') {
      enqueueSnackbar('Enter Title', { variant: 'error' })
      return
    }
    if (image.fileName === '') {
      enqueueSnackbar('Add image', { variant: 'error' })
      return
    }
    try {
      setSaving(true)
      const imageUrl = await uploadImageToCDN(image.blob, image.fileName)

      if (imageUrl) {
        const response = await axios.post('/api/products/size-chart/add', {
          title: newItem.title,
          imageUrl: imageUrl,
        })
        setItems((prev) => [...prev, response.data.sizeChart])
        setNewItem({ title: '', imageUrl: '' })
        setImage({
          blob: null,
          fileName: '',
          imageUrl: null,
        })
      }
      setShowForm(false)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteItem = async () => {
    try {
      const response = await axios.delete('/api/products/size-chart/delete', {
        data: { id: selectedItem.id },
      })

      if (response.status === 200) {
        await deleteImageFromCDN(selectedItem.imageUrl)
      }

      setItems((prev) => prev.filter((item) => item.id !== selectedItem.id))
      setShowDeleteModal(false)
      setSelectedItem(null)
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to handle task!'
      )
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Size Charts</h2>
          <div className='flex items-center gap-2'>
            <Button
              label={'Add a size chart'}
              onClick={() => setShowForm(!showForm)}
            />
          </div>
        </div>

        <div
          className={`transition-height ease-in-out overflow-hidden duration-500 ${
            showForm ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='border p-4 mb-4 bg-white rounded'>
            <h3 className='text-lg font-semibold mb-2'>Add New Size Chart</h3>
            <div className='grid grid-cols-2 gap-5'>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Label</label>
                <input
                  type='text'
                  name='title'
                  value={newItem.title}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                />
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>
                  Size Chart (Image)
                </label>
                <button
                  onClick={() => setShowImageCroper(true)}
                  className='border p-2 rounded flex justify-center w-full'
                >
                  <Upload size={19} />
                </button>
              </div>
            </div>
            {image.imageUrl && (
              <div className='relative'>
                <Image
                  width={160}
                  height={90}
                  src={image.imageUrl}
                  alt='Image'
                  className='py-2 pb-4'
                />
                <X
                  className='text-red-600 absolute top-3 left-1 cursor-pointer'
                  onClick={() => {
                    setImage({
                      blob: '',
                      imageUrl: '',
                      fileName: '',
                    })
                  }}
                  size={35}
                />
              </div>
            )}
            <div className='flex gap-3'>
              <Button
                loadingText={'Saving'}
                loading={saving}
                label={'Save'}
                onClick={handleAddItem}
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
              <th className='border px-4 py-2 text-left'>Label</th>
              <th className='border px-4 py-2 text-left'>Image</th>
              <th className='border px-4 py-2 text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map((item, index) => (
                <tr key={index} className='border-b'>
                  <td className='border px-4 py-2'>{item?.title}</td>
                  <td className='border px-4 py-2'>
                    <img
                      src={`${cdnPath}${item?.imageUrl}`}
                      alt={item?.imageUrl}
                      className='w-18 h-32 object-cover rounded'
                    />
                  </td>
                  <td className='border px-2 text-center py-2'>
                    <div className='flex flex-col justify-between items-center gap-4'>
                      <FilePen
                        onClick={() => {
                          setShowEditModal(true)
                          setSelectedItem(item)
                        }}
                        className='text-blue-800 cursor-pointer'
                      />
                      <Trash2
                        onClick={() => {
                          setSelectedItem(item)
                          setShowDeleteModal(true)
                        }}
                        className='text-red-500 cursor-pointer'
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
            onDelete={() => handleDeleteItem()}
          />
        )}
        {showImageCroper && (
          <ImageCroper
            isOpen={true}
            onClose={() => setShowImageCroper(false)}
            aspectRatio={9 / 12}
            onCropComplete={handleFile}
          />
        )}
        {showEditModal && (
          <EditModal
            isOpen={true}
            onClose={() => setShowEditModal(false)}
            selectedItem={selectedItem}
            fetchItems={fetchItems}
          />
        )}
      </div>
    </Layout>
  )
}

export default SizeChatPage
