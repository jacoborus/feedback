<script setup lang="ts">
import { ref } from "vue";
// import FeedbackForm from "./views/FeedbackForm.vue";
import TheHeader from "./views/TheHeader.vue";
import ReportList from "./views/ReportList.vue";
import ReportView from "./views/ReportView.vue";
import { FeedbackService } from "./api";
import type { Report } from "./api";

const reports = ref<Report[]>([]);
const selectedReport = ref<Report | undefined>();
FeedbackService.list().then((data) => {
  reports.value = data;
});

// const isVisibleForm = ref(false);

function selectReport(id: string) {
  selectedReport.value = reports.value.find(({ _id }) => _id === id);
}
</script>

<template>
  <div class="flex-col h-full">
    <TheHeader />

    <div class="flex-grow">
      <ReportList :reports="reports" @view="selectReport" />
      <ReportView :report="selectedReport" />
    </div>

    <!-- <FeedbackForm v-if="isVisibleForm" /> -->
  </div>
</template>

<style scoped></style>
