<script lang="ts" setup>

const props = defineProps({
  item: {
    type: null,
    required: true
  }
})
</script>

<template>
  <li
    class="nav-link"
    :class="{ disabled: item.disable }"
  >
    <NuxtLink :to="item.to">
      <VIcon
        v-bind="item.icon"
        class="nav-item-icon"
      />
      <!-- 👉 Title -->
      <span
        key="title"
        class="nav-item-title"
      >
        {{ item.title }}
      </span>

      <!-- 👉 Badge -->
      <span
        v-if="item.badgeContent"
        key="badge"
        class="nav-item-badge"
        :class="item.badgeClass"
      >
        {{ item.badgeContent }}
      </span>
    </NuxtLink>
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-link a {
    display: flex;
    align-items: center;
  }
}
</style>
