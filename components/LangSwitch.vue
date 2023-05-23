<template>
  <div class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-mdb-toggle="dropdown"
      aria-expanded="false"
      @click="toggleDropdown">
      {{ locale }}
    </button>
    <div ref="menu" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <NuxtLink
        v-for="{ code, name } in locales"
        class="dropdown-item"
        :key="code"
        :to="switchLocalePath(code)"
        >{{ name }}</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const switchLocalePath = useSwitchLocalePath();
const { locale, locales } = useI18n();

const menu = ref();
defineExpose({ menu });

function toggleDropdown() {
  menu.value.classList.toggle("_opened");
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  right: 0;
  left: auto;
  &._opened {
    display: block !important;
  }
}
</style>
