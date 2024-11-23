import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import { FilePen, Trash2 } from 'lucide-react'
import ArrivalsLinkModal from './ArrivalsLinkModal'

const ArrivalsLinkData = () => {
  const [links, setLinks] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showButtonModal, setShowButtonModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const response = await axios.get('/api/admin/designs/arrivals-link')
      setLinks(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async () => {
    try {
      await axios.delete('/api/admin/designs/arrivals-link', {
        data: { id: selectedItem.id },
      })

      setLinks((prev) => prev.filter((item) => item.id !== selectedItem.id))
      setShowDeleteModal(false)
      setSelectedItem(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='bg-white p-3'>
        <div className='flex justify-between px-[1px]'>
          <p className='text-base font-bold'>Arrivals Link</p>
          <Button
            label={'Add Link'}
            onClick={() => {
              setEditMode(false)
              setSelectedItem(null)
              setShowButtonModal(true)
            }}
          />
        </div>
        <table className='min-w-full border-collapse border border-gray-300'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='border px-4 py-2 text-left'>Link</th>
              <th className='border px-4 py-2 text-center w-28'>Action</th>
            </tr>
          </thead>
          <tbody>
            {links.length > 0 &&
              links.map((item, index) => (
                <tr key={index} className='border-b'>
                  <td className='border px-4 py-2'>
                    <a
                      href={item?.hyperLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 underline'
                    >
                      {item?.link}
                    </a>
                  </td>
                  <td className='border px-2 text-center py-2'>
                    <div className='flex justify-center gap-2'>
                      <FilePen
                        className='text-blue-800 cursor-pointer'
                        onClick={() => {
                          setSelectedItem(item)
                          setShowButtonModal(true)
                          setEditMode(true)
                        }}
                      />

                      <Trash2
                        className='text-red-600 cursor-pointer'
                        onClick={() => {
                          setSelectedItem(item)
                          setShowDeleteModal(true)
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            {showDeleteModal && (
              <DeleteModal
                isOpen={true}
                onClose={() => setShowDeleteModal(false)}
                onDelete={() => deleteData()}
              />
            )}
            {showButtonModal && (
              <ArrivalsLinkModal
                isOpen={true}
                onClose={() => setShowButtonModal(false)}
                item={selectedItem}
                refresh={fetchLinks}
                editMode={editMode}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ArrivalsLinkData
