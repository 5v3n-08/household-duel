import { PostgrestSingleResponse } from '@supabase/postgrest-js'
import { Database } from '../database'

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

const supabase = useSupabaseClient()
export async function getProfiles (): Promise<PostgrestSingleResponse<TUser[]>> {
  return await supabase.from('profiles').select('id, title, firstname, lastname, avatarurl, avatar_filename, website, updated_at')
}

type ProfilesResponse = Awaited<ReturnType<typeof getProfiles>>
export type ProfilesResponseSuccess = ProfilesResponse['data']
export type ProfilesResponseError = ProfilesResponse['error']
