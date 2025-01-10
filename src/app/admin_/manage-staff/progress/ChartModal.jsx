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

const ChartModal = ({ isOpen, onClose, data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
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
    },
  }

  return (
    <Modal size={'2xl'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          Product Uploads Overview
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          {Object.keys(data).length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p>No data available to display.</p>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ChartModal
