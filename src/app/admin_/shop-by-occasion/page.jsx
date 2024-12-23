'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Button from '../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import AddEditOccasionModal from './components/AddEditOccasionModal'
import { enqueueSnackbar } from 'notistack'
import Image from 'next/image'
import { cdnPath } from '@/app/Components/cdnPath'
import AddEditProductModal from './components/AssEditProductModal'
import { FilePen, Trash2 } from 'lucide-react'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'

const Page = () => {
  const [occasions, setOccasions] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showProductDeleteModal, setShowProductDeleteModal] = useState(false)
  const [showOccasionModal, setShowOccasionModal] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [editModa, setEditMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    fetchOccasions()
  }, [])

  const fetchOccasions = async () => {
    try {
      const response = await axios.get('/api/customs/shop-by-occasion/occasion')
      setOccasions(response.data)
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to handle task!'
      )
    }
  }

  useEffect(() => {
    document.title = 'Shop by Occasion | Clothes2Wear'
  }, [])

  const deleteOccasion = async () => {
    try {
      const response = await axios.delete(
        '/api/customs/shop-by-occasion/occasion',
        {
          data: { id: selectedItem.id },
        }
      )

      setOccasions((prev) => prev.filter((item) => item.id !== selectedItem.id))
      enqueueSnackbar(response?.data?.message, { variant: 'success' })
      setShowDeleteModal(false)
      setSelectedItem(null)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  const deleteProduct = async () => {
    try {
      await deleteImageFromCDN(selectedItem.imageUrl)
      const response = await axios.delete(
        '/api/customs/shop-by-occasion/product',
        {
          data: { id: selectedItem.id },
        }
      )

      enqueueSnackbar(response?.data?.message, { variant: 'success' })
      setShowProductDeleteModal(false)
      setSelectedItem(null)
      fetchOccasions()
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>
            Shop By Occasion
          </h2>
          <div className='flex items-center gap-2'>
            <Button
              label={'Create Occasion'}
              onClick={() => {
                setShowOccasionModal(true)
                setEditMode(false)
              }}
            />
          </div>
        </div>

        {occasions.length > 0 &&
          occasions.map((item, index) => (
            <div key={index} className='border mb-3 border-blue-800 rounded-sm'>
              <div>
                <div className='p-4 border-t flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <p>
                      Occasion :{' '}
                      <span className='capitalize text-blue-800 font-semibold'>
                        {item?.occasionName}
                      </span>
                    </p>
                    <p>
                      Link :{' '}
                      <span className='font-semibold text-blue-800'>
                        {item?.categoryHyperLinks}
                      </span>
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      onClick={() => {
                        setShowProductModal(true)
                        setEditMode(false)
                        setSelectedItem(item.id)
                      }}
                      label={'Add Product'}
                    />
                    <Button
                      onClick={() => {
                        setSelectedItem(item)
                        setEditMode(true)
                        setShowOccasionModal(true)
                      }}
                      label={'Edit'}
                    />
                    <Button
                      label={'Delete'}
                      onClick={() => {
                        setSelectedItem(item)
                        setShowDeleteModal(true)
                      }}
                      variant='error'
                    />
                  </div>
                </div>
              </div>
              {item?.products?.length > 0 && (
                <table className='min-w-full border-collapse'>
                  <thead className='bg-blue-800 text-white'>
                    <tr>
                      <th className='border px-4 py-2 text-left'>
                        Occasion Name
                      </th>
                      <th className='border px-4 py-2 text-left'>Hyper Link</th>
                      <th className='border px-4 py-2 text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item?.products?.length > 0 &&
                      item?.products?.map((item, index) => (
                        <tr key={index} className='border-b'>
                          <td className='border px-4 py-2'>
                            <Image
                              src={cdnPath + item.imageUrl}
                              width={40}
                              height={30}
                              alt='Image'
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
                          <td className='border px-2 text-center py-2'>
                            <div className='flex justify-center items-center gap-2'>
                              <FilePen
                                className='text-blue-800 cursor-pointer'
                                onClick={() => {
                                  setSelectedItem(item)
                                  setEditMode(true)
                                  setShowProductModal(true)
                                }}
                              />
                              <Trash2
                                onClick={() => {
                                  setSelectedItem(item)
                                  setShowProductDeleteModal(true)
                                }}
                                className='text-red-600 cursor-pointer'
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}

        {showDeleteModal && (
          <DeleteModal
            isOpen={true}
            onClose={() => setShowDeleteModal(false)}
            onDelete={() => deleteOccasion()}
          />
        )}
        {showProductDeleteModal && (
          <DeleteModal
            isOpen={true}
            onClose={() => setShowProductDeleteModal(false)}
            onDelete={() => deleteProduct()}
          />
        )}
        {showOccasionModal && (
          <AddEditOccasionModal
            isOpen={true}
            onClose={() => setShowOccasionModal(false)}
            occasion={selectedItem}
            refresh={() => fetchOccasions()}
            editMode={editModa}
          />
        )}
        {showProductModal && (
          <AddEditProductModal
            isOpen={true}
            onClose={() => setShowProductModal(false)}
            product={selectedItem}
            editMode={editModa}
            refresh={() => fetchOccasions()}
            occasionId={selectedItem}
          />
        )}
      </div>
    </Layout>
  )
}

export default Page
