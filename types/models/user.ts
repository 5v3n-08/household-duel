import { Database } from '../database.types'

export interface IUserProperties {
  sidenav: {
    collapsed: boolean;
    sort: []
  }
}

export type IUser = Database['public']['Tables']['profiles']['Row']
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

export type UserWithoutPassword = Omit<IUser, 'password'>

const supabase = useSupabaseClient()
export async function getUsers () {
  return await supabase.from('profiles').select('id, username, email, full_name, avatar_url, website, updated_at')
}
