<script setup lang="ts">
import { ref, watch } from "vue";
import type { Report } from "../api";
import TypeIcon from "../components/TypeIcon.vue";
import { formatDate } from "../util/formatDates";

export type FilterType = "all" | "bug" | "suggestion";
export type SortBy = "date" | "name";

const props = defineProps<{
  reports: Report[];
  selectedId: string | undefined;
}>();

const emit = defineEmits<{
  (e: "view", id: string): void;
  (e: "filterType", type: FilterType): void;
  (e: "sortBy", type: SortBy): void;
}>();

const filterType = ref<FilterType>("all");
const sortBy = ref<SortBy>("date");

watch(filterType, (value) => {
  emit("filterType", value);
});
watch(sortBy, (value) => {
  emit("sortBy", value);
});
</script>

<template>
  <div
    class="flex-col h-full basis-1/2 bg-slate-50 overflow-y-auto border-r max-w-96 min-w-80"
  >
    <div class="border-b px-6 py-4 flex justify-between">
      <div>
        <label for="filtertype" class="text-gray-500 text-sm font-medium">
          Filter
        </label>

        <select
          id="filtertype"
          name="filtertype"
          v-model="filterType"
          class="mt-1 w-32 bg-slate-200 text-gray-600 font-medium rounded-md focus:outline-none sm:text-sm"
        >
          <option value="all">All</option>
          <option value="bug">Bug</option>
          <option value="suggestion">Suggestion</option>
        </select>
      </div>

      <div>
        <label for="sortby" class="text-gray-500 text-sm font-medium">
          Sort
        </label>

        <select
          id="sortby"
          name="sortby"
          v-model="sortBy"
          class="mt-1 w-18 bg-slate-200 text-gray-600 font-medium rounded-md focus:outline-none sm:text-sm"
        >
          <option value="date">Date</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>

    <ul class="p-2">
      <li
        v-for="report in props.reports"
        @click.prevent="$emit('view', report._id)"
        class="flex rounded-md p-4 cursor-pointer"
        :class="{ 'bg-slate-200': report._id === props.selectedId }"
      >
        <TypeIcon :type="report.feedbacktype" class="mr-2 mt-1" />

        <div class="w-full">
          <span class="text-base"> {{ report.title }} </span><br />
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
