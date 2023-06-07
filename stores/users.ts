import { defineStore, acceptHMRUpdate } from 'pinia'
import { useRepo } from 'pinia-orm'
import Profile from '~/models/Profile'
import { ProfileResponse, getProfiles, ProfilesResponse, getProfile } from '~/types'

interface IState {
  usersRaw: Profile[];
}

const files = ref()
const profileRepo = useRepo(Profile)

export const useUserStore = defineStore('userStore', {

  state: (): IState => {
    return {
      usersRaw: []
    }
  },
  actions: {
    async refreshProfile (userId: string): Promise<Profile | null> {
      const supabase = useSupabaseClient()

      const account: ProfileResponse = await getProfile(userId)

      if (account.data) {
        return profileRepo.save(account.data)
      }
      return null
    },
    getAvatarUrl (user: Profile): string | null {
      const supabase = useSupabaseClient()
      if (!user.avatar_filename) {
        return null
      }
      const { data } = supabase.storage.from('avatars').getPublicUrl(user.avatar_filename)
      return data.publicUrl
    },
    async saveProfile (user: Profile) {
      const supabase = useSupabaseClient()
      const dayjs = useDayjs()
      user.updated_at = dayjs().toISOString()
      const updates = {
        ...user
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      profileRepo.save(updates)
      if (error) { throw error }
    },
    updateCurrentUser (user: Profile) {
      // this.user = user
    },
    async uploadAvatar (event) {
      console.log(typeof event)
      const supabase = useSupabaseClient()
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
      const supabase = useSupabaseClient()

      const accounts: ProfilesResponse = await getProfiles()

      if (accounts.data) {
        accounts.data.forEach(async (item, index) => {
          item.avatarurl = this.getAvatarUrl(item)
          profileRepo.save(new Profile(item))
        })
      }
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
