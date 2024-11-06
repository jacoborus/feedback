<script setup lang="ts">
import type { Report } from "../api";
import TypeIcon from "../components/TypeIcon.vue";
import { formatDate } from "../util/formatDates";

const props = defineProps<{
  reports: Report[];
  selectedId: string | undefined;
}>();

defineEmits<{
  (e: "view", id: string): void;
}>();
</script>

<template>
  <div
    class="flex-col flex-grow h-full w-80 border-b-gray-200 border-b-solid border-b-2 max-w-96 bg-slate-100 p-4 overflow-y-scroll"
  >
    <div
      v-for="report in props.reports"
      @click.prevent="$emit('view', report._id)"
      class="flex border-b-gray-200 border-b-solid border-b-2 rounded-md p-2 cursor-pointer"
      :class="{ 'bg-slate-300': report._id === props.selectedId }"
    >
      <TypeIcon :type="report.feedbacktype" class="mr-2" />
      <div>
        <span class="text-xl"> {{ report.title }} </span><br />
        <span class="text-sm text-gray-500"> {{ report.name }} </span><br />
        {{ formatDate(report.date) }}
      </div>
    </div>
  </div>
</template>
