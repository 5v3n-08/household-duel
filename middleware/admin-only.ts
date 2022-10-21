import { useAdmin } from '~~/composables/auth/useAdmin'
import { useAuthentication } from '~~/stores/authentication'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const isAdmin = useAdmin()
  const authentication = useAuthentication()
  authentication.checkSession()
  // const authentication = useAuthentication()

  // if (authentication.isAdmin === false) {
  //   return abortNavigation('Admin access only')
  //   // return navigateTo('/login')
  // }
  if (!isAdmin.value) { navigateTo('/login') }
  // return navigateTo('/login')
})
