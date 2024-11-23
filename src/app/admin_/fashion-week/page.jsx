'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Button from '../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import ImageCroper from '@/app/Components/ImageCroper'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'
import AddEditProductWeek from './AddEditProductWeek'

const Page = () => {
  const [products, setProducts] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [showProductWeekModal, setShowProductWeekModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [saving, setSaving] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
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
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        '/api/customs/fashion-week/product-week/get'
      )
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    document.title = 'Fashion Week | Clothes2Wear'
  }, [])

  const handleFile = (blob, croppedImageUrl, fileName) => {
    console.log(blob, croppedImageUrl, fileName)
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
  }

  const addShowcase = async () => {
    if (newItem.title === '') {
      enqueueSnackbar('Enter Title', { variant: 'error' })
      return
    }
    if (image.fileName === '') {
      enqueueSnackbar('Add image', { variant: 'error' })
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
        const response = await axios.post(
          '/api/customs/fashion-week/product-week/add',
          {
            title: newItem.title,
            imageUrl: imageUrl,
            hyperLink: newItem.hyperLink,
          }
        )
        setProducts((prev) => [...prev, response.data.showcase])
        setNewItem({ title: '', imageUrl: '', hyperLink: '' })
      }
      setShowForm(false)
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const deleteShowcase = async () => {
    try {
      const response = await axios.delete(
        '/api/customs/fashion-week/product-week/delete',
        {
          data: { id: selectedItem.id },
        }
      )

      if (response.status === 200) {
        const deleteImage = await deleteImageFromCDN(selectedItem.imageUrl)
        console.log(deleteImage)
      }

      setProducts((prev) => prev.filter((item) => item.id !== selectedItem.id))
      setShowDeleteModal(false)
      setSelectedItem(null)
    } catch (error) {
      console.log(error)
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
          <h2 className='text-xl font-semibold text-blue-800'>Fashion Week</h2>
          <div className='flex items-center gap-2'>
            <Button
              label={'Add Product Week'}
              onClick={() => setShowProductWeekModal(true)}
            />
          </div>
        </div>

        <div
          className={`transition-height ease-in-out overflow-hidden duration-500 ${
            showForm ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='border p-4 mb-4 bg-white rounded'>
            <h3 className='text-lg font-semibold mb-2'>Add New Showcase</h3>
            <div className='grid grid-cols-2 gap-5'>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Title</label>
                <input
                  type='text'
                  name='title'
                  value={newItem.title}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                />
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Image</label>
                <button
                  onClick={() => setShowImageCroper(true)}
                  className='border p-2 rounded flex justify-center w-full'
                >
                  <Upload size={19} />
                </button>
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Hyper Link</label>
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
            <div className='flex gap-3'>
              <Button
                loadingText={'Saving'}
                loading={saving}
                label={'Save'}
                onClick={addShowcase}
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
              <th className='border px-4 py-2 text-left'>Title</th>
              <th className='border px-4 py-2 text-left'>Image</th>
              <th className='border px-4 py-2 text-left'>Hyper Link</th>
              <th className='border px-4 py-2 text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((item, index) => (
                <tr key={index} className='border-b'>
                  <td className='border px-4 py-2'>{item?.title}</td>
                  <td className='border px-4 py-2'>
                    <img
                      src={`https://cdn.thefashionsalad.com/clothes2wear/${item?.imageUrl}`}
                      alt={item?.imageUrl}
                      className='w-18 h-32 object-cover rounded'
                    />
                  </td>
                  <td className='border px-4 py-2'>
                    <a
                      href={item?.hyperLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 underline'
                    >
                      {item?.hyperLink}
                    </a>
                  </td>
                  <td className='border px-2 text-center py-2'>
                    <div className='flex flex-col gap-2'>
                      <Button
                        onClick={() => {
                          setSelectedItem(item)
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
        {showImageCroper && (
          <ImageCroper
            isOpen={true}
            onClose={() => setShowImageCroper(false)}
            aspectRatio={9 / 16}
            onCropComplete={handleFile}
          />
        )}
        {showProductWeekModal && (
          <AddEditProductWeek
            isOpen={true}
            onClose={() => setShowProductWeekModal(false)}
            item={selectedItem}
            refresh={fetchData}
          />
        )}
      </div>
    </Layout>
  )
}

export default Page
