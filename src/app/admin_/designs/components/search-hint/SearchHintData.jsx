import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { deleteImageFromCDN } from '../../../../../../utils/deleteImageFromCDN'
import Button from '../../../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'
import SearchHintModal from './SearchHintModal'
import { FilePen, Trash2 } from 'lucide-react'

const SearchHintData = () => {
  const [buttons, setButtons] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showButtonModal, setShowButtonModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    fetchButtons()
  }, [])

  const fetchButtons = async () => {
    try {
      const response = await axios.get('/api/admin/designs/search-hint')
      setButtons(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async () => {
    try {
      const response = await axios.delete('/api/admin/designs/search-hint', {
        data: { id: selectedItem.id },
      })

      if (response.status === 200) {
        const deleteImage = await deleteImageFromCDN(selectedItem.iconUrl)
        console.log(deleteImage)
      }

      setButtons((prev) => prev.filter((item) => item.id !== selectedItem.id))
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
          <p className='text-base font-bold'>Search Hint</p>
          <Button
            label={'Add Search Hint'}
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
              <th className='border px-4 py-2 text-left'>Text</th>
              <th className='border px-4 py-2 text-center w-28'>Action</th>
            </tr>
          </thead>
          <tbody>
            {buttons.length > 0 &&
              buttons.map((item, index) => (
                <tr key={index} className='border-b'>
                  <td className='border px-4 py-2'>{item?.text}</td>
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
              <SearchHintModal
                isOpen={true}
                onClose={() => setShowButtonModal(false)}
                item={selectedItem}
                refresh={fetchButtons}
                editMode={editMode}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SearchHintData
