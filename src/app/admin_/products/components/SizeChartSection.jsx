/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@/app/Components/CustomModal'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { cdnPath } from '@/app/Components/cdnPath'
import { Check, Eye } from 'lucide-react'

const SizeChartSection = ({ formData, setFormData }) => {
  const [sizeCharts, setSizeCharts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [selectedChart, setSelectedChart] = useState(null)

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/products/size-chart/get`)
      setSizeCharts(response.data.sizeCharts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [isModalOpen])

  const handleCardSelection = (product) => {
    setFormData((prev) => ({
      ...prev,
      sizeChartId: product.id,
    }))
  }

  const handleShowImage = (product) => {
    setSelectedChart(product)
    setShowImage(true)
  }

  return (
    <div>
      <div>
        <Button onClick={() => setIsModalOpen(true)} label={'Add size chart'} />
        <div className='flex'>
          {formData.sizeChartId ? (
            <div className='pt-2'>
              {sizeCharts
                .filter((chart) => chart.id === formData.sizeChartId)
                .map((selectedChart) => (
                  <SimilarProductCard
                    key={selectedChart.id}
                    product={selectedChart}
                    isSelected={false}
                    showImage={() => handleShowImage(selectedChart)}
                  />
                ))}
            </div>
          ) : (
            <p className='text-gray-500 pt-2'>No size chart selected yet.</p>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={true} size={'3xl'}>
          <ModalHeader>
            Add Size chart
            <ModalCloseButton onClick={() => setIsModalOpen(false)} />
          </ModalHeader>
          <ModalBody>
            <div className='max-h-[400px]'>
              {/* Product list */}
              <div className='min-h-20 grid grid-cols-5 py-3 gap-2'>
                {sizeCharts.length > 0 &&
                  sizeCharts.map((product) => (
                    <SimilarProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleCardSelection(product)}
                      isSelected={formData.sizeChartId === product.id}
                      showImage={() => handleShowImage(product)}
                    />
                  ))}
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
      {showImage && (
        <Modal isOpen={true} size={'full'}>
          <ModalCloseButton onClick={() => setShowImage(false)} />
          <ModalBody className={'w-full'}>
            <div className='flex items-center w-full justify-center h-full'>
              <img
                src={cdnPath + selectedChart?.imageUrl}
                className='max-h-[90vh] object-contain'
                alt={selectedChart?.title}
              />
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  )
}

export const SimilarProductCard = ({
  product,
  onClick,
  isSelected,
  showImage,
}) => {
  return (
    <div
      onClick={onClick}
      className={` cursor-pointer border-blue-700 relative border rounded-md shadow-md hover:shadow-lg transition-transform transform`}
    >
      <img
        src={cdnPath + product.imageUrl}
        alt={product.title}
        className='object-cover w-[136px] h-36 rounded-t-md'
      />
      <div className='flex flex-col p-2'>
        <h3 className='text-gray-800 text-xs'>
          {product?.title?.slice(0, 20)}
        </h3>
      </div>
      {isSelected && (
        <Check
          className='text-white absolute top-1 right-1 rounded-full bg-blue-700 w-7 h-7 p-1'
          strokeWidth={2}
        />
      )}
      <Eye
        onClick={showImage}
        className='text-white absolute top-1 left-1 rounded-full bg-blue-700 w-7 h-7 p-1'
        strokeWidth={2}
      />
    </div>
  )
}

export default SizeChartSection
