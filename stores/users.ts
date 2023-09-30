import { defineStore, acceptHMRUpdate } from 'pinia'
import { useRepo } from 'pinia-orm'
import { Database } from '../types/database'
import Household from '~/models/Household'
import Address from '~/models/Address'
import Profile from '~/models/Profile'
import { ProfileResponse, getProfiles, ProfilesResponse, getProfile, HouseholdsResponse, refreshHouseholds } from '~/types'
import HouseholdMember from '~/models/HouseholdMember'

interface IState {
  usersRaw: Profile[];
}

const files = ref()
const profileRepo = useRepo(Profile)
const householdRepo = useRepo(Household)

export const useUserStore = defineStore('userStore', {

  state: (): IState => {
    return {
      usersRaw: []
    }
  },
  actions: {
    async refreshProfile (userId: string): Promise<Profile | null> {
      const account: ProfileResponse = await getProfile(userId)

      if (account.data) {
        return profileRepo.save(account.data)
      }
      return null
    },
    getAvatarUrl (user: Profile): string | null {
      const supabase = useSupabaseClient<Database>()
      if (!user.avatar_filename) {
        return null
      }
      const { data } = supabase.storage.from('avatars').getPublicUrl(user.avatar_filename)
      return data.publicUrl
    },
    async saveProfile (user: Profile) {
      const supabase = useSupabaseClient<Database>()
      const dayjs = useDayjs()
      user.updated_at = dayjs().toISOString()
      const updates = {
        ...user
      }
      console.log('saving to database')
      console.log(updates)
      let { error } = await supabase.from('profiles').upsert(updates)
      profileRepo.save(updates)
      if (error) { throw error }
    },
    async uploadAvatar (event) {
      console.log(typeof event)
      const supabase = useSupabaseClient<Database>()
      const supabaseUser = useSupabaseUser()
      files.value = event.target.files
      try {
        if (!files.value || files.value.length === 0) {
          throw new Error('You must select an image to upload.')
        }

        const file = files.value[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        let { data, error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
        if (uploadError) { throw uploadError }
        console.log(data)

        if (supabaseUser.value?.id) {
          const user = profileRepo.find(supabaseUser.value.id)
          if (user) {
            user.avatar_filename = filePath
            user.avatarurl = this.getAvatarUrl(user)
            await this.saveProfile(user)
          }
        }
      } catch (error) {
        alert(error.message)
      }
    },
    async initilizeProfiles () {
      const accounts: ProfilesResponse = await getProfiles()

      if (accounts.data) {
        accounts.data.forEach(async (item, index) => {
          item.avatarurl = this.getAvatarUrl(item)
          profileRepo.save(new Profile(item))
        })
      }
    },
    async getNewHouseholds (userId: string): Promise<Household[] | null> {
      const households: HouseholdsResponse = await refreshHouseholds()

      if (households.data) {
        householdRepo.save(households.data)
        return householdRepo.all()
      }
      return null
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
    },
    getHouseholds: () => {
      return householdRepo.all()
    },
    emptyAddress: () => {
      return useRepo(Address).make()
    },
    emptyHousehold: () => {
      const household = useRepo(Household).make()
      household.address = useRepo(Address).make()
      return household
    }
  }
})

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(acceptHMRUpdate(useUserStore, import.meta.webpackHot))
}
