// User Model
import { Model } from 'pinia-orm'
import { Str, Uid } from 'pinia-orm/dist/decorators'
export default class Profile extends Model {
  static entity = 'profiles'
  static primaryKey = 'id'

  static types () {
    return {
      PROFIL: Profile,
      ADULT: Adult,
      CHILD: Child
    }
  }

  // @Uid() declare id: string
  @Uid() declare id: string
  @Str('') declare title: string | null
  @Str('') declare firstname: string | null
  @Str('') declare lastname: string | null
  @Str('') declare avatar_filename: string | null
  @Str('') declare avatarurl: string | null
  @Str('') declare created_at: string | null
  @Str('') declare updated_at: string | null
  @Str('') declare website: string | null

  get full_name () {
    return `${this.firstname ?? ''} ${this.lastname ?? ''}`
  }
}

class Adult extends Profile {
  static entity = 'adult'
  static baseEntity = 'profiles'
  // Call `super.fields()`` to merge fields.
  static fields () {
    return {
      ...super.fields(),
      type: this.attr('PROFIL'),
      home_id: this.attr('')
    }
  }
}

class Child extends Profile {
  static entity = 'child'
  static baseEntity = 'profiles'
  // Call `super.fields()`` to merge fields.
  static fields () {
    return {
      ...super.fields(),
      type: this.attr('PROFIL'),
      home_id: this.attr(''),
      parent_id: this.attr('')
    }
  }
}
