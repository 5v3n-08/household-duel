// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { useIsAuthenticated, useAuthUser } from './useAuthUser'
import { API } from '~~/helpers/api'
import { IUser } from '~~/types'
import { RestApi } from '~~/services/RestApi'

interface IAuthenticationMeData {
  authUserId?: string;
  User: IUser[];
  accessToken: string;
  refreshToken: string;
}

export interface ILoginReturnData {
  accessToken: string;
  refreshToken: string;
  User: IUser[];
}

export interface IAuthenticationLogoutData {
  authUserId?: string;
  User: IUser[];
}

export const useAuth2 = () => {
  const authUser = useAuthUser()
  const isAuthenticated = useIsAuthenticated()
  const getUser = authUser.value

  const setUser = (user: IUser | null) => {
    authUser.value = user
  }
  const setAccessToken = (token: string | null) => {
    // localStorage.setItem('accessToken', token)
    const cookie = useCookie('accessToken')
    cookie.value = token
    // if (process.client) {
    // }
  }
  const accessToken = () => {
    // const token = localStorage.getItem('accessToken')
    const token = useCookie('accessToken')
    return useState<string | null>('accessToken', () => token || null)
  }

  const setRefreshToken = (token: string | null) => {
    // localStorage.setItem('refreshToken', token)
    const cookie = useCookie('refreshToken')
    cookie.value = token
    // if (process.client) {
    // }
  }
  const refreshToken = () => {
    // const token = localStorage.getItem('refreshToken')
    const token = useCookie('refreshToken')
    return useState<string | null>('refreshToken', () => token || null)
  }

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const { pending, data, error, refresh } = await RestApi.post<ILoginReturnData>(API.authentication.oauth,
      {
        driver: 'username',
        username: email,
        password
      }
    )
    console.log('route /login data => ' + data.value)
    console.log('route /login error => ' + error.value)
    console.log('route /login pending => ' + pending.value)
    if (data.value?.accessToken) {
      await authenticateUser(data.value.accessToken, data.value.refreshToken, data.value.User[0])
    }

    return getUser
  }

  const authenticateUser = async (accessToken: string, refreshToken: string, user: IUser) => {
    isAuthenticated.value = true
    setUser(user)
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
  }

  const logout = () => {
    // const { pending, data, error, refresh } = await RestApi.get<IAuthenticationLogoutData>(API.authentication.logout)

    setUser(null)
    setAccessToken(undefined)
    setRefreshToken(undefined)
    isAuthenticated.value = false
  }

  const me = async () => {
    if (accessToken === null) {
      navigateTo('/login')
      return
    }
    if (!getUser) {
      try {
        const { pending, data, error, refresh } = await RestApi.get<IAuthenticationMeData>(API.authentication.me)

        console.log('route /me data => ' + data.value)
        console.log('route /me error => ' + error.value)
        console.log('route /me pending => ' + pending.value)

        if (data.value.accessToken && data.value.refreshToken) {
          await authenticateUser(data.value.accessToken, data.value.refreshToken, data.value.User[0])
        } else {
          console.log('logout user')
          logout()
          // ToDo: create /logout view to show that user auto logged out / lockscreen?
          navigateTo('/login')
        }
      } catch (error) {
        console.log('logout user => error')
        logout()
        // ToDo: create /logout view to show that user auto logged out / lockscreen?
        navigateTo('/login')
      }
    }

    return getUser
  }

  const checkSession = async () => {
    // Try to get session again from accessToken with cookie "accessToken"
    if (isAuthenticated.value === false) {
      await me()
    }
  }

  return {
    checkSession,
    isAuthenticated,
    accessToken,
    refreshToken,
    getUser,
    login,
    logout,
    me
  }
}
