<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center">
    <ui-card class="p-4 text-center">
      <div class="text-2xl font-bold">Anmeldung</div>
      <p>Bitte melde dich zuerst an um auf deine privaten Daten zuzugreifen</p>
      <ui-input v-model="email"></ui-input>
      {{ email }}
    </ui-card>
  </div>
</template>

<script lang="ts">
export default defineComponent({ layout: "blank" });
</script>

<script setup lang="ts">
const email = useState("email", () => "Test");
</script>
