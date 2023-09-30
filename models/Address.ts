// User Model
import { Model } from 'pinia-orm'
import { Str, Uid, HasMany, Bool } from 'pinia-orm/dist/decorators'
export default class Address extends Model {
  static entity = 'address'

  @Uid() declare id: string
  @Str('') declare country: string
  @Str('') declare postcode: string
  @Str('') declare division: string
  @Str('') declare city: string
  @Str('') declare street: string
  @Str('') declare created_at: string | null
  @Str('') declare updated_at: string | null
}
