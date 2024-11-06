<script setup lang="ts">
defineEmits<{
  (e: "openForm"): void;
}>();
</script>

<template>
  <div
    class="bg-slate-100 flex justify-between p-8 border-b-gray-200 border-solid border-2"
  >
    <img src="../assets/logo.svg" alt="the logo" />

    <button
      class="py-1 px-7 bg-green-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      @click="$emit('openForm')"
    >
      New feedback
    </button>
  </div>
</template>
