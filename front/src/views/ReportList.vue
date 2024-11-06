<script setup lang="ts">
import type { Report } from "../api";

const props = defineProps<{
  reports: Report[];
  selectedId: string | undefined;
}>();
</script>

<template>
  <div
    class="flex-col flex-grow h-full border-b-gray-200 border-b-solid border-b-2 max-w-96 bg-slate-200 p-4 overflow-y-scroll"
  >
    <div
      v-for="report in props.reports"
      @click.prevent="$emit('view', report._id)"
      class="border-b-gray-200 border-b-solid border-b-2 rounded-md p-2"
      :class="{ 'bg-slate-300': report._id === props.selectedId }"
    >
      type: {{ report.feedbacktype }} <br />
      title: {{ report.title }} <br />
      reporter: {{ report.name }} <br />
    </div>
  </div>
</template>
