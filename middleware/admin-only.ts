export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const supabase = useSupabaseClient()
  const session = await supabase.auth.getSession()
  const user = session.data.session?.user

  return abortNavigation('test 3')
  if (!user?.role?.includes('ADMIN')) {
    console.log('redirect to /login')
    return navigateTo('/login')
  }
})
