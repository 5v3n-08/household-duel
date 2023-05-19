<template>
  <v-container>
    <base-card class="d-flex justify-space-between align-center">
      <div class="text-subtitle-2 text-secondary">
        &copy;
        {{ new Date().getFullYear() }}
        | <a
          href="https://michaelbigalke.de"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary ms-1"
        >Michael Bigalke</a>
      </div>
      <a
        href="https://github.com/GhostLabs94"
        target="noopener noreferrer"
      >GitHub</a>
    </base-card>
  </v-container>
</template>
