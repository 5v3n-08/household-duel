
export interface IUserProperties {
  sidenav: {
    collapsed: boolean;
    sort: []
  }
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  status: boolean;
  rights: [];
  roles: [];
  last_online_at: Date;
  properties: IUserProperties;

}

export type UserWithoutPassword = Omit<IUser, 'password'>
