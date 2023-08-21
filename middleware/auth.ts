import { useUserStore } from '~/stores/users'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient()
  const { data, error } = await supabase.auth.getSession()
  return abortNavigation('test 2')
  if (!data.session) {
    console.log('redirect to /login')
    return navigateTo('/login')
  }

  const store = useUserStore()
  if (!store.users.length) {
    store.initilizeProfiles()
  }
})
