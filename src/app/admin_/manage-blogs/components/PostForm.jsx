'use client'

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import CustomEditor from './CustomEditor'
import Button from '../../components/Button'
import { Check, Upload } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { blogApi } from '../../components/apis'
import SelectImageSection from './SelectImageSection'
import { cdnPath } from '@/app/Components/cdnPath'

const PostForm = ({ postData, setPostData }) => {
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const [isImgDrawerOpen, setIsImgDrawerOpen] = useState(false)
  const [selectedField, setSelectedField] = useState(null)

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token
      const response = await axios.get(`${blogApi}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setCategories(response?.data?.categories)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const toggleCategory = (category) => {
    console.log(category)
    console.log(selectedCategories)
    if (selectedCategories.includes(category.id)) {
      const filteredCategories = selectedCategories.filter(
        (item) => item !== category.id
      )
      setSelectedCategories(filteredCategories)
      console.log('If calling')
    } else {
      setSelectedCategories((prev) => [...prev, category.id])
      console.log('Else calling')
    }
  }

  return (
    <div className='flex flex-col gap-3 items-start w-full'>
      <div>
        <Button
          onClick={() => {
            setIsImgDrawerOpen(true)
            setSelectedField('thumbnailImage')
          }}
          label={'Thumbnail Image'}
          icon={Upload}
        />
        {postData?.thumbnailImage && (
          <img
            src={cdnPath + postData?.thumbnailImage}
            className='w-64'
            alt=''
          />
        )}
      </div>
      <BlogInputField placeholder={'Title of the blog'} className={'w-1/2'} />
      <div className='py-2 flex gap-3'>
        {categories.length > 0 &&
          categories.map((item, index) => (
            <span
              onClick={() => toggleCategory(item)}
              className={`capitalize ${
                selectedCategories.includes(item?.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-200 text-black'
              } cursor-pointer px-4 py-[8px] flex items-center gap-1 rounded-full`}
              key={index}
            >
              {selectedCategories.includes(item?.id) && (
                <Check className='w-4 h-4' />
              )}
              {item?.name}
            </span>
          ))}
      </div>
      <CustomEditor
        value={postData?.content || ''}
        onChange={(newContent) =>
          setPostData({
            ...postData,
            content: newContent,
          })
        }
      />

      {isImgDrawerOpen && (
        <SelectImageSection
          isOpen={true}
          onClose={() => setIsImgDrawerOpen(false)}
          postData={postData}
          data={selectedField}
          setPostData={setPostData}
        />
      )}
    </div>
  )
}

const BlogInputField = ({ placeholder, className, value }) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      className={`${className} px-3 py-[10px] border focus:outline-none focus:border-blue-600 text-base`}
    />
  )
}

export default PostForm
