/* eslint-disable react/prop-types */
import React from 'react'
import {
  ShoppingCart,
  Loader,
  CheckCircle,
  Truck,
  Home,
  XCircle,
  Package,
} from 'lucide-react'

const statusDetails = [
  { id: 'INCOMPLETE', label: 'Incomplete', icon: <ShoppingCart /> },
  { id: 'PENDING', label: 'Pending', icon: <Loader /> },
  { id: 'APPROVED', label: 'Approved', icon: <CheckCircle /> },
  { id: 'SHIPPED', label: 'Shipped', icon: <Truck /> },
  { id: 'INTRANSIT', label: 'In Transit', icon: <Package /> },
  { id: 'DELIVERED', label: 'Delivered', icon: <Home /> },
  { id: 'CANCELLED', label: 'Cancelled', icon: <XCircle /> },
]

const OrderTrackingSection = ({ status }) => {
  const currentStatusIndex = statusDetails.findIndex(
    (item) => item.id === status
  )

  return (
    <div className='p-6 bg-pink-50 rounded-lg shadow-md py-10 mb-6'>
      <div className='flex items-center max-sm:grid grid-cols-4 gap-3 justify-between'>
        {statusDetails.map((step, index) => (
          <div key={step.id} className='flex-1 flex flex-col items-center'>
            <div
              className={`w-12 h-12 max-sm:w-10 max-sm:h-10 max-sm:p-[10px] flex items-center justify-center rounded-full text-white ${
                status === 'CANCELLED' && step.id === 'CANCELLED'
                  ? 'bg-red-500'
                  : index <= currentStatusIndex
                  ? 'bg-pink-600'
                  : 'bg-gray-300'
              }`}
            >
              {step.icon}
            </div>
            <p
              className={`text-sm max-sm:text-xs mt-2 ${
                status === 'CANCELLED' && step.id === 'CANCELLED'
                  ? 'text-red-500 font-bold'
                  : index <= currentStatusIndex
                  ? 'text-pink-500 font-bold'
                  : 'text-gray-500'
              }`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderTrackingSection
