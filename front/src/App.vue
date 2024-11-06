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

const isVisibleForm = ref(false);

fetchFeedback();

async function fetchFeedback() {
  return FeedbackService.listReports().then((data) => {
    reports.value = data;
  });
}

function selectReport(id: string) {
  selectedReport.value = reports.value.find(({ _id }) => _id === id);
}

function openForm() {
  isVisibleForm.value = true;
}

function closeForm() {
  isVisibleForm.value = false;
}

async function afterSubmit(id: string) {
  closeForm();
  fetchFeedback().then(() => selectReport(id));
}

async function removeReport(id: string) {
  return FeedbackService.removeReport(id).then(() => {
    selectedReport.value = undefined;
    reports.value = reports.value.filter((r) => r._id !== id);
  });
}
</script>

<template>
  <div class="flex flex-col h-full">
    <TheHeader @openForm="openForm" />

    <div class="grow flex">
      <ReportList
        :reports="reports"
        :selected-id="selectedReport?._id"
        @view="selectReport"
      />
      <ReportView :report="selectedReport" @remove="removeReport" />
    </div>
  </div>

  <transition name="fade">
    <FeedbackForm
      v-if="isVisibleForm"
      @submitted="afterSubmit"
      @close="closeForm"
    />
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
