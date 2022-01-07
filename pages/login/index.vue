<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center">
    <v-card class="w-full">
      <v-card-title class="flex justify-center text-2xl font-bold"> Anmeldung </v-card-title>
      <v-card-subtitle class="flex justify-center">Bitte melde dich zuerst an!</v-card-subtitle>
      <v-card-text class="flex justify-center w-xl bg-slate-700">
        <div class="min-w-f !w-xl bg-slate-500">
          asdsad
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
const password = useState("password", () => "");
</script>
