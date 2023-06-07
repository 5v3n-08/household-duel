<template>
  <ui-account>
    <base-card class="pa-0" :card-title="$t('profile.delete.title')">
      <div class="p-card">
        <div class="text-caption text-secondary">
          {{ $t('profile.delete.subTitle') }}
        </div>
      </div>
      <v-divider class="line-color" />
      <div class="p-card">
        <v-checkbox
          color="primary"
          :label="$t('profile.delete.confirm')"
          hide-details
          class="mb-8"
        />
        <div class="d-flex">
          <v-btn color="error" class="me-3 text-capitalize" flat>
            {{ $t('buttons.delete') }}
          </v-btn>
          <v-btn class="text-capitalize border-secondary" flat>
            {{ $t('buttons.cancel') }}
          </v-btn>
        </div>
      </div>
    </base-card>
  </ui-account>
</template>

<script lang="tsx" setup>
const { t } = useI18n()
const supabase = useSupabaseClient()

definePageMeta({
  middleware: 'auth'
})
</script>
