<script setup lang="ts">
defineEmits<{
  (e: "openForm"): void;
}>();
</script>

<template>
  <div
    class="bg-slate-50 flex justify-between p-8 border-b-slate-200 border-solid border-b"
  >
    <img src="../assets/logo.svg" alt="the logo" />

    <button
      class="block py-1 px-4 bg-emerald-400 text-white text-lg font-semibold rounded-md shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      @click="$emit('openForm')"
    >
      New feedback
    </button>
  </div>
</template>
