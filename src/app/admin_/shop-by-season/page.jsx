'use client'

import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Button from '../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import { uploadImageToCDN } from '../../../../utils/uploadImageToCDN'
import { SquarePen, Trash2, Upload } from 'lucide-react'
import { deleteImageFromCDN } from '../../../../utils/deleteImageFromCDN'
import Loading from '../components/Loading'
import DeleteSeasonModal from './DeleteSeasonModal'
import AddProductModal from './AddProductModal'

const Page = () => {
  const [seasons, setSeasons] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteSeasonModal, setShowDeleteSeasonModal] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSeason, setSelectedSeason] = useState(null)
  const [video, setVideo] = useState(null)
  const [videoFileName, setVideoFileName] = useState(null)
  const [showSeasonForm, setShowSeasonForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchSeasons()
  }, [])

  const fetchSeasons = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/customs/shop-by-season/get')
      setSeasons(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'products | Clothes2Wear'
  }, [])

  const addSeason = async () => {
    if (!video) {
      enqueueSnackbar('Upload a video', { variant: 'error' })
      return
    }

    try {
      setSubmitting(true)
      const videoUrl = await uploadImageToCDN(video, videoFileName)

      const response = await axios.post(
        '/api/customs/shop-by-season/video/add',
        {
          videoUrl: videoUrl,
        }
      )

      if (response.status === 200) {
        enqueueSnackbar(response.data.message, { variant: 'success' })
        setShowSeasonForm(false)
        setVideo(null)
        fetchSeasons()
        setSelectedSeason(null)
        setSelectedProduct(null)
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message)
    } finally {
      setSubmitting(false)
    }
  }

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        '/api/customs/shop-by-season/delete',
        {
          data: { id: selectedProduct.id },
        }
      )

      if (response.status === 200) {
        const deleteImage = await deleteImageFromCDN(selectedProduct.imageUrl)
        console.log(deleteImage)
      }

      fetchSeasons()

      setShowDeleteModal(false)
      setSelectedSeason(null)
      setSelectedProduct(null)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSeason = async () => {
    try {
      const response = await axios.delete(
        '/api/customs/shop-by-season/video/delete',
        {
          data: { id: selectedSeason.id },
        }
      )

      if (response.status === 200) {
        const deleteImage = await deleteImageFromCDN(selectedSeason.videoUrl)
        console.log(deleteImage)
      }

      setShowDeleteSeasonModal(false)
      fetchSeasons()
      setSelectedSeason(null)
      setSelectedProduct(null)
    } catch (error) {
      console.log(error)
    }
  }

  const updateSeasonVideo = async () => {
    if (!video) {
      enqueueSnackbar('Upload a video', { variant: 'error' })
      return
    }

    try {
      setSubmitting(true)
      const videoUrl = await uploadImageToCDN(video, videoFileName)

      const response = await axios.patch(
        '/api/customs/shop-by-season/video/update',
        {
          id: selectedSeason.id,
          videoUrl: videoUrl,
        }
      )

      if (response.status === 200) {
        enqueueSnackbar(response.data.message, { variant: 'success' })
        setShowSeasonForm(false)
        setSeasons(response.data.shopBySeasonVideo)
        fetchSeasons()
        setVideo(null)
        setSelectedSeason(null)
        setSelectedProduct(null)
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setVideo(file)
      setVideoFileName(file.name)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  return (
    <Layout>
      {!loading ? (
        <div className='p-6 bg-gray-100 min-h-[530px]'>
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-xl font-semibold text-blue-800'>
              Shop by Season
            </h2>
            <div className='flex items-center gap-2'>
              <Button
                label={'Create a Season'}
                onClick={() => setShowSeasonForm(!showSeasonForm)}
              />
            </div>
          </div>

          <div
            className={`transition-height ease-in-out overflow-hidden duration-500 ${
              showSeasonForm
                ? 'max-h-[1000px] opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className='border p-4 mb-4 bg-white rounded'>
              <h3 className='text-lg font-semibold mb-2'>
                Add Season Backgroud Video
              </h3>
              <div className='grid grid-cols-2 gap-5'>
                <div className='mb-2'>
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
              </div>
              {video && (
                <video
                  controls
                  src={URL.createObjectURL(video)}
                  className='w-52 mb-3'
                ></video>
              )}
              <div className='flex gap-3'>
                <Button
                  loading={submitting}
                  loadingText={'Submitting'}
                  label={'Upload'}
                  onClick={addSeason}
                />
                <Button
                  label={'Close'}
                  variant='secondary'
                  onClick={() => setShowSeasonForm(false)}
                />
              </div>
            </div>
          </div>

          {seasons.length > 0 &&
            seasons.map((season, index) => (
              <div
                key={index}
                className={`p-1 ${
                  selectedSeason?.id === season.id
                    ? 'bg-gray-200 my-1'
                    : 'bg-white'
                } border rounded-sm`}
              >
                <div className='flex justify-between pl-2 mb-1'>
                  <p className='font-semibold'>Season {index + 1}</p>
                  <Button
                    onClick={() => {
                      setSelectedSeason(season)
                      setShowAddProductModal(true)
                    }}
                    label={'Add Product'}
                  />
                </div>
                <div className='flex gap-2 items-start'>
                  <div>
                    <video
                      controls
                      src={`https://cdn.thefashionsalad.com/clothes2wear/${season.videoUrl}`}
                      className='w-72 mb-3 border border-black'
                    ></video>
                    <div className='flex gap-2 items-center'>
                      <Trash2
                        onClick={() => {
                          setSelectedSeason(season)
                          setShowDeleteSeasonModal(true)
                        }}
                        className='text-white cursor-pointer bg-red-600 rounded-sm p-[6px]'
                        size={30}
                      />
                      <SquarePen
                        onClick={() => {
                          setSelectedSeason(season)
                          handleButtonClick()
                        }}
                        className='text-white cursor-pointer bg-blue-600 rounded-sm p-[6px]'
                        size={30}
                      />
                    </div>
                    <div>
                      {video && (
                        <div>
                          <video
                            controls
                            src={URL.createObjectURL(video)}
                            className='w-72 my-3'
                          ></video>
                          <Button
                            onClick={updateSeasonVideo}
                            loading={submitting}
                            loadingText={'Submitting'}
                            label={'Update'}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <table className='w-full border-collapse border border-gray-300'>
                    <thead className='bg-blue-800 text-white'>
                      <tr>
                        <th className='border px-4 py-2 text-left'>
                          Description
                        </th>
                        <th className='border px-4 py-2 text-left'>Image</th>
                        <th className='border px-4 py-2 text-left'>
                          Hyper Link
                        </th>
                        <th className='border px-4 py-2 text-center'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {season.products.length > 0 &&
                        season.products.map((item, index) => (
                          <tr key={index} className='border-b'>
                            <td className='border px-4 py-2'>
                              {item?.description}
                            </td>
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
                              <Button
                                onClick={() => {
                                  setSelectedProduct(item)
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
                </div>
              </div>
            ))}

          {showDeleteModal && (
            <DeleteModal
              isOpen={true}
              onClose={() => setShowDeleteModal(false)}
              onDelete={() => deleteProduct()}
            />
          )}
          {showDeleteSeasonModal && (
            <DeleteSeasonModal
              isOpen={true}
              onClose={() => setShowDeleteSeasonModal(false)}
              onDelete={deleteSeason}
            />
          )}
          {showAddProductModal && (
            <AddProductModal
              isOpen={true}
              onClose={() => setShowAddProductModal(false)}
              selectedSeason={selectedSeason}
              setSelectedSeason={setSelectedSeason}
              fetchSeasons={fetchSeasons}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  )
}

export default Page
