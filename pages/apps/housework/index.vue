<template>
  <v-row>
    <v-col cols="12">
      <base-card card-title="Hello World">
        <form class="p-card">
          <v-row>
            <v-col cols="12">
              Test
            </v-col>
          </v-row>
        </form>
      </base-card>
    </v-col>
  </v-row>
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
