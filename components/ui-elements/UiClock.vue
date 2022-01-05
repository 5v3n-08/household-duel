<template>
  <div class="text-center">
    <div class="text-xs">
      {{
        date.toLocaleDateString("de", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      }}
    </div>
    <div class="text-white">
      {{
        date.toLocaleTimeString("de", { hour: "2-digit", minute: "2-digit" })
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
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
