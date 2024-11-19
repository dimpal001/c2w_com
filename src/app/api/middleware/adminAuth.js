import { authenticate } from '../../../utils/authanticate'

export function isAdmin(request) {
  const user = authenticate(request)

  // If user is not authenticated or not an admin, return false
  if (!user || user.role !== 'ADMIN') {
    return false
  }

  return true
}
