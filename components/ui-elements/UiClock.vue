<template>
  <div class="text-center">
    <div class="text-xs">
      {{ date.toLocaleDateString("de") }}
    </div>
    <div class="text-white">
      {{
        date.toLocaleTimeString("de", { hour: "2-digit", minute: "2-digit" })
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
const date = useState("date", () => new Date());
const interval = useState<NodeJS.Timer | null>("interval", () => null);

onMounted(() => {
  interval.value = setInterval(() => {
    date.value = new Date();
  });
});

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<style scoped></style>
