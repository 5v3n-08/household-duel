import { defineStore, acceptHMRUpdate } from 'pinia'

interface IState {
  error: {
    msg: string | null;
    code: number | null;
  } | null,
  counter: number,
  name: string,
  isAdmin: boolean,
}

export const useGlobalStore = defineStore('globalStore', {

  state: (): IState => {
    return {
      error: {
        msg: null,
        code: null
      },
      counter: 10,
      name: 'Eduardo',
      isAdmin: true
    }
  },
  actions: {
    hit () {
      this.counter++
    },
    setError (msg: string, code: number) {
      this.error.msg = msg
      this.error.code = code
    }
  },

  getters: {
    getCount: state => state.counter,
    getUser: (state) => {
      return state.name
    },
    getError: (state) => {
      return state.error
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
