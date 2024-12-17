'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Button from '../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import ImageCroper from '@/app/Components/ImageCroper'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'
import { FilePen, Trash2, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'
import EditModal from './EditModal'
import { cdnPath } from '@/app/Components/cdnPath'

const Page = () => {
  const [items, setItems] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newItem, setNewItem] = useState({
    text: '',
    imageUrl: '',
    hyperLink: '',
  })
  const [image, setImage] = useState({
    blob: null,
    fileName: '',
    imageUrl: null,
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchitems()
  }, [])

  const fetchitems = async () => {
    try {
      const response = await axios.get('/api/customs/quotes')
      setItems(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFile = (blob, croppedImageUrl, fileName) => {
    console.log(blob, croppedImageUrl, fileName)
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
  }

  const addExclusiveCollection = async () => {
    if (image.fileName === '' && newItem.text === '') {
      enqueueSnackbar('Add an image or text', { variant: 'error' })
      return
    }
    if (newItem.hyperLink === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }

    try {
      setSaving(true)
      const imageUrl = await uploadImageToCDN(image.blob, image.fileName)

      if (imageUrl) {
        const response = await axios.post('/api/customs/quotes', {
          imageUrl: imageUrl,
          hyperLink: newItem.hyperLink,
          text: newItem.text,
        })
        setItems((prev) => [...prev, response.data])
        setNewItem({
          imageUrl: '',
          hyperLink: '',
          text: '',
        })
      }
      setShowForm(false)
      setImage({
        blob: null,
        imageUrl: null,
        fileName: '',
      })
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    document.title = 'Manage Quotes | Clothes2Wear'
  }, [])

  const deleteQuote = async () => {
    try {
      const response = await axios.delete('/api/customs/quotes', {
        params: { id: selectedItem.id },
      })

      if (response.status === 200) {
        const deleteImage = await deleteImageFromCDN(selectedItem.imageUrl)
        console.log(deleteImage)
      }

      setItems((prev) => prev.filter((item) => item.id !== selectedItem.id))
      setShowDeleteModal(false)
      setSelectedItem(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewItem((prev = []) => ({ ...prev, [name]: value }))
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Manage Quotes</h2>
          <div className='flex items-center gap-2'>
            <Button
              label={'Add a Quote'}
              onClick={() => setShowForm(!showForm)}
            />
          </div>
        </div>

        <div
          className={`transition-height ease-in-out overflow-hidden duration-500 ${
            showForm ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='border p-4 mb-4 rounded'>
            <div className='grid grid-cols-3 gap-3'>
              <div>
                <label className='block font-semibold'>Image</label>
                <button
                  onClick={() => setShowImageCroper(true)}
                  className='border bg-white p-2 rounded flex justify-center w-full'
                >
                  <Upload size={19} />
                </button>
              </div>
              <div>
                <label className='block font-semibold'>Title</label>
                <input
                  type='text'
                  name='text'
                  value={newItem.text}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                />
              </div>
              <div>
                <label className='block font-semibold'>Hyper Link</label>
                <input
                  type='text'
                  name='hyperLink'
                  value={newItem.hyperLink}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                />
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
            <div className='flex mt-3 gap-3'>
              <Button
                loading={saving}
                loadingText={'Saving'}
                label={'Save'}
                onClick={addExclusiveCollection}
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
              <th className='border px-4 py-2 text-left'>Image</th>
              <th className='border px-4 py-2 text-left'>Text</th>
              <th className='border px-4 py-2 text-left'>Hyper Link</th>
              <th className='border px-4 py-2 text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.length > 0 &&
              items.map((item, index) => (
                <tr key={index} className='border-b'>
                  <td className='border px-4 py-2'>
                    <img
                      src={cdnPath + item?.imageUrl}
                      alt={item.text}
                      className='w-[140px]  border object-cover rounded'
                    />
                  </td>
                  <td className='border px-4 py-2'>{item?.text}</td>
                  <td className='border px-4 py-2'>
                    <a
                      href={item.hyperLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 underline'
                    >
                      {item.hyperLink}
                    </a>
                  </td>
                  <td className='border px-2 text-center py-2'>
                    <div className='flex flex-col gap-2'>
                      <div className='flex justify-center gap-2'>
                        <FilePen
                          className='text-blue-800 cursor-pointer'
                          onClick={() => {
                            setSelectedItem(item)
                            setShowEditModal(true)
                          }}
                        />

                        <Trash2
                          className='text-red-600 cursor-pointer'
                          onClick={() => {
                            setSelectedItem(item)
                            setShowDeleteModal(true)
                          }}
                        />
                      </div>
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
            onDelete={() => deleteQuote()}
          />
        )}
        {showImageCroper && (
          <ImageCroper
            isOpen={true}
            onClose={() => setShowImageCroper(false)}
            aspectRatio={32 / 8}
            onCropComplete={handleFile}
          />
        )}
        {showEditModal && (
          <EditModal
            isOpen={true}
            onClose={() => setShowEditModal(false)}
            selectedECProduct={selectedItem}
            refresh={fetchitems}
          />
        )}
      </div>
    </Layout>
  )
}

export default Page
