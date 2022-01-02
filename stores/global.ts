import { useUsers } from "./users";
import { useTasks } from "./tasks";
import _ from "lodash";
import { acceptHMRUpdate, defineStore } from "pinia";
import { strRamdom } from "~~/helpers/functions";

export const useGlobal = defineStore({
  id: "global",

  state: (): IState => {
    return {
      selectedTaskId: null,
      logs: [],
    };
  },

  getters: {
    points(state): { name: string; points: number }[] {
      const usersStore = useUsers();
      const taskStore = useTasks();
      const result: { name: string; points: number }[] = _.map(
        usersStore.users,
        (user) => {
          let points = 0;
          const logs = _.filter(state.logs, (log) => log.userId === user.id);
          _.each(logs, (log) => {
            const task = _.find(
              taskStore.tasks,
              (task) => task.id === log.taskId
            );
            points = points + task.points;
          });
          return { name: user.name, points };
        }
      );

      return result;
    },
  },

  actions: {
    setSelectedTaskId(id: string) {
      this.selectedTaskId = id;
    },
    reset() {
      localStorage.removeItem("globalStore");
      this.$reset();
    },
    setUserPointsByTask(userId?: string, taskId?: string) {
      if (userId && taskId) {
        const log: IPointLog = {
          id: strRamdom(20),
          userId,
          taskId,
          createdAt: new Date().toISOString(),
        };
        this.logs.push(log);
      }

      this.selectedTaskId = null;
    },
    loadLocalStorage() {
      if (process.client) {
        const store = JSON.parse(localStorage.getItem("globalStore"));
        if (store) this.$state = store;
      }
    },
  },
});

interface IState {
  selectedTaskId: string | null;
  logs: IPointLog[];
}

interface IPointLog {
  id: string;
  userId: string;
  taskId: string;
  createdAt: string;
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobal, import.meta.hot));
}
