/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from '@nextui-org/drawer'
import React, { useEffect, useState } from 'react'
import Input from '../../products/components/Input'
import axios from 'axios'
import { blogApi } from '../../components/apis'
import { cdnPath } from '@/app/Components/cdnPath'
import { CircleCheck } from 'lucide-react'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import ImageModal from './ImageModal'

const SelectImageSection = ({
  isOpen,
  onClose,
  postData,
  setPostData,
  data,
  setSelectedContentImage,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [images, setImages] = useState([])
  const [filteredImages, setFilteredImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)

  const fetchImageData = async () => {
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImageData()
  }, [isOpen])

  useEffect(() => {
    const filteredData = images.filter((item) =>
      item?.note.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    )
    setFilteredImages(filteredData)
  }, [searchQuery, images])

  const handleSelectImage = () => {
    if (data === 'thumbnailImage') {
      setPostData({
        ...postData,
        thumbnailImage: selectedImage?.imageUrl,
      })
    } else if (data === 'content') {
      setSelectedContentImage(selectedImage)
    }
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} size='4xl' onClose={onClose}>
      <DrawerContent className='h-screen'>
        <DrawerHeader>
          <div className='flex items-center justify-between w-full'>
            Select an image
            <div className='text-sm flex items-center gap-2 font-normal'>
              {selectedImage && (
                <Button label={'Done'} onClick={() => handleSelectImage()} />
              )}
              <Button label={'Refresh'} onClick={fetchImageData} />
              <Button
                label={'Add new'}
                onClick={() => setShowImageModal(true)}
              />
              <Input
                placeholder={'Search by note here'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </DrawerHeader>
        <DrawerBody>
          <div>
            {loading ? (
              <Loading />
            ) : (
              <div className='flex flex-wrap items-start gap-2'>
                {filteredImages.length > 0 ? (
                  filteredImages.map((image, index) => (
                    <div
                      key={index}
                      className='relative'
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={cdnPath + image?.imageUrl}
                        className='w-40 min-w-40 border border-slate-700 cursor-pointer'
                        alt={image?.altText}
                      />
                      {selectedImage?.id === image.id && (
                        <div className='absolute z-10 bottom-2 right-2'>
                          <CircleCheck className='fill-blue-600 w-7 h-7 text-white' />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className='flex items-center justify-center h-32 w-full text-gray-600'>
                    <p>No images found</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {showImageModal && (
            <ImageModal
              isOpen={true}
              onClose={() => setShowImageModal(false)}
              refresh={fetchImageData}
            />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default SelectImageSection
