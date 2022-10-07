import { useAuthUser } from './useAuthUser'

export const useAdmin = () => {
  const authUser = useAuthUser()

  return computed(() => {
    if (!authUser.value) { return false }

    return true
    // return authUser.value.roles.includes('ADMIN')
  })
}
