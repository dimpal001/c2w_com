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

const SelectImageSection = ({
  isOpen,
  onClose,
  postData,
  setPostData,
  data,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [images, setImages] = useState([])
  const [filteredImages, setFilteredImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  const fetchImageData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token
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
    }
  }

  return (
    <Drawer isOpen={isOpen} size='4xl' onClose={onClose}>
      <DrawerContent className='h-screen'>
        <DrawerHeader>
          <div className='flex items-center justify-between w-full'>
            Select an image
            <div className='text-sm flex items-center gap-2 font-normal'>
              <Button label={'Done'} onClick={() => handleSelectImage()} />
              <Input
                className={'py-[7px]'}
                placeholder={'Search by note here'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </DrawerHeader>
        <DrawerBody>
          <div>
            <div className='flex flex-wrap gap-2'>
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
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default SelectImageSection
