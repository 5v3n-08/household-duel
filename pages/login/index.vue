<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center">
    <v-card class="w-1/3 !p-2 opacity-100 ui-card" :class="isLoading ? 'animate-pulse' : ''">
      <v-card-title class="flex justify-center text-2xl font-bold">Anmeldung</v-card-title>
      <v-card-subtitle class="flex justify-center">Bitte melde dich zuerst an!</v-card-subtitle>
      <v-card-text>
        <div class="w-full px-4 py-2">
          <ui-input
            v-model="email"
            :disabled="isLoading"
            class="mb-2"
            label="E-Mail oder Benutzername:"
            type="email"
            :rules="[validateRequired]"
          />
          <ui-input
            v-model="password"
            class="mt-2"
            label="Passwort:"
            :disabled="isLoading"
            type="password"
            :rules="[validateRequired]"
          />
        </div>
        <v-alert border="start" color="error" class="ma-2"> {{ error2 }}</v-alert>
        <div class="mt-5 flex justify-center">
          <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular>
          <v-btn v-else color="primary" @click="onLoginClick()">Anmelden</v-btn>
        </div>
        <div class="mt-1 flex justify-center">
          <button :disabled="isLoading" class="mt-3 text-sm text-center font-bold hover:text-queen-blue-800">
            Noch keinen Account?
          </button>
        </div>
          <p v-if="pending">Fetching mountains...</p>
          <p v-else-if="error2">An error occurred :(</p>
          <div v-else>
            <h1>Nuxt Mountains</h1>
          </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="tsx">
  import _ from "lodash";
  import { API } from "~~/helpers/api";
  // import { validateRequired } from "~~/helpers/validation";
  export default {}
  definePageMeta({
    layout: "blank",
  });
const email = useState("email", () => "");
const password = useState("password", () => "");
const isLoading = ref(false);
const hasError = reactive({ msg: null })
const pending = ref(false);
const error2 = ref();
// const reqError = ref<string | null>(null);

const onLoginClick = async () => {
  isLoading.value = true;
  const { pending, data, error } = await useBackend(API.authentication.oauth, {
    driver: "username",
    username: email.value,
    password: password.value,
  });
  // console.log(pending);
  // console.log(error.value.data.message);
  if (error)  {
    // console.log(error);
    hasError.msg = _.get(error, 'value.data.message');
  }
  isLoading.value = false;
};

// const onLoginClick2 = async () => {
//   isLoading.value = true;
//   const { data } = await useBackend<IFetchError>(API.authentication.oauth, {
//     driver: "username",
//     username: email.value,
//     password: password.value,
//   })

//   isLoading.value = false;
// }

// interface IFetchError {
//   value: {
//     data: {
//       message: string;
//     }
//   },
//   data: {
//     message: string;
//   }
// }
</script>

<style scoped>
.ui-card {
  --v-medium-emphasis-opacity: 1;
}
</style>
