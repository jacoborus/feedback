<script setup lang="ts">
import { Lightbulb, CircleAlert } from "lucide-vue-next";

defineProps<{
  type: "bug" | "suggestion";
}>();
</script>

<template>
  <Lightbulb v-if="type === 'bug'" color="orange" :size="24" />
  <CircleAlert v-else color="red" :size="24" />
</template>
