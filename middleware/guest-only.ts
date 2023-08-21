export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient()
  const { data, error } = await supabase.auth.getSession()
  console.log(data.session)
  if (data.session) {
    console.log('redirect to /dashboard')
    return abortNavigation('test')
    return navigateTo('/dashboard')
  }
})
