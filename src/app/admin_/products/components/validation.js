import { enqueueSnackbar } from 'notistack'

export const validation = ({ formData }) => {
  if (formData.title === '') {
    enqueueSnackbar('Enter a valid title', { variant: 'error' })
    return false
  }
  if (formData.customerTypeId === '') {
    enqueueSnackbar('Select a customer type', { variant: 'error' })
    return false
  }
  if (formData.estimatedDeliveryDay === 0) {
    enqueueSnackbar('Enter a valid number', { variant: 'error' })
    return false
  }
  if (formData.displayPrice === 0) {
    enqueueSnackbar('Enter a valid display price', { variant: 'error' })
    return false
  }
  if (formData.categories.length === 0) {
    enqueueSnackbar('Select a category', { variant: 'error' })
    return false
  }

  return true
}
