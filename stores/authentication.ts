import { acceptHMRUpdate, defineStore } from 'pinia'
import { API } from '~~/helpers/api'
import RestApi from '~~/services/RestApi'
import { IUser, UserWithoutPassword } from '~~/types'

interface IState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  getUser: UserWithoutPassword | null
}

interface IAuthenticated {
  token: string;
}

interface IAuthenticationMeData {
  authUserId?: string;
  User: IUser[];
  accessToken: string;
  refreshToken: string;
}
interface IAuthenticationRefreshTokenData {
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

const supabase = useSupabaseClient()

export const useAuthentication = defineStore({
  id: 'authentication',

  state: (): IState => {
    return {
      isAuthenticated: false,
      isAdmin: false,
      getUser: null
    }
  },
  getters: {
    getAccessToken (state): string | null {
      // return this.$cookies.get('accessToken')
      // return localStorage.getItem('accessToken')
      return useCookie('accessToken').value
    },
    getRefreshToken (state): string | null {
      // return this.$cookies.get('refreshToken')
      // return localStorage.getItem('refreshToken')
      return useCookie('refreshToken').value
    }
  },
  actions: {
    setIsAuthenticated (value: boolean) {
      this.isAuthenticated = value
    },
    setIsAdmin (value: boolean) {
      this.isAdmin = value
    },
    setUser (user: IUser) {
      this.getUser = user
    },
    setAccessToken (token: string | null) {
      // const cookie = localStorage.setItem('accessToken', token)
      const cookie = useCookie('accessToken')
      cookie.value = token
    },
    setRefreshToken (token: string | null) {
      // const cookie = localStorage.setItem('refreshToken', token)
      const cookie = useCookie('refreshToken')
      cookie.value = token
    },
    async login (
      email: string,
      password: string,
      rememberMe: boolean
    ): Promise<IUser | null> {
      const { pending, data: loginData, error, refresh } = await RestApi.post<ILoginReturnData>(API.authentication.oauth,
        {
          driver: 'username',
          username: email,
          password
        }
      )
      console.log('route ' + API.authentication.oauth + ' data => ' + loginData.value)
      console.log('route /login error => ' + error.value)
      console.log('route /login pending => ' + pending.value)
      if (loginData.value?.accessToken) {
        this.authenticateUser(loginData.value.accessToken, loginData.value.refreshToken, loginData.value.User[0])
        return loginData.value.User[0]
      } else {
        return null
      }
    },
    authenticateUser (accessToken: string, refreshToken: string, user: IUser) {
      // console.log('authenticated => ' + accessToken)
      this.isAuthenticated = true
      this.setUser(user)
      this.setAccessToken(accessToken)
      this.setRefreshToken(refreshToken)
    },
    logout () {
      // const { pending, data, error, refresh } = await RestApi.get<IAuthenticationLogoutData>(API.authentication.logout)
      this.setUser(null)
      this.setAccessToken(undefined)
      this.setRefreshToken(undefined)
      this.isAuthenticated = false
    },
    async me (): Promise<IUser> | null {
      const { data: { user: User } } = await supabase.auth.getUser()
      if (this.getAccessToken === null) {
        navigateTo('/login')
        return
      }
      if (!this.getUser) {
        try {
          const { pending, data, error, refresh } = await RestApi.get<IAuthenticationMeData>(API.authentication.me)

          // console.log('route /me data => ' + data.value)
          // console.log('route /me error => ' + error.value)
          // console.log('route /me pending => ' + pending.value)

          if (data.value.accessToken && data.value.refreshToken) {
            this.authenticateUser(data.value.accessToken, data.value.refreshToken, data.value.User[0])
            return data.value.User[0] ?? null
          } else {
            const { data: refreshTokenData } = await RestApi.get<IAuthenticationRefreshTokenData>(API.authentication.refreshToken)
            if (refreshTokenData.value.accessToken && refreshTokenData.value.refreshToken) {
              this.authenticateUser(refreshTokenData.value.accessToken, refreshTokenData.value.refreshToken, refreshTokenData.value.User[0])
            } else {
              console.log('logout user')
              // this.logout()
              // ToDo: create /logout view to show that user auto logged out / lockscreen?
              // navigateTo('/login')
            }
          }
        } catch (error) {
          console.log('logout user => error')
          // this.logout()
          // ToDo: create /logout view to show that user auto logged out / lockscreen?
          // navigateTo('/login')
        }
      }

      return null
    },
    async getNewAccessTokenByRefreshToken (): Promise<IUser> | null {
      if (this.getAccessToken === null) {
        navigateTo('/login')
        return
      }
      if (!this.getUser) {
        try {
          const { pending, data, error, refresh } = await RestApi.get<IAuthenticationMeData>(API.authentication.me)

          // console.log('route /me data => ' + data.value)
          // console.log('route /me error => ' + error.value)
          // console.log('route /me pending => ' + pending.value)

          if (data.value.accessToken && data.value.refreshToken) {
            this.authenticateUser(data.value.accessToken, data.value.refreshToken, data.value.User[0])
            return data.value.User[0] ?? null
          } else {
            const { data: refreshTokenData } = await RestApi.get<IAuthenticationRefreshTokenData>(API.authentication.refreshToken)
            if (refreshTokenData.value.accessToken && refreshTokenData.value.refreshToken) {
              this.authenticateUser(refreshTokenData.value.accessToken, refreshTokenData.value.refreshToken, refreshTokenData.value.User[0])
            } else {
              console.log('logout user')
              // this.logout()
              // ToDo: create /logout view to show that user auto logged out / lockscreen?
              // navigateTo('/login')
            }
          }
        } catch (error) {
          console.log('logout user => error')
          // this.logout()
          // ToDo: create /logout view to show that user auto logged out / lockscreen?
          // navigateTo('/login')
        }
      }

      return null
    },
    async checkSession () {
      const user = useSupabaseUser()
      // Try to get session again from accessToken with cookie "accessToken"
      if (!user.value) {
        await this.me()
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthentication, import.meta.hot))
}
