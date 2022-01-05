<template>
  <ui-card>
    <div class="text-sm w-full text-center bg-cyan-700 p-1 rounded-t-lg">
      Übersicht
    </div>
    <div class="grid gap-4 grid-cols-2 p-5">
      <div
        v-for="point in points"
        :key="point.name"
        class="border border-cyan-600 rounded p-5 text-center bg-cyan-700"
      >
        <div class="font-bold text-lg">{{ point.name }}</div>
        <div class="text-sm">{{ point.points }} Punkte</div>
      </div>
    </div>

    <housework-log-list-item
      v-for="log in logs"
      :key="log.id"
      :log-id="log.id"
      class="m-1"
    />
  </ui-card>
</template>

<script setup lang="ts">
import _ from "lodash";
import { useGlobal } from "~~/stores/housework/global";

const globalState = useGlobal();

const logs = computed(() =>
  _.orderBy(globalState.logs, (log) => log.createdAt, "desc")
);
const points = computed(() => globalState.points);
</script>
