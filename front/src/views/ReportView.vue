<script setup lang="ts">
import type { Report } from "../api";
defineProps<{
  report: Report | undefined;
}>();
</script>

<template>
  <div class="flex w-full h-full justify-center pt-10">
    <div v-if="report" class="">
      <span>{{ report.feedbacktype }}</span>
      <h1 class="text-2xl text-black">{{ report.title }}</h1>
      <span class="text-sm text-gray-500"
        >{{ report.name }} ({{ report.email }})</span
      >
      <p class="text-slate-800">{{ report.message }}</p>
    </div>
    <h1 v-else>No report selected</h1>
  </div>
</template>
