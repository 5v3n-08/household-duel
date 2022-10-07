import { isUserWhitespacable } from '@babel/types'
import { API } from '~~/helpers/api'
import type { User } from '~~/types'

// Fake users data
const users: User[] = await getUsers()

export async function getUsers () {
  const { pending, data, error, refresh } = await useBackend<User[]>(`${API.users}`,
    EHttpMethods.POST
  )
  return data.value
}

export async function getUserByEmail (email: string) {
  return users.find(user => user.email === email)
}

export async function getUserById (id: string) {
  return users.find(user => user.id === id)
}

export async function isAdmin (user: any) {
  return user && user.roles.includes('ADMIN')
}
