<template>
  <div class="filters col rounded bg-black">
    <component class="p-4" :is="currentFilter ?? CommunitiesFilters" />
  </div>
</template>

<script setup>
import { currentFilter } from "~/composables/useNavigation";
import CommunitiesFilters from "./sections/CommunitiesFilters.vue";
</script>

<style lang="scss" scoped>
.filters {
  min-height: 80vh;
}
</style>
