export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  status: boolean;
  rights: [];
  roles: [];
}

export type UserWithoutPassword = Omit<User, 'password'>

export interface ILoginReturnData {
  token?: string;
  User: User[];
}

export interface IAuthenticationLogoutData {
  authUserId?: string;
  User: User[];
}
