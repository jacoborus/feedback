<script setup lang="ts">
import type { Report } from "../api";

const props = defineProps<{
  reports: Report[];
}>();
</script>

<template>
  <div
    class="flex-col flex-grow h-full border-b-gray-200 border-b-solid border-b-2 max-w-96 bg-green-400"
  >
    <div
      v-for="report in props.reports"
      @click.prevent="$emit('view', report._id)"
      class="border-b-gray-200 border-b-solid border-b-2"
    >
      type: {{ report.feedbacktype }} <br />
      title: {{ report.title }} <br />
      reporter: {{ report.name }} <br />
    </div>
  </div>
</template>
