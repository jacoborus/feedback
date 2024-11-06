<script setup lang="ts">
import { reactive } from "vue";
import { FeedbackService } from "../api";
import type { ReportInsert } from "../api";

const emit = defineEmits<{
  (e: "submitted"): void;
  (e: "close"): void;
}>();

const data = reactive<ReportInsert>({
  name: "",
  email: "",
  feedbacktype: "bug",
  title: "",
  message: "",
});

async function submitReport() {
  console.log(data);
  await FeedbackService.create(data).then(() => emit("submitted"));
}
</script>

<template>
  <div class="fixed w-full h-full bg-gray-300">
    <form
      class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-4"
      @submit.prevent="submitReport"
    >
      <h1 class="font-bold">Add new feedback</h1>
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="data.name"
          required
          class="mt-1 block w-72 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          v-model="data.email"
          class="mt-1 block w-72 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          for="feedbacktype"
          class="block text-sm font-medium text-gray-700"
        >
          Type
        </label>
        <select
          id="feedbacktype"
          name="feedbacktype"
          v-model="data.feedbacktype"
          required
          class="mt-1 block w-72 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="bug">Bug</option>
          <option value="suggestion">Suggestion</option>
        </select>
      </div>

      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          v-model="data.title"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          v-model="data.message"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <div class="pt-4">
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
    <button
      type="submit"
      class="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      @click="emit('close')"
    >
      Cancel
    </button>
  </div>
</template>
