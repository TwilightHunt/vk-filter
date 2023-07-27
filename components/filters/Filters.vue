<template>
  <div id="filter" class="filters p-md-4 col rounded bg-black">
    <component :is="currentFilter ?? CommunitiesFilters" />
    <IconsCross @click="closeFilter" class="cross d-md-none d-block" />
  </div>
</template>

<script setup>
import { currentFilter } from "~/composables/useNavigation";
import CommunitiesFilters from "./sections/CommunitiesFilters.vue";

const closeFilter = () => {
  const filter = document.getElementById("filter");
  filter.classList.remove("show");
};
</script>

<style lang="scss" scoped>
.filters {
  min-height: 80vh;
}

.cross {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .filters {
    position: fixed;
    inset: 0;
    z-index: 100;
    padding: 2rem;
    padding-top: 40px;
    transition: 0.3s ease-in-out;
    transform: translateX(100%);
    &.show {
      transform: translateX(0);
    }
  }
}
</style>
