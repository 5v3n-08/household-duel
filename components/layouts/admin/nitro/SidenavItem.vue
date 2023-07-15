<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

export type TSubLink = { id?: string | number; name: string; icon?: string; link: string | RouteLocationRaw };
interface IProps {
  id?: string | number;
  index: number;
  link?: string | RouteLocationRaw;
  icon?: string;
  name?: string;
  disabled?: boolean;
  type?: string;
  badgeContent?: string;
  badgeClass?: string;
  description?: string;
  sub?: TSubLink[];
  active?: Boolean;
}

const props = defineProps<IProps>()

const emit = defineEmits(['ondropdownclicked'])
const dropdownToggle = (element: any) => {
  emit('ondropdownclicked', element)
}
const route = useRoute()
const currentRoute = computed(() => route.path)
// const currentRouteFirstPath = currentRoute.value.substring(1).split('/')[0]
</script>
<template>
  <v-list-group v-if="type === 'dropDown'" :value="name">
    <template #activator="{ props }">
      <v-list-item
        v-bind="props"
        :prepend-icon="icon"
        :title="name"
        :value="name"
        exact
      />
    </template>
    <v-list-item
      v-for="(itemTwo, indexTwo) in sub"
      :key="indexTwo"
      :title="itemTwo.name"
      :prepend-icon="itemTwo.icon"
      :value="itemTwo.name"
      :to="itemTwo.link"
      exact
    />
  </v-list-group>
  <v-list-item
    v-else-if="!type"
    :title="name"
    :prepend-icon="icon"
    :value="name"
    :to="link"
    exact
  />
</template>
