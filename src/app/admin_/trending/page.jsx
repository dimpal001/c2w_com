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
import ImageCroper from '@/app/Components/ImageCroper'
import Image from 'next/image'
import { cdnPath } from '@/app/Components/cdnPath'

const Page = () => {
  const [trendingProducts, setTrendingProducts] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showImageCroper, setShowImageCroper] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedTrendingProducts, setSelectedTrendingProducts] = useState(null)
  const [newTrendingProduct, setNewTrendingProduct] = useState({
    title: '',
    videoUrl: '',
    price: '',
    hyperLink: '',
    avatarUrl: '',
  })
  const [showForm, setShowForm] = useState(false)
  const fileInputRef = useRef(null)
  const [video, setVideo] = useState(null)
  const [image, setImage] = useState({
    blob: null,
    fileName: '',
    imageUrl: null,
  })
  const [fileName, setFileName] = useState(null)

  useEffect(() => {
    fetchTrendingProducts()
  }, [])

  const fetchTrendingProducts = async () => {
    try {
      const response = await axios.get('/api/customs/trending/get')
      setTrendingProducts(response.data.trendingProducts)
    } catch (error) {
      console.log(error)
    }
  }

  const addTrendingProduct = async () => {
    if (newTrendingProduct.title === '') {
      enqueueSnackbar('Enter Title', { variant: 'error' })
      return
    }
    if (video === null) {
      enqueueSnackbar('Add a video', { variant: 'error' })
      return
    }
    if (newTrendingProduct.hyperLink === '') {
      enqueueSnackbar('Add hyper a link', { variant: 'error' })
      return
    }
    if (newTrendingProduct.price === '') {
      enqueueSnackbar('Add price', { variant: 'error' })
      return
    }
    try {
      setSaving(true)
      const videoUrl = await uploadImageToCDN(video, fileName)
      const imageUrl = await uploadImageToCDN(image.blob, image.fileName)

      if (videoUrl && imageUrl) {
        const response = await axios.post('/api/customs/trending/add', {
          title: newTrendingProduct.title,
          videoUrl: videoUrl,
          price: newTrendingProduct.price,
          hyperLink: newTrendingProduct.hyperLink,
          avatarUrl: imageUrl,
        })
        setTrendingProducts((prev = []) => [
          ...prev,
          response.data.trendingProduct,
        ])

        setNewTrendingProduct({
          title: '',
          videoUrlUrl: '',
          hyperLink: '',
          price: '',
          avatarUrl: '',
        })
      }
      setShowForm(false)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    document.title = 'Trending Products | Clothes2Wear'
  }, [])

  const deleteTrendingProduct = async () => {
    try {
      const response = await axios.delete('/api/customs/trending/delete', {
        data: { id: selectedTrendingProducts.id },
      })

      if (response.status === 200) {
        const deleteImage = await deleteImageFromCDN(
          selectedTrendingProducts.videoUrl
        )
        console.log(deleteImage)
      }

      setTrendingProducts((prev) =>
        prev.filter((item) => item.id !== selectedTrendingProducts.id)
      )
      setShowDeleteModal(false)
      setSelectedTrendingProducts(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewTrendingProduct((prev) => ({ ...prev, [name]: value }))
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

  const handleFile = (blob, croppedImageUrl, fileName) => {
    console.log(blob, croppedImageUrl, fileName)
    setImage({
      blob: blob,
      imageUrl: croppedImageUrl,
      fileName: fileName,
    })
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>
            Trending Products
          </h2>
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
            <div className='grid grid-cols-2 gap-4'>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Title</label>
                <input
                  type='text'
                  name='title'
                  value={newTrendingProduct.title}
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
                  value={newTrendingProduct.price}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                />
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Hyper Link</label>
                <input
                  type='text'
                  name='hyperLink'
                  value={newTrendingProduct.hyperLink}
                  onChange={handleChange}
                  className='border p-2 rounded w-full'
                />
              </div>
              <div className='mb-2'>
                <label className='block mb-1 font-semibold'>Avatar Image</label>
                <button
                  onClick={() => setShowImageCroper(true)}
                  className='border p-2 rounded flex justify-center w-full'
                >
                  <Upload size={19} />
                </button>
              </div>
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
              {image.imageUrl && (
                <div className='relative'>
                  <Image
                    width={100}
                    height={100}
                    src={image.imageUrl}
                    alt='Image'
                    className=' pb-4'
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
            </div>
            <div className='flex gap-3'>
              <Button
                loadingText={'Saving'}
                loading={saving}
                label={'Save'}
                onClick={addTrendingProduct}
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
              <th className='border px-4 py-2 text-left'>Avtar</th>
              <th className='border px-4 py-2 text-left'>Price</th>
              <th className='border px-4 py-2 text-left'>Hyper Link</th>
              <th className='border px-4 py-2 text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {trendingProducts &&
              trendingProducts.length > 0 &&
              trendingProducts.map((item, index) => (
                <tr key={index} className='border-b'>
                  <td className='border px-4 py-2'>{item.title}</td>
                  <td className='border px-4 py-2'>
                    <video
                      src={`https://cdn.thefashionsalad.com/clothes2wear/${item.videoUrl}`}
                      className='w-24'
                    ></video>
                  </td>
                  <td className='border px-4 py-2'>
                    <Image
                      src={cdnPath + item?.avatarUrl}
                      width={50}
                      height={50}
                      alt='Image'
                    />
                  </td>
                  <td className='border px-4 py-2'>{item.price}</td>
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
                          setSelectedTrendingProducts(item)
                          setShowEditModal(true)
                        }}
                        className='text-blue-800 cursor-pointer'
                      />
                      <Trash2
                        onClick={() => {
                          setSelectedTrendingProducts(item)
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
            onDelete={() => deleteTrendingProduct()}
          />
        )}
        {showEditModal && (
          <EditModal
            isOpen={true}
            onClose={() => setShowEditModal(false)}
            selectedTrendingProducts={selectedTrendingProducts}
            fetchTrendingProducts={fetchTrendingProducts}
          />
        )}
        {showImageCroper && (
          <ImageCroper
            isOpen={true}
            onClose={() => setShowImageCroper(false)}
            aspectRatio={9 / 9}
            onCropComplete={handleFile}
          />
        )}
      </div>
    </Layout>
  )
}

export default Page
