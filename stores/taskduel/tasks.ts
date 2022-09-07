import _ from "lodash";
import { useTaskDuel } from "./global";
import { strRamdom } from "~~/helpers/functions";
import { acceptHMRUpdate, defineStore } from "pinia";

export const useTasks = defineStore({
  id: "tasks",

  state: (): IState => {
    return {
      tasks: defaultTasks,
    };
  },
  getters: {
    categories(state): string[] {
      return _.uniq(state.tasks.map((task) => task.category));
    },
    selectedTask(state): ITask | undefined {
      const taskduelStore = useTaskDuel();
      return state.tasks.find((task) => task.id === taskduelStore.selectedTaskId) ?? undefined;
    },
  },
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasks, import.meta.hot));
}

interface IState {
  tasks: ITask[];
}

interface ITask {
  id: string;
  name: string;
  description?: string;
  category: string;
  points: number;
}

const defaultTasks = [
  {
    id: strRamdom(20),
    name: "Müll rausbringen",
    description: "Beinhaltet alle Mülleimer und das nachfüllen der neuen leeren Müllbeutel.",
    category: "Allgemein",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Wohnung saugen",
    description: "Beinhaltet alle Räume der Wohnung.",
    category: "Allgemein",
    points: 10,
  },
  {
    id: strRamdom(20),
    name: "Einkaufen",
    description: "Gilt nur wenn diese Person alleine einkaufen war und für den kompletten Haushalt eingekauft hat.",
    category: "Allgemein",
    points: 10,
  },
  {
    id: strRamdom(20),
    name: "Fenter putzen",
    description: "Es müssen alle Fenster der Wohnung geputzt werden.",
    category: "Allgemein",
    points: 20,
  },
  {
    id: strRamdom(20),
    name: "Sport machen",
    description: "Dieses gilt nur wenn mindesten 30 Minuten Sport gemacht wurde.",
    category: "Allgemein",
    points: 10,
  },
  {
    id: strRamdom(20),
    name: "+ 2 Punkte",
    description: "Gibt manuell Punkte für ein Ereignis Muss mit anderen Personen abgesprochen werden.",
    category: "Allgemein",
    points: 2,
  },
  {
    id: strRamdom(20),
    name: "+ 5 Punkte",
    description: "Gibt manuell Punkte für ein Ereignis Muss mit anderen Personen abgesprochen werden.",
    category: "Allgemein",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "+ 10 Punkte",
    description: "Gibt manuell Punkte für ein Ereignis Muss mit anderen Personen abgesprochen werden.",
    category: "Allgemein",
    points: 10,
  },

  {
    id: strRamdom(20),
    name: "Katzen füttern",
    description: "Das Katzenfüttern beinhaltet BEIDE Näpfe mit Nassfutter oder Trokenfutter zu befüllen.",
    category: "Haustiere",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Katzenklos sauber machen",
    category: "Haustiere",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Hund spazieren (klein)",
    category: "Haustiere",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Hund spazieren (groß)",
    category: "Haustiere",
    points: 10,
  },
  {
    id: strRamdom(20),
    name: "Trinken auffüllen",
    category: "Haustiere",
    points: 2,
  },
  {
    id: strRamdom(20),
    name: "Hund füttern",
    category: "Haustiere",
    points: 2,
  },
  {
    id: strRamdom(20),
    name: "Futterplätze sauber machen",
    description: "Dazu gehören die Katzen (Fensterbank) und der Hunde (Flur) Platz",
    category: "Haustiere",
    points: 10,
  },
  {
    id: strRamdom(20),
    name: "Hund kämmen",
    category: "Haustiere",
    points: 10,
  },
  {
    id: strRamdom(20),
    name: "Aufräumen",
    category: "Küche",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Essen kochen",
    description: "Gilt nur wenn wirklich gekocht wurde und keine 'Pizza' gemacht wurde",
    category: "Küche",
    points: 10,
  },
  {
    id: strRamdom(20),
    name: "Spühlmaschiene ausräumen",
    description: "Beinhaltet auch das einräumen der Spühlmaschiene.",
    category: "Küche",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Kühlschrank aufräumen",
    category: "Küche",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Aufräumen",
    category: "Schlafzimmer",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Wäsche waschen",
    category: "Schlafzimmer",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Wäsche einräumen",
    category: "Schlafzimmer",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Bett machen",
    category: "Schlafzimmer",
    points: 2,
  },
  {
    id: strRamdom(20),
    name: "Bett neu beziehen",
    category: "Schlafzimmer",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Aufräumen",
    category: "Badezimmer",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Waschbecken putzen",
    category: "Badezimmer",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Spiegel säubern",
    category: "Badezimmer",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Toilette putzen",
    category: "Badezimmer",
    points: 10,
  },
  {
    id: strRamdom(20),
    name: "Dusche putzen",
    description:
      "Zu dieser Aufgabe gehören das Entkalken der Duschköpfe, reinigen des Abflusses, Duschwände und Fliesen, falls dieses von nöten ist.",
    category: "Badezimmer",
    points: 15,
  },
  {
    id: strRamdom(20),
    name: "Aufräumen",
    category: "Büro",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Aufräumen",
    category: "Flur",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Roborock entleeren",
    category: "Flur",
    points: 2,
  },
  {
    id: strRamdom(20),
    name: "Roborock saubermachen",
    category: "Flur",
    points: 5,
  },
  {
    id: strRamdom(20),
    name: "Aufräumen",
    category: "Wohnzimmer",
    points: 5,
  },
];
