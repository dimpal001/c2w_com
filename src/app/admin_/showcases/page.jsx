'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Button from '../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'
import { FilePen, Trash2, Upload, X } from 'lucide-react'
import Image from 'next/image'
import ImageCroper from '@/app/Components/ImageCroper'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'
import EditModal from './EditModal'

const Page = () => {
  const [showcases, setShowcases] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedShowcase, setSelectedShowcase] = useState(null)
  const [saving, setSaving] = useState(false)
  const [newShowcase, setNewShowcase] = useState({
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
    fetchShowcases()
  }, [])

  const fetchShowcases = async () => {
    try {
      const response = await axios.get('/api/customs/showcases/get')
      setShowcases(response.data.showcases)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    document.title = 'Showcases | Clothes2Wear'
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
    if (newShowcase.title === '') {
      enqueueSnackbar('Enter Title', { variant: 'error' })
      return
    }
    if (image.fileName === '') {
      enqueueSnackbar('Add image', { variant: 'error' })
      return
    }
    if (newShowcase.hyperLink === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }
    try {
      setSaving(true)
      const imageUrl = await uploadImageToCDN(image.blob, image.fileName)

      if (imageUrl) {
        const response = await axios.post('/api/customs/showcases/add', {
          title: newShowcase.title,
          imageUrl: imageUrl,
          hyperLink: newShowcase.hyperLink,
        })
        setShowcases((prev) => [...prev, response.data.showcase])
        setNewShowcase({ title: '', imageUrl: '', hyperLink: '' })
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
      const response = await axios.delete('/api/customs/showcases/delete', {
        data: { id: selectedShowcase.id },
      })

      if (response.status === 200) {
        const deleteImage = await deleteImageFromCDN(selectedShowcase.imageUrl)
        console.log(deleteImage)
      }

      setShowcases((prev) =>
        prev.filter((item) => item.id !== selectedShowcase.id)
      )
      setShowDeleteModal(false)
      setSelectedShowcase(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewShowcase((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Showcases</h2>
          <div className='flex items-center gap-2'>
            <Button
              label={'Add a showcase'}
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
            <h3 className='text-lg font-semibold mb-2'>Add New Showcase</h3>
            <div className='grid grid-cols-2 gap-5'>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Title</label>
                <input
                  type='text'
                  name='title'
                  value={newShowcase.title}
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
                  value={newShowcase.hyperLink}
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
            {showcases.length > 0 &&
              showcases.map((item, index) => (
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
                    <div className='flex flex-col justify-between items-center gap-4'>
                      <FilePen
                        onClick={() => {
                          setShowEditModal(true)
                          setSelectedShowcase(item)
                        }}
                        className='text-blue-800 cursor-pointer'
                      />
                      <Trash2
                        onClick={() => {
                          setSelectedShowcase(item)
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
        {showEditModal && (
          <EditModal
            isOpen={true}
            onClose={() => setShowEditModal(false)}
            selectedShowcase={selectedShowcase}
            fetchShowcases={fetchShowcases}
          />
        )}
      </div>
    </Layout>
  )
}

export default Page
