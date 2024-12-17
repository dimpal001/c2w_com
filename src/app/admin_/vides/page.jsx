'use client'

import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Button from '../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import { FilePen, Trash2, Upload, X } from 'lucide-react'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'
import EditModal from './EditModal'
import { cdnPath } from '@/app/Components/cdnPath'

const Page = () => {
  const [vides, setVides] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newItem, setNewItem] = useState({
    title: '',
    videoUrl: '',
    price: '',
    hyperLink: '',
    avatarUrl: '',
    description: '',
  })
  const [showForm, setShowForm] = useState(false)
  const fileInputRef = useRef(null)
  const [video, setVideo] = useState(null)
  const [fileName, setFileName] = useState(null)

  useEffect(() => {
    fetchVides()
  }, [])

  const fetchVides = async () => {
    try {
      const response = await axios.get('/api/vides')
      setVides(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addVide = async () => {
    if (newItem.title === '') {
      enqueueSnackbar('Enter Title', { variant: 'error' })
      return
    }
    if (video === null) {
      enqueueSnackbar('Add a video', { variant: 'error' })
      return
    }
    if (newItem.hyperLink === '') {
      enqueueSnackbar('Add hyper link', { variant: 'error' })
      return
    }
    if (newItem.price === '') {
      enqueueSnackbar('Add price', { variant: 'error' })
      return
    }
    try {
      setSaving(true)
      const videoUrl = await uploadImageToCDN(video, fileName)

      if (videoUrl) {
        const response = await axios.post('/api/vides', {
          title: newItem.title,
          videoUrl: videoUrl,
          price: newItem.price,
          hyperLink: newItem.hyperLink,
          description: newItem.description,
        })
        setVides((prev = []) => [...prev, response.data])

        setNewItem({
          title: '',
          videoUrlUrl: '',
          hyperLink: '',
          price: '',
          description: '',
        })

        setVideo(null)

        enqueueSnackbar(response.data.message, { variant: 'success' })
      }
      setShowForm(false)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    document.title = 'Manage Vides | Clothes2Wear'
  }, [])

  const deleteVide = async () => {
    try {
      const response = await axios.delete('/api/vides', {
        params: { id: selectedItem.id },
      })

      if (response.status === 200) {
        await deleteImageFromCDN(selectedItem.videoUrl)
      }

      setVides((prev) => prev.filter((item) => item.id !== selectedItem.id))
      setShowDeleteModal(false)
      setSelectedItem(null)
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setVideo(file)
      setFileName(file.name)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Manage Vides</h2>
          <div className='flex items-center gap-2'>
            <Button
              label={'Add a vide'}
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
            <h3 className='text-lg font-semibold mb-2'>Add New Vide</h3>
            <div className='grid grid-cols-2 gap-2'>
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
                <label className='block mb-1 font-semibold'>Video</label>
                <input
                  type='file'
                  ref={fileInputRef}
                  accept='video/*'
                  onChange={handleFileChange}
                  className='hidden'
                />
                <button
                  onClick={handleButtonClick}
                  className='border p-2 rounded flex justify-center w-full'
                >
                  <Upload size={19} />
                </button>
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Price</label>
                <input
                  type='number'
                  name='price'
                  value={newItem.price}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                />
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
            <div className='mb-2'>
              <label className='block mb-1 font-semibold'>Description</label>
              <input
                type='text'
                name='description'
                value={newItem.description}
                onChange={handleChange}
                className='border p-2 rounded w-full'
              />
            </div>
            <div className='flex gap-2'>
              {video && (
                <div className='relative'>
                  <video
                    controls
                    src={URL.createObjectURL(video)}
                    className='w-52 mb-3'
                  ></video>
                  <X
                    size={35}
                    className='text-red-600 absolute top-3 left-1 cursor-pointer'
                    onClick={() => setVideo(null)}
                  />
                </div>
              )}
            </div>
            <div className='flex gap-3'>
              <Button
                loadingText={'Saving'}
                loading={saving}
                label={'Save'}
                onClick={addVide}
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
              <th className='border px-4 py-2 text-left'>Video</th>
              <th className='border px-4 py-2 text-left'>Price</th>
              <th className='border px-4 py-2 text-left'>Description</th>
              <th className='border px-4 py-2 text-left'>Hyper Link</th>
              <th className='border px-4 py-2 text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {vides &&
              vides.length > 0 &&
              vides.map((item, index) => (
                <tr key={index} className='border-b'>
                  <td className='border px-4 py-2'>{item.title}</td>
                  <td className='border px-4 py-2'>
                    <video
                      src={`${cdnPath}item.videoUrl}`}
                      className='w-24'
                    ></video>
                  </td>
                  <td className='border px-4 py-2'>
                    {item.price && (
                      <span>₹{parseInt(item?.price).toFixed(2)}</span>
                    )}
                  </td>
                  <td className='border px-4 py-2'>{item.description}</td>
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
                    <div className='flex items-center gap-2'>
                      <FilePen
                        onClick={() => {
                          setSelectedItem(item)
                          setShowEditModal(true)
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
            onDelete={() => deleteVide()}
          />
        )}
        {showEditModal && (
          <EditModal
            isOpen={true}
            onClose={() => setShowEditModal(false)}
            item={selectedItem}
            refresh={fetchVides}
          />
        )}
      </div>
    </Layout>
  )
}

export default Page
