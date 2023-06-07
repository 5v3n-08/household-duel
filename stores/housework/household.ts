import { defineStore, acceptHMRUpdate } from 'pinia'
import { useRepo } from 'pinia-orm'
import Household from '~/models/Household'
import { HouseholdResponse, getHouseholds, HouseholdsResponse, getHousehold } from '~/types'

interface IState {
  usersRaw: Household[];
}

const householdRepo = useRepo(Household)

export const useHouseholdStore = defineStore('householdStore', {

  state: (): IState => {
    return {
      usersRaw: []
    }
  },
  actions: {
    async refreshHousehold (householdId: string): Promise<Household | null> {
      const supabase = useSupabaseClient()

      const item: HouseholdResponse = await getHousehold(householdId)

      if (item.data) {
        return householdRepo.save(item.data)
      }
      return null
    },
    async saveHousehold (user: Household) {
      const supabase = useSupabaseClient()
      const dayjs = useDayjs()
      user.updated_at = dayjs().toISOString()
      const updates = {
        ...user
      }

      let { error } = await supabase.from('households').upsert(updates)
      householdRepo.save(updates)
      if (error) { throw error }
    },
    async getHouseholds () {
      const items: HouseholdsResponse = await getHouseholds()
      householdRepo.save(items)
    }
  },

  getters: {
    getCurrentUser: (state) => {
      const supabaseUser = useSupabaseUser()
      if (supabaseUser.value?.id) {
        const user = useRepo(Profile).find(supabaseUser.value.id)
        return user
      }
      const user = useRepo(Profile).make()
      return user
    },
    getCurrentProfile: (state) => {
      const supabaseUser = useSupabaseUser()
      if (supabaseUser.value?.id) {
        return useRepo(Profile).find(supabaseUser.value.id)
      }
      return useRepo(Profile).make()
    },
    getUser: (state) => {
      return state
    },
    users: () => {
      return useRepo(Profile).orderBy('updated_at').get()
    }
  }
})

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(acceptHMRUpdate(useUserStore, import.meta.webpackHot))
}
