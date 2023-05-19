import { useUserStore } from '~/stores/users'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseAuthClient()
  const { data, error } = await supabase.auth.getSession()
  if (!data.session) {
    return navigateTo('/login')
  }

  const store = useUserStore()
  if (!store.users.length) {
    store.initilizeProfiles()
  }
})
