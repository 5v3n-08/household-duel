import { PostgrestSingleResponse } from '@supabase/postgrest-js'
import { Database } from '../database'
import Profile from '~/models/Profile'
import Household from '~/models/Household'

export interface IUserProperties {
  sidenav: {
    collapsed: boolean;
    sort: []
  }
}

export type TUser = Database['public']['Tables']['profiles']['Row'] & {
  full_name: string | null
}

// export type CUser =
// export interface IUser {
//   id: string;
//   email: string;
//   username: string;
//   password: string;
//   status: boolean;
//   rights: [];
//   roles: [];
//   last_online_at: Date;
//   properties: IUserProperties;

// }

export type UserWithoutPassword = Omit<TUser, 'password'>

export async function getProfiles (): Promise<PostgrestSingleResponse<Profile[]>> {
  const supabase = useSupabaseClient()
  return await supabase.from('profiles').select()
}

export type ProfilesResponse = Awaited<ReturnType<typeof getProfiles>>
// export type ProfilesResponseSuccess = ProfilesResponse['data']
// export type ProfilesResponseError = ProfilesResponse['error']

export async function getProfile (userId: string): Promise<PostgrestSingleResponse<Profile>> {
  const supabase = useSupabaseClient()
  return await supabase.from('profiles').select().eq('id', userId).single()
}

export type ProfileResponse = Awaited<ReturnType<typeof getProfile>>
// export type ProfileResponseSuccess = ProfileResponse['data']
// export type ProfileResponseError = ProfileResponse['error']

export async function refreshHouseholds (): Promise<PostgrestSingleResponse<Household[]>> {
  const supabase = useSupabaseClient<Database>()
  return await supabase.from('household').select()
}
export type HouseholdsResponse = Awaited<ReturnType<typeof refreshHouseholds>>
