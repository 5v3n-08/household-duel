<template>
  <ui-account>
    <base-card class="pa-0" :card-title="$t('profile.household.title')">
      <form class="p-card">
        <v-row>
          <v-col cols="12">
            Test
          </v-col>
        </v-row>
      </form>
    </base-card>
  </ui-account>
</template>

<script lang="tsx" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/users'
definePageMeta({
  middleware: 'auth'
})
const userStore = useUserStore()
const { getCurrentProfile: user } = storeToRefs(userStore)

const supabaseUser = useSupabaseUser()

</script>
