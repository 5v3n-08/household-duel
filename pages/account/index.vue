<template>
  <ui-account>
    <v-row v-if="user">
      <v-col cols="12">
        <base-card class="pa-0">
          <div class="position-relative bg-header-cover d-flex justify-end">
            <img
              class="w-full position-absolute bg-cover-photo"
              src="@/assets/images/3d-2.png"
              alt=""
            >
            <!-- <v-btn
                flat
                class="text-capitalize text-secondary-lighten-1 me-4"
                color="white"
              >
                <i class="tio- me-2">camera_enhance</i> Update Cover
              </v-btn> -->
          </div>
          <div class="text-center">
            <label class="avatar-status-100 basic-information text-center" for="imageUpload">
              <img
                v-if="user?.avatarurl"
                class="avatar-image" :src="user.avatarurl" alt=""
              >
              <span class="avatar-badge bg-primary d-flex align-center justify-center">
                <i class="text-white tio-">photo_camera</i>
              </span>
              <input
                id="imageUpload" class="d-none"
                type="file" accept=".png, .jpg, .jpeg"
                :disabled="uploading" @change="uploadAvatar"
              >
            </label>
          </div>

          <div class="text-h6 text-center mb-4">
            {{ user.full_name ?? ' ' }}
          </div>
          <div v-if="uploading" class="text-h6 text-center mb-4">
            {{ 'Uploading Avatar' }}
          </div>
          <div class="d-flex justify-center flex-wrap mb-5">
            <div
              class="d-flex justify-center text-center text-secondary-lighten-1"
            >
              <div class="d-flex align-center">
                <i class="text-20 me-2 tio-">bratislava</i>
                <div class="text-body-2 f-600">
                  {{ user.title }}
                </div>
              </div>
            </div>
            <div
              class="d-flex justify-center text-center mx-5 text-secondary-lighten-1"
            >
              <i class="text-20 me-2 tio-">date_range</i>
              <div class="text-body-2 f-600">
                {{ $t('profile.joined') }} {{ dayjs(user.created_at).format('DD.MM.YYYY') ?? ' ' }}
              </div>
            </div>
            <!-- <div
                class="d-flex justify-center text-center text-secondary-lighten-1"
              >
                <i class="text-20 me-2 tio-">poi_</i>
                <div class="text-body-2 f-600">
                  New York
                </div>
              </div> -->
          </div>
          <!-- <div class="d-flex justify-space-between pa-4 flex-wrap">
              <div>
                <h5>Profile Completion</h5>
                <div class="d-flex align-center">
                  <span class="text-caption">50%</span>
                  <v-progress-linear
                    model-value="50"
                    color="success"
                    class="me-2"
                  />
                </div>
              </div>
              <div class="d-flex flex-wrap">
                <v-btn
                  flat
                  class="text-capitalize bg-primary-lighten-5 text-capitalize me-3"
                >
                  Follow
                </v-btn>
                <v-btn flat class="text-capitalize me-3" color="primary">
                  Hire Me
                </v-btn>
                <v-btn flat class="bg-primary-lighten-5">
                  <i class="tio-">more_horizontal</i>
                </v-btn>
              </div>
            </div> -->
        </base-card>
      </v-col>
      <v-col cols="12">
        <base-card>
          <v-card-title
            class="pa-0 mb-4 border-bottom text-body-2 font-weight-medium"
          >
            {{ $t('profile.basicInfos') }}
          </v-card-title>
          <form @submit="onSubmit">
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
      </v-col>
    </v-row>
    {{ user }}
  </ui-account>
</template>

<script lang="tsx" setup>
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { useUserStore } from '~/stores/users'
definePageMeta({
  middleware: 'auth'
})
const userStore = useUserStore()
const { users: usersFromStore, getCurrentProfile: user } = storeToRefs(userStore)

const supabaseUser = useSupabaseUser()
const loading = ref(true)
const uploading = ref(false)
const dayjs = useDayjs()
const { handleSubmit } = useForm()

async function refreshProfile () {
  loading.value = true
  if (supabaseUser.value?.id) {
    await userStore.refreshProfile(supabaseUser.value.id)
  }

  loading.value = false
}
const onSubmit = handleSubmit((values) => {
  // Submit to API
  console.log(values) // { email: 'email@gmail.com' }
})
async function updateProfile () {
  try {
    loading.value = true
    if (user.value) {
      await userStore.saveProfile(user.value)
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
