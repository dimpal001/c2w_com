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
  const [selectedCategories, setSelectedCategories] = useState(
    postData?.categories || []
  )
  const [tags, setTags] = useState(postData?.tags || [])
  const [isImgDrawerOpen, setIsImgDrawerOpen] = useState(false)
  const [selectedField, setSelectedField] = useState(null)
  const [selectedContentImage, setSelectedContentImage] = useState(null)

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token
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
    if (selectedCategories.includes(category.id)) {
      const filteredCategories = selectedCategories.filter(
        (item) => item !== category.id
      )
      setSelectedCategories(filteredCategories)

      setPostData({
        ...postData,
        categories: filteredCategories,
      })
    } else {
      const updatedCategories = [...selectedCategories, category.id]
      setSelectedCategories(updatedCategories)

      setPostData({
        ...postData,
        categories: updatedCategories,
      })
    }
  }

  useEffect(() => {
    console.log(selectedContentImage)
  }, [selectedContentImage])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      e.preventDefault()
      const newTag = e.target.value.trim()

      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag]
        setTags(updatedTags)

        setPostData({
          ...postData,
          tags: updatedTags,
        })
      }

      e.target.value = ''
    }
  }

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)

    setPostData({
      ...postData,
      tags: updatedTags,
    })
  }

  return (
    <div className='flex items-start w-full gap-5 flex-row-reverse'>
      <div className='w-[33%] min-w-[33%] flex flex-col gap-3 items-start'>
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
            className='w-full mt-'
            alt=''
          />
        )}
        <div className='w-full mt-4'>
          <label htmlFor='title' className='text-base'>
            Blog Title
          </label>
          <BlogInputField
            id={'title'}
            onChange={(e) =>
              setPostData({
                ...postData,
                title: e.target.value,
              })
            }
            value={postData?.title}
            placeholder={'Title of the blog'}
            className={'w-full mt-1'}
          />
        </div>
        <div className='mt-4'>
          <label className='text-base' htmlFor=''>
            Categories
          </label>
          <div className='py-2 flex gap-3 flex-wrap'>
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
        </div>
        <div className='mt-4 flex flex-col w-full'>
          <label htmlFor='tags' className='text-base'>
            Tags
          </label>
          <textarea
            name=''
            placeholder='Type a tag and hit enter ...'
            id='tags'
            onKeyDown={handleKeyDown}
            className='px-3 mt-4 w-full py-[10px] border focus:outline-none focus:border-blue-600 text-base'
          ></textarea>

          <div className='mt-4'>
            <div className='flex gap-3 flex-wrap'>
              {tags.length > 0 &&
                tags.map((item, index) => (
                  <span
                    onClick={() => removeTag(item)}
                    className='px-3 text-xs py-[6px] hover:bg-blue-600 hover:text-white cursor-pointer rounded-full flex items-center justify-center bg-gray-300'
                    key={index}
                  >
                    {item}
                  </span>
                ))}
            </div>
            {tags.length > 0 && (
              <p className='text-xs text-neutral-700 mt-4'>
                Tap to remove the tag
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3 items-start w-[66%] min-w-[66%]'>
        <CustomEditor
          value={postData?.content || ''}
          onChange={(newContent) =>
            setPostData({
              ...postData,
              content: newContent,
            })
          }
          onImageButtonClick={() => {
            setIsImgDrawerOpen(true)
            setSelectedField(null)
            setSelectedField('content')
          }}
          selectedContentImage={selectedContentImage}
        />

        {isImgDrawerOpen && (
          <SelectImageSection
            isOpen={true}
            onClose={() => setIsImgDrawerOpen(false)}
            postData={postData}
            data={selectedField}
            setPostData={setPostData}
            setSelectedContentImage={setSelectedContentImage}
          />
        )}
      </div>
    </div>
  )
}

const BlogInputField = ({ placeholder, id, className, value, onChange }) => {
  return (
    <input
      id={id}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={`${className} px-3 py-[10px] border focus:outline-none focus:border-blue-600 text-base`}
    />
  )
}

export default PostForm
