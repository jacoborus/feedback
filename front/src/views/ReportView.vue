<script setup lang="ts">
import type { Report } from "../api";
defineProps<{
  report: Report | undefined;
}>();
defineEmits<{
  (e: "remove", id: string): void;
}>();
</script>

<template>
  <div class="flex w-full h-full justify-center pt-10">
    <div v-if="report" class="">
      <span>{{ report.feedbacktype }}</span>
      <h1 class="text-2xl text-black">{{ report.title }}</h1>
      <span class="text-sm text-gray-500">
        {{ report.name }} ({{ report.email }})
      </span>
      <p class="text-slate-800">{{ report.message }}</p>

      <button
        class="text-slate-800 bg-red-600 px-4 py-1 rounded-md shadow-md mt-10"
        @click="$emit('remove', report._id)"
      >
        Delete
      </button>
    </div>
    <h1 v-else>No report selected</h1>
  </div>
</template>
