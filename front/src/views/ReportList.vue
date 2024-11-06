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
    class="flex-col h-full basis-1/2 bg-slate-50 overflow-y-auto border-r max-w-96"
  >
    <ul class="p-4">
      <li
        v-for="report in props.reports"
        @click.prevent="$emit('view', report._id)"
        class="flex rounded-md p-4 cursor-pointer"
        :class="{ 'bg-slate-200': report._id === props.selectedId }"
      >
        <TypeIcon :type="report.feedbacktype" class="mr-2 mt-1" />

        <div class="w-full">
          <span class="text-xl"> {{ report.title }} </span><br />
          <div class="flex justify-between w-full mt-1 pr-2">
            <span class="text-xs text-gray-500 font-medium">
              {{ report.name }}
            </span>
            <span class="text-xs text-gray-500 font-medium">
              {{ formatDate(report.date) }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
