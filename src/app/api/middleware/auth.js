import { authenticate } from '../../../utils/authanticate'

export function isAuth(request) {
  const user = authenticate(request)

  if (!user) {
    return false
  }

  return true
}
