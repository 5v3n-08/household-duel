import { acceptHMRUpdate, defineStore } from "pinia";

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

interface IState {
  isAuthenticated: boolean;
}
