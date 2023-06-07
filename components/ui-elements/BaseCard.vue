
<template>
  <v-card class="card">
    <div v-show="props.cardTitle" class="card-header">
      <i class="tio- text-18">{{ props.icon }}</i>
      <v-card-title class="pa-0 me-4 text-subtitle-2 f-600">
        {{ props.cardTitle }}
      </v-card-title>
    </div>

    <slot />
  </v-card>
</template>

<script setup>
const props = defineProps({
  noPadding: Boolean,
  cardTitle: String,
  icon: String
})
</script>

<style scoped lang="scss">
.card {
  box-shadow: 0px 12px 50px 2px rgba(19, 80, 124, 0.14);
  border-radius: 8px;
  padding: 1.25rem;
  // height: 100%;
  overflow: visible;
}
.px-card {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.card-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbe9f2;
  padding: 1.25rem;
  .card-title {
    color: #131e3e;
    font-size: 14px;
    font-weight: 600;
  }
}
.p-card {
  padding: 1.25rem;
}
.h-100 {
  height: 100%;
}
</style>
