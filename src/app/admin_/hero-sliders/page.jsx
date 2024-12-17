'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Button from '../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import Loading from '../components/Loading'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'
import { FilePen, Trash2, Upload, X } from 'lucide-react'
import ImageCroper from '@/app/Components/ImageCroper'
import Image from 'next/image'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'
import EditModal from './EditModal'
import { cdnPath } from '@/app/Components/cdnPath'

const Page = () => {
  const [heroSliders, setHeroSliders] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedSlider, setSelectedSlider] = useState(null)
  const [newHeroSlider, setNewHeroSlider] = useState({
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
    fetchHeroSliders()
  }, [])

  const fetchHeroSliders = async () => {
    try {
      const response = await axios.get('/api/customs/hero-sliders/get')
      setHeroSliders(response.data.heroSliders)
    } catch (error) {
      console.log(error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    document.title = 'Hero Sliders | Clothes2Wear'
  }, [])

  const handleFile = (blob, croppedImageUrl, fileName) => {
    console.log(blob, croppedImageUrl, fileName)
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
  }

  const addHeroSlider = async () => {
    if (image.fileName === '') {
      enqueueSnackbar('Add image', { variant: 'error' })
      return
    }
    if (newHeroSlider.hyperLink === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }
    try {
      setSaving(true)
      const imageUrl = await uploadImageToCDN(image.blob, image.fileName)

      if (imageUrl) {
        const response = await axios.post('/api/customs/hero-sliders/add', {
          imageUrl: imageUrl,
          hyperLink: newHeroSlider.hyperLink,
        })
        setHeroSliders((prev) => [...prev, response.data.heroSliders])
        setNewHeroSlider({ imageUrl: '', hyperLink: '' })
      }
      setShowForm(false)
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const deleteHeroSlider = async () => {
    try {
      const response = await axios.delete('/api/customs/hero-sliders/delete', {
        data: { id: selectedSlider.id },
      })

      if (response.status === 200) {
        const deleteImage = await deleteImageFromCDN(selectedSlider.imageUrl)
        console.log(deleteImage)
      }

      setHeroSliders((prev) =>
        prev.filter((item) => item.id !== selectedSlider.id)
      )
      setShowDeleteModal(false)
      setSelectedSlider(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewHeroSlider((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Layout>
      {fetching ? (
        <Loading />
      ) : (
        <div className='p-6 bg-gray-100 min-h-[530px]'>
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-xl font-semibold text-blue-800'>
              Hero Sliders
            </h2>
            <div className='flex items-center gap-2'>
              <Button
                label={'Add a slider'}
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
              <h3 className='text-lg font-semibold mb-2'>Add New Slider</h3>
              <div className='grid grid-cols-2 gap-5'>
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
                    value={newHeroSlider.hyperLink}
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
                  onClick={addHeroSlider}
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
                <th className='border px-4 py-2 text-left'>Hyper Link</th>
                <th className='border px-4 py-2 text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {heroSliders.length > 0 &&
                heroSliders.map((item, index) => (
                  <tr key={index} className='border-b'>
                    <td className='border px-4 py-2'>
                      <img
                        src={`${cdnPath}${item?.imageUrl}`}
                        alt={item?.imageUrl}
                        className='w-36 h-16 object-cover rounded'
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
                      <div className='flex items-center justify-center gap-2'>
                        <FilePen
                          onClick={() => {
                            setShowEditModal(true)
                            setSelectedSlider(item)
                          }}
                          className='text-blue-800 cursor-pointer'
                        />
                        <Trash2
                          onClick={() => {
                            setSelectedSlider(item)
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
              onDelete={() => deleteHeroSlider()}
            />
          )}
          {showImageCroper && (
            <ImageCroper
              isOpen={true}
              onClose={() => setShowImageCroper(false)}
              aspectRatio={16 / 9}
              onCropComplete={handleFile}
            />
          )}{' '}
          {showEditModal && (
            <EditModal
              isOpen={true}
              onClose={() => setShowEditModal(false)}
              selectedHeroSlide={selectedSlider}
              fetchHeroSlides={fetchHeroSliders}
            />
          )}
        </div>
      )}
    </Layout>
  )
}

export default Page
