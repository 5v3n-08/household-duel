// User Model
import { Model } from 'pinia-orm'
import { Str, Uid, HasMany, Bool } from 'pinia-orm/dist/decorators'
export default class Household extends Model {
  static entity = 'household_members'

  @Uid() declare household_id: string
  @Uid() declare user_id: string
  @Bool(false) declare is_admin: boolean | null
}
