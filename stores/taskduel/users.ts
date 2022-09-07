import { strRamdom } from "~~/helpers/functions";
import { acceptHMRUpdate, defineStore } from "pinia";

export const useUsers = defineStore({
  id: "users",

  state: (): IState => {
    return {
      users: defaultUsers,
    };
  },
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot));
}

interface IState {
  users: IUser[];
}

interface IUser {
  id: string;
  name: string;
}

const defaultUsers: IUser[] = [
  {
    id: strRamdom(20),
    name: "Sven",
  },
  {
    id: strRamdom(20),
    name: "Anna",
  },
];
