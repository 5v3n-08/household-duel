<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center">
    <v-card class="w-1/3 !p-2">
      <v-card-title class="flex justify-center text-2xl font-bold">Anmeldung</v-card-title>
      <v-card-subtitle class="flex justify-center">Bitte melde dich zuerst an!</v-card-subtitle>
      <v-card-text>
        <div class="w-full px-4 py-2">
          <ui-input v-model="email" class="mb-2" label="E-Mail:" type="email" />
          <ui-input v-model="password" class="mt-2" label="Passwort:" type="password" />
        </div>
        <div class="mt-5 flex justify-center">
          <v-btn color="primary" @click="onLoginClick">Anmelden</v-btn>
        </div>
        <div class="mt-1 flex justify-center">
          <button class="mt-2 small text-center font-bold hover:text-queen-blue-800">Noch keinen Account?</button>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { API } from "~~/helpers/api";

export default defineComponent({ layout: "blank" });
</script>

<script setup lang="ts">
const email = useState("email", () => "");
const password = useState("password", () => "");
// const config = useRuntimeConfig();

const onLoginClick = () => {
  // console.log(API.authentication.oauth);
  const { pending, data, error } = useFetch(API.authentication.oauth, {
    method: "POST",
    body: { driver: "username", username: email.value, password: password.value },
  });

  // console.log(data.value);
  // console.log(error.value);
};
</script>
