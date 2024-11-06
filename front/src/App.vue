<script setup lang="ts">
import { ref } from "vue";
import FeedbackForm from "./views/FeedbackForm.vue";
import TheHeader from "./views/TheHeader.vue";
import ReportList from "./views/ReportList.vue";
import ReportView from "./views/ReportView.vue";
import { FeedbackService } from "./api";
import type { Report } from "./api";
import type { FilterType, SortBy } from "./views/ReportList.vue";

const reports = ref<Report[]>([]);
const selectedReport = ref<string | undefined>();
const isVisibleForm = ref(false);
const amountItems = ref(0);

const findOptions = {
  feedbacktype: "all" as FilterType,
  sortby: "date" as SortBy,
  page: 1,
};

fetchFeedback();

async function fetchFeedback() {
  return FeedbackService.listReports(findOptions)
    .then((data) => {
      reports.value = data.items;
      amountItems.value = data.total;
    })
    .catch((e) => {
      alert("Error fetching feedback, please try again later");
      console.error(e);
    });
}

function selectReport(id: string) {
  selectedReport.value = id;
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

async function filterByType(type: FilterType) {
  findOptions.feedbacktype = type;
  findOptions.page = 1;
  await fetchFeedback();
}

async function sortBy(field: SortBy) {
  findOptions.sortby = field;
  findOptions.page = 1;
  await fetchFeedback();
}

async function removeReport(id: string) {
  if (!window.confirm("Are you sure you want to remove the report?")) return;
  return FeedbackService.removeReport({ id }).then(() => {
    selectedReport.value = undefined;
    reports.value = reports.value.filter((r) => r._id !== id);
  });
}

function prevPage() {
  findOptions.page -= 1;
  fetchFeedback();
}

function nextPage() {
  findOptions.page += 1;
  fetchFeedback();
}
</script>

<template>
  <div class="flex flex-col h-full">
    <TheHeader @openForm="openForm" />

    <div class="grow flex">
      <ReportList
        :reports="reports"
        :selected-id="selectedReport"
        :total="amountItems"
        :page="findOptions.page"
        @view="selectReport"
        @filter-type="filterByType"
        @sort-by="sortBy"
        @prev-page="prevPage"
        @next-page="nextPage"
      />
      <ReportView :id="selectedReport" @remove="removeReport" />
    </div>

    <transition name="fade">
      <FeedbackForm
        v-if="isVisibleForm"
        @submitted="afterSubmit"
        @close="closeForm"
      />
    </transition>
  </div>
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
