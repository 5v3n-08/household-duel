import { IInstance } from './instances'

interface IAdapterProperties {
  license?: string;
  url?: string;
}
export interface IAdapter {
  id: string;
  name: string;
  description: string;
  versionInstalled: string;
  versionAvailable: string;
  properties: IAdapterProperties;
  instances: IInstance[];
  instanceIds: string[]
  createdAt: string;
  updatedAt: string;
}
