<template>
  <ui-card :title="$t('welcome')" :subtitle="username" :icon-src="trophy">
    <h5 class="text-2xl font-weight-medium text-primary">
      This is your awesome new home
    </h5>
    <p>🚀</p>
    <VBtn size="small">
      Start Tour
    </VBtn>
  </ui-card>
</template>

<script lang="ts" setup>
import trophy from '@/assets/images/misc/trophy.png'

const user = useSupabaseUser()
const username = user.value?.id ?? 'Unknown User'
</script>
