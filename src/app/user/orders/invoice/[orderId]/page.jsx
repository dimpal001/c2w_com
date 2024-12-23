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
  } catch {
    return <div>Error loading data.</div>
  }
}

export default page
