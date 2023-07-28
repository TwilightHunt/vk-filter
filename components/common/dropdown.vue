<template>
  <div v-on-click-outside="closeDropdown" class="d-flex align-items-center">
    <div class="me-2 fs-5">{{ title }}</div>
    <div class="dropdown">
      <button
        class="btn btn-dark dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
        @click="toggleDropdown"
      >
        {{ modelValue?.title || modelValue }}
      </button>
      <div
        ref="menu"
        class="dropdown-menu dropdown-menu-dark"
        aria-labelledby="dropdownMenuButton"
      >
        <a
          v-for="option in options"
          class="dropdown-item"
          href="#"
          :key="option.id ?? option.code"
          @click="select(option)"
          >{{ option.title ?? option.name }}</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { vOnClickOutside } from "@vueuse/components";
const menu = ref();
defineExpose({ menu });
const emit = defineEmits(["update:modelValue", "onChange"]);

const props = defineProps({
  title: String,
  options: Array,
  modelValue: Object,
});

function select(option) {
  toggleDropdown();
  emit("update:modelValue", option);
  emit("onChange", option);
}

function toggleDropdown() {
  menu.value.classList.toggle("_opened");
}

function closeDropdown() {
  menu.value.classList.remove("_opened");
}
</script>

<style lang="scss" scoped>
.dropdown-menu._opened {
  display: block !important;
}
.dropdown-menu {
  max-height: 200px;
  overflow-y: auto;
}
</style>
