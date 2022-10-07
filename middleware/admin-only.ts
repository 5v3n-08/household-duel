import { useAdmin } from '~~/composables/auth/useAdmin'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const isAdmin = useAdmin()
  // const authentication = useAuthentication()

  // if (authentication.isAdmin === false) {
  //   return abortNavigation('Admin access only')
  //   // return navigateTo('/login')
  // }
  if (!isAdmin.value) { navigateTo('/login') }
  return navigateTo('/login')
})
