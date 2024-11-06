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
      class="px-4 h-12 bg-emerald-400 text-white text-sm font-bold rounded-md shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      @click="$emit('openForm')"
    >
      New feedback
    </button>
  </div>
</template>
