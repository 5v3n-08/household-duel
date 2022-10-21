
import { useAuthentication } from '~~/stores/authentication'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authentication = useAuthentication()
  await authentication.checkSession()
  // Try to get session again from accessToken with cookie "accessToken"
  console.log('middleware: auth user authenticated => ' + authentication.isAuthenticated)
  if (authentication.isAuthenticated === false) {
    return navigateTo('/login')
  }
})
