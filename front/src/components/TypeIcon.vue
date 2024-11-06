<script setup lang="ts">
import { Lightbulb, CircleAlert } from "lucide-vue-next";

const props = defineProps<{
  type: "bug" | "suggestion";
  big?: boolean;
}>();
const size = props.big ? 24 : 16;
</script>

<template>
  <CircleAlert v-if="type === 'bug'" color="red" :size="size" />
  <Lightbulb v-else color="orange" :size="size" />
</template>
