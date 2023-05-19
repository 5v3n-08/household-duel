<template>
  <v-container>
    <ui-account>
      <base-card class="pa-0" :card-title="$t('profile.password.title')">
        <form class="p-card" @submit="onSubmit">
          <v-row>
            <v-col cols="12" lg="6">
              <ui-input
                v-model="currentPassword"
                :label="$t('profile.password.current')"
                color="primary"
                variant="outlined"
              />
              <ui-input
                v-model="newPassword"
                :label="$t('profile.password.new')"
                color="primary"
                variant="outlined"
                hide-details
              />
              <ui-input
                v-model="confirmPassword"
                :label="$t('profile.password.confirm')"
                color="primary"
                variant="outlined"
                hide-details
              />
            </v-col>
            <v-col cols="12" lg="6">
              <div class="text-caprion f-600">
                {{ $t('profile.password.required.title') }}
              </div>
              <div class="text-secondary text-caption font-weight-regular mb-4">
                {{ $t('profile.password.required.subTitle') }}
              </div>
              <div class="d-flex align-center mb-3">
                <div class="pa-1 rounded-circle me-2" :class="newPassword ? newPassword.length > 8 ? 'bg-success' : 'bg-error' : 'bg-primary'" />
                <div class="text-caption font-weight-medium">
                  {{ $t('profile.password.required.minLength') }}
                </div>
              </div>
              <div class="d-flex align-center mb-3">
                <div class="pa-1 rounded-circle me-2" :class="newPassword ? regexMinOneLowercase.test(newPassword) ? 'bg-success' : 'bg-error' : 'bg-primary'" />
                <div class="text-caption font-weight-medium">
                  {{ $t('profile.password.required.minLowercase') }}
                </div>
              </div>
              <div class="d-flex align-center mb-3">
                <div class="pa-1 rounded-circle me-2" :class="newPassword ? regexMinOneUppercase.test(newPassword) ? 'bg-success' : 'bg-error' : 'bg-primary'" />
                <div class="text-caption font-weight-medium">
                  {{ $t('profile.password.required.minUppercase') }}
                </div>
              </div>
              <div class="d-flex align-center mb-3">
                <div class="pa-1 rounded-circle me-2" :class="newPassword ? regexMinOneNumber.test(newPassword) ? 'bg-success' : 'bg-error' : 'bg-primary'" />
                <div class="text-caption font-weight-medium">
                  {{ $t('profile.password.required.minNumber') }}
                </div>
              </div>
              <div class="d-flex align-center mb-3">
                <div class="pa-1 rounded-circle me-2" :class="newPassword ? regexSpecialCharacters.test(newPassword) ? 'bg-success' : 'bg-error' : 'bg-primary'" />
                <div class="text-caption font-weight-medium">
                  {{ $t('profile.password.required.minSpecialChar') }}
                </div>
              </div>
              <div class="d-flex align-center mb-3">
                <div class="pa-1 rounded-circle me-2" :class="confirmPassword ? errors.confirmPassword ? 'bg-error' : 'bg-success' : 'bg-primary'" />
                <div class="text-caption font-weight-medium">
                  {{ $t('profile.password.required.confirmMatch') }}
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="d-flex flex-wrap">
                <v-btn flat class="text-capitalize me-4 mb-3" color="primary" type="submit">
                  Save Changes
                </v-btn>
                <v-btn flat class="border-secondary text-capitalize me-2 mb-3" @click="clearForm">
                  Cancel
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </form>
      </base-card>
    </ui-account>
  </v-container>
</template>

<script lang="tsx" setup>
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { regexMinOneUppercase, regexSpecialCharacters, regexMinOneLowercase, regexMinOneNumber } from '~/helpers/validation'
const { t } = useI18n()
const supabase = useSupabaseClient()

definePageMeta({
  middleware: 'auth'
})

const validationSchema = toTypedSchema(
  zod.object({
    currentPassword: zod.string().nonempty(),
    newPassword: zod.string().min(8, 'MIN')
      .regex(regexMinOneUppercase, 'UPPERCASE_NEEDED')
      .regex(regexMinOneLowercase, 'LOWERCASE_NEEDED')
      .regex(regexMinOneNumber, 'NUMBER_NEEDED')
      .regex(regexSpecialCharacters, 'SPECIAL_CHAR_NEEDED'),
    confirmPassword: zod.string()
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })
)
const { handleSubmit, errors } = useForm({
  validationSchema
})
const { value: currentPassword } = useField<string>('currentPassword')
const { value: newPassword } = useField<string>('newPassword')
const { value: confirmPassword } = useField<string>('confirmPassword')

const clearForm = () => {
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}
const onSubmit = handleSubmit(async (values) => {
  const { data: currentPasswordCheck, error: currentPasswordError } = await supabase.rpc('verify_user_password', { password: values.currentPassword })

  if (currentPasswordCheck) {
    const { data: passwordChangedSuccess, error: passwordChangeFailed } = await supabase.auth.updateUser({ password: values.newPassword })
    if (passwordChangedSuccess) {
      Toast.fire({
        icon: 'success',
        title: t('profile.password.changed.success')
      })
    }
    if (passwordChangeFailed) {
      Toast.fire({
        icon: 'error',
        title: t('profile.password.changed.failed')
      })
    }
  }
  if (currentPasswordError) {
    Toast.fire({
      icon: 'error',
      title: t('profile.password.changed.wrongPassword')
    })
  }
})
</script>
<style lang="scss" scoped>
.bg-header-cover {
  padding-top: 80px;
}
.bg-cover-photo {
  height: 143px;
  padding: 0px;
  top: 0;
  object-fit: cover;
}
.avatar-status-100 {
  position: relative;
  display: inline-block;
  .avatar-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 100%;
  }
  .avatar-badge {
    width: 25px;
    height: 25px;
    border: 2px solid white;
    position: absolute;
    bottom: 2%;
    right: 2%;
    border-radius: 100%;
  }
}
.basic-information {
  margin-top: -40px;
}
</style>
