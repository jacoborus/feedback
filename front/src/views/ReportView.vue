<script setup lang="ts">
import type { Report } from "../api";
import TypeIcon from "../components/TypeIcon.vue";
import { formatDate } from "../util/formatDates";

defineProps<{
  report: Report | undefined;
}>();

defineEmits<{
  (e: "remove", id: string): void;
}>();
</script>

<template>
  <div class="flex w-full h-full justify-center pt-10">
    <div
      v-if="report"
      class="p-8 w-full sm:w-full md:w-full lg:w-2/3 2xl:w-1/2"
    >
      <span class="block pl-10 text-sm text-gray-500">
        {{ formatDate(report.date) }}
      </span>

      <span class="flex mb-2">
        <TypeIcon :type="report.feedbacktype" big class="mr-2" />
        <h1 class="text-2xl text-black pl-1">{{ report.title }}</h1>
      </span>

      <span class="block text-sm text-gray-500 pl-10 mb-8">
        {{ report.name }} ({{ report.email }})
      </span>

      <p class="text-slate-800 pl-10">{{ report.message }}</p>

      <!-- <button -->
      <!--   class="text-slate-800 bg-red-600 px-4 py-1 rounded-md shadow-md mt-10" -->
      <!--   @click="$emit('remove', report._id)" -->
      <!-- > -->
      <!--   Delete -->
      <!-- </button> -->
    </div>
    <h1 v-else>No report selected</h1>
  </div>
</template>
