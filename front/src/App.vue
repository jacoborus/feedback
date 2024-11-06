<script setup lang="ts">
import { ref } from "vue";
import FeedbackForm from "./views/FeedbackForm.vue";
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

const isVisibleForm = ref(false);

function fetchFeedback() {
  FeedbackService.list().then((data) => {
    reports.value = data;
  });
}

function selectReport(id: string) {
  selectedReport.value = reports.value.find(({ _id }) => _id === id);
}

function openForm() {
  isVisibleForm.value = true;
}

function afterSubmit() {
  isVisibleForm.value = false;
  fetchFeedback();
}
</script>

<template>
  <div class="flex flex-col h-full">
    <TheHeader @openForm="openForm" />

    <div class="grow flex">
      <ReportList :reports="reports" @view="selectReport" />
      <ReportView :report="selectedReport" />
    </div>

    <FeedbackForm v-if="isVisibleForm" @submitted="afterSubmit" />
  </div>
</template>

<style scoped></style>
