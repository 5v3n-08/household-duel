import { acceptHMRUpdate, defineStore } from "pinia";

interface IState {
  isAuthenticated: boolean;
}


export const useAuthentication = defineStore({
  id: "authentication",

  state: (): IState => {
    return {
      isAuthenticated: false,
    };
  },
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthentication, import.meta.hot));
}