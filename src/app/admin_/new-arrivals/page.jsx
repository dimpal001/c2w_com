'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Button from '../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import ImageCroper from '@/app/Components/ImageCroper'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'

const Page = () => {
  const [newArrivals, setNewArrivals] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [selectedNewArrival, setSelectedNewArrivals] = useState(null)
  const [newNewArrival, setNewNewArrival] = useState({
    imageUrl: '',
    hyperLink: '',
    categoryHyperLink: '',
  })
  const [image, setImage] = useState({
    blob: null,
    fileName: '',
    imageUrl: null,
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchNewArrivals()
  }, [])

  useEffect(() => {
    document.title = 'New Arrivals | Clothes2Wear'
  }, [])

  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get('/api/customs/new-arrivals/get')
      setNewArrivals(response.data.newAriivals)
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

  const addNewArrival = async () => {
    if (image.fileName === '') {
      enqueueSnackbar('Add an image', { variant: 'error' })
      return
    }
    if (newNewArrival.hyperLink === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }
    if (newNewArrival.categoryHyperLink === '') {
      enqueueSnackbar('Add hyper a category hyper link', { variant: 'error' })
      return
    }

    try {
      const imageUrl = await uploadImageToCDN(image.blob, image.fileName)

      if (imageUrl) {
        const response = await axios.post('/api/customs/new-arrivals/add', {
          imageUrl: imageUrl,
          hyperLink: newNewArrival.hyperLink,
          categoryHyperLink: newNewArrival.categoryHyperLink,
        })
        setNewArrivals((prev) => [...prev, response.data.newAriivals])
        setNewNewArrival({
          imageUrl: '',
          hyperLink: '',
          categoryHyperLink: '',
        })
      }
      setShowForm(false)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNewArrival = async () => {
    try {
      const response = await axios.delete('/api/customs/new-arrivals/delete', {
        data: { id: selectedNewArrival.id },
      })

      if (response.status === 200) {
        const deleteImage = await deleteImageFromCDN(
          selectedNewArrival.imageUrl
        )
        console.log(deleteImage)
      }

      setNewArrivals((prev) =>
        prev.filter((item) => item.id !== selectedNewArrival.id)
      )
      setShowDeleteModal(false)
      setSelectedNewArrivals(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewNewArrival((prev = []) => ({ ...prev, [name]: value }))
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>New Arrivals</h2>
          <div className='flex items-center gap-2'>
            <Button
              label={'Add a product'}
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
            <h3 className='text-lg font-semibold mb-2'>Add New Product</h3>
            <div className='grid grid-cols-2 gap-5'>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Image URL</label>
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
                  value={newNewArrival.hyperLink}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                />
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>
                  Category Hyper Link
                </label>
                <input
                  type='text'
                  name='categoryHyperLink'
                  value={newNewArrival.categoryHyperLink}
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
              <Button label={'Save Showcase'} onClick={addNewArrival} />
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
              <th className='border px-4 py-2 text-left'>Hyper Link</th>
              <th className='border px-4 py-2 text-left'>
                Category Hyper Link
              </th>
              <th className='border px-4 py-2 text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {newArrivals &&
              newArrivals.length > 0 &&
              newArrivals.map((item, index) => (
                <tr key={index} className='border-b'>
                  <td className='border px-4 py-2'>
                    <img
                      src={`https://cdn.thefashionsalad.com/clothes2wear/${item?.imageUrl}`}
                      alt={item.title}
                      className='w-9 h-16 object-cover rounded'
                    />
                  </td>
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
                  <td className='border px-4 py-2'>
                    <a
                      href={item.hyperLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 underline'
                    >
                      {item.categoryHyperLink}
                    </a>
                  </td>
                  <td className='border px-2 text-center py-2'>
                    <Button
                      onClick={() => {
                        setSelectedNewArrivals(item)
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
        {showDeleteModal && (
          <DeleteModal
            isOpen={true}
            onClose={() => setShowDeleteModal(false)}
            onDelete={() => deleteNewArrival()}
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
      </div>
    </Layout>
  )
}

export default Page
