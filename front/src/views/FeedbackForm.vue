<script setup lang="ts">
import { reactive, ref } from "vue";
import { FeedbackService } from "../api";
import type { ReportInsert } from "../api";

const emit = defineEmits<{
  (e: "submitted", id: string): void;
  (e: "close"): void;
}>();

const hasError = ref(false);
const data = reactive<ReportInsert>({
  name: "",
  email: "",
  feedbacktype: "bug",
  title: "",
  message: "",
});

async function submitReport() {
  await FeedbackService.create(data)
    .then((data) => emit("submitted", data?._id))
    .catch(() => {
      hasError.value = true;
    });
}
</script>

<template>
  <div class="fixed flex w-full h-full bg-gray-300 justify-center items-center">
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
          class="mt-1 block w-72 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          class="mt-1 block w-72 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          class="mt-1 block w-72 px-3 py-2 border border-gray-300 bg-white rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <p v-if="hasError" class="text-red-700">Error, please try again later</p>

      <div class="flex pt-4 justify-end">
        <button
          class="py-2 px-4 mr-2 bg-gray-200 text-gray-700 font-semibold rounded-sm shadow-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          @click.prevent="emit('close')"
        >
          Discard
        </button>
        <button
          type="submit"
          class="py-2 px-4 bg-green-600 text-white font-semibold rounded-sm shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Send feedback
        </button>
      </div>
    </form>
  </div>
</template>
