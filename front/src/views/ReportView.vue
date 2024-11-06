<script setup lang="ts">
import type { Report } from "../api";
const props = defineProps<{
  report: Report | undefined;
}>();
</script>

<template>
  <div>
    <h1 v-if="report">
      <pre>
      {{ report }}
      </pre>
    </h1>
    <h1 v-else>No report selected</h1>
  </div>
</template>
