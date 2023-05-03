import { IAdapter } from './adapter'
import { IUser } from '~~/types'

interface IAdapterProperties {
  events?: number;
}
export interface IInstance {
  id: string;
  name: string;
  description: string;
  number: number;
  properties: IAdapterProperties;
  adapter: IAdapter[];
  adapterIds: string[]
  users: IUser[];
  userIds: string[];
  createdAt: string;
  updatedAt: string;

}
