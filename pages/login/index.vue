<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center">
    <v-card class="w-full">
      <v-card-title class="flex justify-center text-2xl font-bold"> Anmeldung </v-card-title>
      <v-card-subtitle class="flex justify-center">Bitte melde dich zuerst an!</v-card-subtitle>
      <v-card-text>
        <div class="max-w-md justify-center flex-row align-middle">
          <ui-input label="E-Mail:" v-model="email" />
          <ui-input label="Passwort:" v-model="password" />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
export default defineComponent({ layout: "blank" });
</script>

<script setup lang="ts">
const email = useState("email", () => "");
const password = useState("email", () => "");
</script>
