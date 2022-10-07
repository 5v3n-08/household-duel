import { useAuthUser } from './useAuthUser'
import { API } from '~~/helpers/api'
import { IAuthenticationLogoutData, ILoginReturnData } from '~~/types'

export const useAuth = () => {
  const authUser = useAuthUser()

  const setUser = (user: any) => {
    authUser.value = user
  }

  const setCookie = (cookie: any) => {
    cookie.value = cookie
  }

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const { pending, data, error, refresh } = await useBackend<ILoginReturnData>(`${API.authentication.oauth}`,
      {
        driver: 'username',
        username: email,
        password
      },
      EHttpMethods.POST
    )

    // if (data.value?.token) {
    //   console.log('user successful authenticated with token => ' + data.value.token)
    //   authentication.userAuthenticated({ token: data.value.token })
    // }
    // const data = await $fetch('/api/auth/login', {
    //   method: 'POST',
    //   body: {
    //     email,
    //     password,
    //     rememberMe
    //   }
    // })

    setUser(data.value.User[0])

    return authUser
  }

  const logout = async () => {
    const { pending, data, error, refresh } = await useBackend<IAuthenticationLogoutData>(`${API.authentication.logout}`)

    setUser(data.value.User[0])
  }

  const me = async () => {
    if (!authUser.value) {
      try {
        const { pending, data, error, refresh } = await useBackend<IAuthenticationLogoutData>(`${API.authentication.logout}`, undefined, undefined, { headers: useRequestHeaders(['cookie']) as HeadersInit })

        setUser(data.value.User[0])
      } catch (error) {
        setCookie(null)
      }
    }

    return authUser
  }

  return {
    login,
    logout,
    me
  }
}
