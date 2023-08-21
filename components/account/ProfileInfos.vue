<template>
  <base-card class="pa-0" :card-title="$t('profile.basicInfos')">
    <form class="p-card">
      <v-row>
        <v-col cols="12" md="6">
          <ui-input
            v-model="user.firstname"
            :label="$t('profile.firstname')"
            color="primary"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <ui-input
            v-model="user.lastname"
            :label="$t('profile.lastname')"
            color="primary"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="6">
          <ui-input
            v-model="user.title"
            :label="$t('profile.title')"
            color="primary"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12">
          <div class="d-flex">
            <v-btn flat class="text-capitalize me-4" color="primary" @click="updateProfile">
              {{ $t('buttons.save') }}
            </v-btn>
            <v-btn flat class="text-capitalize me-4 border-secondary" @click="refreshProfile">
              {{ $t('buttons.cancel') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </form>
  </base-card>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/users'
import { useForm } from 'vee-validate'

const userStore = useUserStore()
const { users: usersFromStore, getCurrentProfile: user } = storeToRefs(userStore)

const supabaseUser = useSupabaseUser()
const loading = ref(true)
const uploading = ref(false)
const dayjs = useDayjs()
const { handleSubmit } = useForm()
const { t } = useI18n()

// Timer to check how long last saved
const userUpdatedBefore = ref(0)
const updateProfileSavedSeconds = () => { userUpdatedBefore.value = dayjs().diff(dayjs(user.value?.updated_at), 'seconds') }
const updateBeforeSecondsInterval = setInterval(updateProfileSavedSeconds, 1000)
onBeforeUnmount(() => { clearInterval(updateBeforeSecondsInterval) })

async function refreshProfile () {
  loading.value = true
  if (supabaseUser.value?.id) {
    await userStore.refreshProfile(supabaseUser.value.id)
  }

  loading.value = false
}

async function updateProfile () {
  loading.value = true
  if (userUpdatedBefore.value < 10) {
    // cancel updating profile, if changed before lower then 10 seconds
    Toast.fire({
      icon: 'error',
      title: t('buttons.timeoutSeconds', { seconds: (10 - userUpdatedBefore.value) })
    })
    return
  }
  try {
    if (user.value) {
      await userStore.saveProfile(user.value)
      Toast.fire({
        icon: 'success',
        title: t('buttons.actionSuccess')
      })
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

const uploadAvatar = async (event: any) => {
  try {
    uploading.value = true

    userStore.uploadAvatar(event)
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}

</script>
