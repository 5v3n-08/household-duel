// Instance Model
import { Model } from 'pinia-orm'
import { Attr, BelongsTo, Bool, Str, Uid, Num } from 'pinia-orm/dist/decorators'
import User from './User'
import Adapter from './Adapter'

export default class Post extends Model {
  static entity = 'instances'
  @Uid() declare id: string
  @Attr(null) declare userId: string | null
  @Str('') declare name: string
  @Str('') declare description: string
  @Num(1) declare number: number
  @Uid() declare adapterId: string
  @BelongsTo(() => Adapter, 'adapter') declare adapter: Adapter | null
}
