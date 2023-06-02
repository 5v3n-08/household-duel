<template>
  <v-app id="app">
    <v-container id="login-page" fluid fill-height>
      <v-layout align-center justify-center>
        <v-sheet :style="{ 'max-width': '350px' }">
          <base-material-card>
            <template #heading>
              <div class="display-3 text-center">
                test
              </div>
            </template>
            <v-card-text>
              <slot />
            </v-card-text>
          </base-material-card>
        </v-sheet>
      </v-layout>
    </v-container>
  </v-app>
</template>
