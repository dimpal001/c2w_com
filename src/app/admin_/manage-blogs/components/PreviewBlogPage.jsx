/* eslint-disable react/prop-types */
import { cdnPath } from '@/app/Components/cdnPath'
import { Drawer, DrawerBody, DrawerContent } from '@nextui-org/drawer'
import Image from 'next/image'
import React from 'react'

const PreviewBlogPage = ({ isOpen, onClose, postData }) => {
  return (
    <Drawer isOpen={isOpen} size='full' onClose={onClose}>
      <DrawerContent className='h-screen overflow-scroll'>
        <DrawerBody>
          <div className='w-1/2 py-5 mx-auto h-screen'>
            {postData?.thumbnailImage && (
              <Image
                className='w-full h-[400px] object-cover'
                src={cdnPath + postData?.thumbnailImage}
                width={1000}
                height={500}
                alt='adsf'
              />
            )}

            {postData?.title && (
              <div className='py-12'>
                <p className='text-5xl font-serif font-bold'>
                  {postData?.title}
                </p>
              </div>
            )}

            {postData?.createdAt && (
              <p className='mb-7 text-xl text-gray-400 font-serif tracking-wide'>
                Published on {new Date(postData?.createdAt).toDateString()}
              </p>
            )}

            {postData?.content && (
              <div>
                <div
                  className='text-2xl font-serif tracking-wide editor-content'
                  dangerouslySetInnerHTML={{ __html: postData?.content }}
                />
              </div>
            )}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default PreviewBlogPage
