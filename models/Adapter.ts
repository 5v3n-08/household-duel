// Instance Model
import { Model } from 'pinia-orm'
import { Attr, BelongsTo, Bool, Str, Uid, Num, HasMany } from 'pinia-orm/dist/decorators'
import Instance from './Instance'

interface IAdapterProperties {
  license?: string;
  url?: string;
}

export default class Post extends Model {
  static entity = 'adapters'
  @Uid() declare id: string
  @Str('') declare name: string
  @Str('') declare description: string
  @Str('1.0.0') declare versionInstalled: string
  @Str('1.0.0') declare versionIAvailable: string
  @Attr(null) declare properties: IAdapterProperties
  @HasMany(() => Instance, 'instanceIds') declare instanceIds: []
  @HasMany(() => Instance, 'instances') declare instances: Instance[] | null
}
