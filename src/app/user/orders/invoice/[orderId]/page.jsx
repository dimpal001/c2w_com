import React from 'react'
import InvoicePage from './InvoicePage'

const page = async ({ params }) => {
  try {
    const { orderId } = await params

    return (
      <div>
        <InvoicePage orderId={orderId} />
      </div>
    )
  } catch (error) {
    console.log('Error fetching data:', error)
    return <div>Error loading data.</div>
  }
}

export default page
