import { defineStore, acceptHMRUpdate } from 'pinia'
import { useRepo } from 'pinia-orm'
import Profile from '~/models/Profile'

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
      let { data } = await supabase
        .from('profiles')
        .select('id, title, website, avatar_filename, avatarurl, firstname, lastname, created_at, updated_at')
        .eq('id', userId)
        .single()

      if (data) {
        return profileRepo.save(data)
      }
      return null
    },
    async getAvatarUrl (user: Profile): Promise<string | null> {
      const supabase = useSupabaseClient()
      if (!user.avatar_filename) {
        if (user.avatarurl) {
          return user.avatarurl
        }
        return null
      }
      try {
        const { data, error } = await supabase.storage.from('avatars').download(user.avatar_filename)
        if (error) { throw error }
        return URL.createObjectURL(data)
      } catch (error) {
        console.error('Error downloading image: ', error.message)
        return null
      }
    },
    async saveProfile (user: Profile) {
      const supabase = useSupabaseClient()
      user.updated_at = new Date()
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

        if (supabaseUser.value?.id) {
          const user = profileRepo.find(supabaseUser.value.id)
          if (user) {
            user.avatar_filename = filePath
            user.avatarurl = URL.createObjectURL(file)
            await this.saveProfile(user)
          }
        }
      } catch (error) {
        alert(error.message)
      }
    },
    createNewUser (profile: Profile) {
      if (!profile) { return }
      profileRepo.save(profile)
    },
    async initilizeProfiles () {
      const supabase = useSupabaseClient()
      const users: Profile[] = []
      let { data } = await supabase
        .from('profiles')
        .select('id, title, website, avatar_filename, avatarurl, firstname, lastname, created_at, updated_at')

      if (data) {
        data.forEach(async (item, index) => {
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
