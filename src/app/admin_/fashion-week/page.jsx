'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Button from '../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'
import AddEditProductWeek from './AddEditProductWeek'
import AddEditImageWeek from './AddEditImageWeek'

const Page = () => {
  const [products, setProducts] = useState([])
  const [imageProducts, setImageProducts] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteImageWeekModal, setShowDeleteImageWeekModal] =
    useState(false)
  const [showProductWeekModal, setShowProductWeekModal] = useState(false)
  const [showImageWeekModal, setShowImageWeekModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    fetchData()
    fetchImageProductData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/customs/fashion-week/product-week')
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedItem(null)
      setEditMode(false)
    }
  }

  const fetchImageProductData = async () => {
    try {
      const response = await axios.get('/api/customs/fashion-week/image-week')
      setImageProducts(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedItem(null)
      setEditMode(false)
    }
  }

  useEffect(() => {
    document.title = 'Fashion Week | Clothes2Wear'
  }, [])

  const deleteFashionWeek = async () => {
    try {
      const response = await axios.delete(
        '/api/customs/fashion-week/product-week',
        {
          params: { id: selectedItem.id },
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

  const deleteImageProduct = async () => {
    try {
      const response = await axios.delete(
        '/api/customs/fashion-week/image-week',
        {
          params: { id: selectedItem.id },
        }
      )

      if (response.status === 200) {
        const deleteImage = await deleteImageFromCDN(selectedItem.imageUrl)
        console.log(deleteImage)
      }

      setImageProducts((prev) =>
        prev.filter((item) => item.id !== selectedItem.id)
      )
      setShowDeleteImageWeekModal(false)
      setSelectedItem(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Fashion Week</h2>
          <div className='flex items-center gap-2'>
            <Button
              label={'Add Image Week'}
              onClick={() => {
                setShowImageWeekModal(true)
                setEditMode(false)
              }}
            />
            <Button
              label={'Add Product Week'}
              onClick={() => {
                setShowProductWeekModal(true)
                setEditMode(false)
              }}
            />
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <div>
            <p className='text-base font-semibold py-1'>Product Week</p>
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
                              setShowProductWeekModal(true)
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
          </div>
          <div>
            <p className='text-base font-semibold py-1'>Image Week</p>
            <table className='min-w-full border-collapse border border-gray-300'>
              <thead className='bg-blue-800 text-white'>
                <tr>
                  <th className='border px-4 py-2 text-left'>Image</th>
                  <th className='border px-4 py-2 text-left'>Hyper Link</th>
                  <th className='border px-4 py-2 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {imageProducts.length > 0 &&
                  imageProducts.map((item, index) => (
                    <tr key={index} className='border-b'>
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
                              setShowImageWeekModal(true)
                              setEditMode(true)
                            }}
                            label={'Edit'}
                          />
                          <Button
                            onClick={() => {
                              setSelectedItem(item)
                              setShowDeleteImageWeekModal(true)
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
          </div>
        </div>
        {showDeleteModal && (
          <DeleteModal
            isOpen={true}
            onClose={() => setShowDeleteModal(false)}
            onDelete={() => deleteFashionWeek()}
          />
        )}
        {showDeleteImageWeekModal && (
          <DeleteModal
            isOpen={true}
            onClose={() => setShowDeleteImageWeekModal(false)}
            onDelete={() => deleteImageProduct()}
          />
        )}
        {showProductWeekModal && (
          <AddEditProductWeek
            isOpen={true}
            onClose={() => setShowProductWeekModal(false)}
            item={selectedItem}
            refresh={() => fetchData()}
            editMode={editMode}
          />
        )}
        {showImageWeekModal && (
          <AddEditImageWeek
            isOpen={true}
            onClose={() => setShowImageWeekModal(false)}
            item={selectedItem}
            refresh={() => fetchImageProductData()}
            editMode={editMode}
          />
        )}
      </div>
    </Layout>
  )
}

export default Page
