// import Header from '@/app/Components/Header'
// import React from 'react'
// import OrdersPage from './OrdersPage'
// import axios from 'axios'

// const page = async () => {
//   try {
//     const response = await axios.get(
//       `http://192.168.1.21:3000/api/users/orders`
//     )
//     console.log(response.data)
//     const orders = response.data
//     console.log(orders)
//     return (
//       <div>
//         <Header />
//         <OrdersPage orders={orders} />
//       </div>
//     )
//   } catch (error) {
//     console.log(error)
//   }
// }

// export default page

import Header from '@/app/Components/Header'
import React from 'react'
import OrdersPage from './OrdersPage'

const page = () => {
  return (
    <div>
      <Header />
      <OrdersPage />
    </div>
  )
}

export default page
