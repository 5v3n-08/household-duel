export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const supabase = useSupabaseAuthClient()
  const session = await supabase.auth.getSession()
  const user = session.data.session?.user

  if (!user?.role?.includes('ADMIN')) { navigateTo('/login') }
})
