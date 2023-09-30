// User Model
import { Model } from 'pinia-orm'
import { Str, Uid, HasMany, HasOne } from 'pinia-orm/dist/decorators'
import HouseholdMember from './HouseholdMember'
import Address from './Address'
export default class Household extends Model {
  static entity = 'households'
  static primaryKey = 'id'

  // @Uid() declare id: string
  @Uid() declare id: string
  @Str('') declare name: string | null
  @Str('') declare owner_id: string | null
  @Str('') declare address_id: string | null
  @HasMany(() => HouseholdMember, 'memberIds') declare memberIds: []
  @HasMany(() => HouseholdMember, 'members') declare members: HouseholdMember[] | null
  @HasOne(() => Address, 'address_id') declare address: Address | null
}
