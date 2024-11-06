<script setup lang="ts">
import { FeedbackService } from "./api";
import type { Report } from "../api";

const props = defineProps<{
  reports: Report[];
}>();
</script>

<template>
  <div
    class="flex-col flex-grow border-b-gray-200 border-solid border-2 max-w-96 bg-green-400"
  >
    <div
      v-for="report in props.reports"
      @click.prevent="$emit('view', report._id)"
    >
      type: {{ report.feedbackType }} <br />
      title: {{ report.title }} <br />
      reporter: {{ report.name }} <br />
    </div>
  </div>
</template>
