import { useAuthentication } from '~~/stores/authentication'

export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if an user is authenticated
  const authentication = useAuthentication()
  if (authentication.isAuthenticated === false) {
    return navigateTo('/login')
  }
})
