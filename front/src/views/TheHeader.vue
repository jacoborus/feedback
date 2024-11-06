<script setup lang="ts">
defineEmits<{
  (e: "openForm"): void;
}>();
</script>

<template>
  <div
    class="bg-slate-100 flex justify-between p-8 border-b-gray-200 border-solid border-2"
  >
    <span>logo</span>

    <button
      class="py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      @click="$emit('openForm')"
    >
      New feedback
    </button>
  </div>
</template>
