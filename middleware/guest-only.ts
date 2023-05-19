export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseAuthClient()
  const { data, error } = await supabase.auth.getSession()
  if (data.session) {
    return navigateTo('/dashboard')
  }
})
