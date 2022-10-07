import { acceptHMRUpdate, defineStore } from 'pinia'

interface IState {
  isAuthenticated: boolean;
  token: string;
  isAdmin: boolean;
}

interface IAuthenticated {
  token: string;
}

export const useAuthentication = defineStore({
  id: 'authentication',

  state: (): IState => {
    return {
      isAuthenticated: false,
      token: null,
      isAdmin: false
    }
  },
  getters: {
    getUserToken (state): string | null {
      return state.token
    }
  },
  actions: {
    setIsAuthenticated (value: boolean) {
      this.isAuthenticated = value
    },
    userAuthenticated (data: IAuthenticated) {
      this.setIsAuthenticated(true)
      this.token = data.token
    },
    setIsAdmin (value: boolean) {
      this.isAdmin = value
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthentication, import.meta.hot))
}
