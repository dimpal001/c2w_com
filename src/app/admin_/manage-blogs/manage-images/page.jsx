'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { blogApi } from '../../components/apis'
import axios from 'axios'
import ImageModal from '../components/ImageModal'
import { cdnPath } from '@/app/Components/cdnPath'
import { enqueueSnackbar } from 'notistack'
import { deleteImageFromCDN } from '../../../../../utils/deleteImageFromCDN'
import DeleteModal from '@/app/Components/DeleteModal'
import Input from '../../products/components/Input'
import { CircleCheck } from 'lucide-react'

const page = () => {
  const [images, setImages] = useState([])
  const [filteredImages, setFilteredImages] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showImageModal, setShowImageModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    document.title = 'Manage Blog Images'
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token
      const response = await axios.get(`${blogApi}/images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setImages(response?.data?.images)
      setFilteredImages(response?.data?.images)
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageDelete = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token
      await deleteImageFromCDN(selectedItem?.imageUrl)
      await axios.delete(`${blogApi}/images/${selectedItem?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setShowDeleteModal(false)

      const filteredImage = images.filter(
        (item) => item?.id !== selectedItem?.id
      )
      setImages(filteredImage)
      setSelectedItem(null)
      enqueueSnackbar('Image has been deleted', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    const filteredData = images.filter((item) =>
      item.note.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredImages(filteredData)
  }, [searchQuery, images])

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>
            Manage Blog Images
          </h2>
          <div className='flex items-center gap-2'>
            <Input
              placeholder={'Search by note'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              className={'py-[6px]'}
              label={'Add Image'}
              onClick={() => {
                setShowImageModal(true)
                setSelectedItem(null)
              }}
            />
          </div>
        </div>
        <div className='flex gap-4 flex-wrap items-start'>
          {filteredImages.length > 0 &&
            filteredImages.map((image, index) => (
              <div
                key={index}
                className='relative h-auto w-64 group overflow-hidden'
              >
                <img
                  src={cdnPath + image.imageUrl}
                  className='w-64 min-w-64 max-w-64 border border-slate-700'
                  alt=''
                />
                <div className='absolute p-4 z-10 group-hover:translate-y-0 transition-all duration-300 translate-y-full inset-0 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70'>
                  <div className='flex gap-3 items-start'>
                    <Button
                      onClick={() => {
                        setSelectedItem(image)
                        setShowDeleteModal(true)
                      }}
                      label={'Delete'}
                      variant='error'
                    />
                    <Button
                      onClick={() => {
                        setSelectedItem(image)
                        setShowImageModal(true)
                      }}
                      label={'Edit'}
                    />
                  </div>
                  <div className='mt-3 text-white'>
                    <p>
                      Alt Text : <strong>{image?.altText}</strong>
                    </p>
                    <p>
                      Note : <strong>{image?.note}</strong>
                    </p>
                  </div>
                </div>
                {image?.isUsed === true && (
                  <CircleCheck className='fill-blue-600 z-20 text-white w-7 h-7 absolute top-2 right-2' />
                )}
              </div>
            ))}
        </div>
        {showImageModal && (
          <ImageModal
            selectedItem={selectedItem}
            images={images}
            setImages={setImages}
            isOpen={true}
            onClose={() => setShowImageModal(false)}
            refresh={() => fetchData()}
          />
        )}
        {showDeleteModal && (
          <DeleteModal
            isOpen={true}
            onClose={() => setShowDeleteModal(false)}
            onDelete={handleImageDelete}
          />
        )}
      </div>
    </Layout>
  )
}

export default page
