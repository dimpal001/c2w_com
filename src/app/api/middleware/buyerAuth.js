import { authenticate } from '../../../utils/authanticate'

export function isBuyer(request) {
  const user = authenticate(request)

  // If user is not authenticated or not an admin, return false
  if (!user || user.role !== 'BUYER') {
    return false
  }

  return true
}
