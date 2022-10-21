import { useAuthentication } from '~~/stores/authentication'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authentication = useAuthentication()
  await authentication.checkSession()
  console.log('middleware: guest-only => user authenticated: ' + authentication.isAuthenticated)
  if (authentication.isAuthenticated === true) {
    return navigateTo('/')
  }
})
