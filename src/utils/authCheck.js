// utils/authCheck.js
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'

const authCheck = async (router) => {
  try {
    const response = await axios.post(
      '/api/admin/check-admin',
      {},
      {
        withCredentials: true,
      }
    )

    if (response.status === 200) {
      console.log('Access granted to Admin')
      return true
    }
  } catch (error) {
    console.log(error)
    enqueueSnackbar('Access denied. Redirecting...', {
      variant: 'error',
      autoHideDuration: 3000,
    })
    router.push('/')
    return false
  }
}

export default authCheck
