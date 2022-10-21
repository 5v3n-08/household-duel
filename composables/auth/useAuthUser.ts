import type { UserWithoutPassword } from '~~/types'

export const useAuthUser = () => {
  return useState<UserWithoutPassword | null>('user', () => null)
}

export const useAccessToken = () => {
  let token = null
  if (process.client) {
    token = localStorage.getItem('accessToken')
  }
  return useState<string | null>('accessToken', () => token || null)
}

export const useRefreshToken = () => {
  let token = null
  if (process.client) {
    token = localStorage.getItem('refreshToken')
  }
  return useState<string | null>('refreshToken', () => token || null)
}

export const useIsAuthenticated = () => {
  return useState<boolean>('isAuthenticated', () => false)
}
