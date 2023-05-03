<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) { throw error }
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container mx-auto my-10">
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-1">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">
          Willkommen zurück!
        </h1>
        <p class="text-gray-700 leading-7 mb-8">
          Bitte melden Sie sich an, um fortzufahren.
        </p>
        <v-card class="mx-auto max-w-md" elevation="10" color="white">
          <v-card-title class="text-center">
            Anmelden
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field class="mb-3" label="Benutzername" outlined />
              <v-text-field class="mb-3" label="Passwort" type="password" outlined />
              <v-checkbox label="Angemeldet bleiben" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mx-auto" color="primary" dark width="50%">
              Anmelden
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="col-span-1 flex justify-center items-center">
        <img class="w-64 h-64" src="https://picsum.photos/500/500" alt="Bild">
      </div>
    </div>
  </div>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">
        Supabase + Nuxt 3
      </h1>
      <p class="description">
        Sign in via magic link with your email below
      </p>
      <div>
        <input v-model="email" class="inputField" type="email" placeholder="Your email">
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        >
      </div>
    </div>
  </form>
</template>
