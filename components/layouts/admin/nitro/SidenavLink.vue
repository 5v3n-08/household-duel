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
  <li
    v-if="type === 'dropDown'"
    :class="link && $route.fullPath.substring(1).split('/')[0] == link.toString().substring(1).split('/')[0] ? 'active' : ''"
    class="dropdown-link"
    @click="dropdownToggle"
  >
    <div class="sub-menu d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <SidenavIconSvg :icon="icon" class="mr-2" />
        <span class="text-13 font-weight-medium">{{ name }}</span>
      </div>
      <SidenavIconSvg icon="chevron_down" class="h3 dropdown-link-arrow" />
      <i class="fas- tio- dropdown-link-arrow"> chevron_down </i>
    </div>
    <ul class="dropdown-link-list">
      <li
        v-for="(itemTwo, indexTwo) in sub"
        :key="indexTwo"
        class="mb-2"
      >
        <NuxtLink
          exact
          :to="itemTwo.link"
          :class="itemTwo.link == route.path ? 'active' : ''"
          class="text-decoration-none text-13 d-flex align-center"
        >
          <div class="dot" />
          {{ itemTwo.name }}
        </NuxtLink>
      </li>
    </ul>
  </li>
  <li
    v-else-if="!type"
    :class="link && $route.fullPath.substring(1).split('/')[0] == link.toString().substring(1).split('/')[0] ? 'active' : ''"
    class="single-link"
    @click="dropdownToggle"
  >
    <NuxtLink
      exact
      :to="link"
      class="text-decoration-none d-flex align-center"
    >
      <SidenavIconSvg :icon="icon" class="mr-2" />
      <span class="font-weight-mediumv text-13">{{ name }}</span>
    </NuxtLink>
  </li>
</template>
