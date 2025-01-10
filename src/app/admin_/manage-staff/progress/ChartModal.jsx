/* eslint-disable react/prop-types */
import React from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@/app/Components/CustomModal'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ChartModal = ({ isOpen, onClose, data, name }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Number of Products Uploaded',
        data: Object.values(data).map((products) => products.length),
        backgroundColor: '#2563eb',
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Products Uploaded by Date',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}`,
        },
      },
    },
  }

  return (
    <Modal size={'3xl'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          Product Uploads Overview of {name}
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div className='w-full'>
            {Object.keys(data).length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <p>No data available to display.</p>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ChartModal
