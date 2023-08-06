<template>
  <div v-on-click-outside="closeDropdown">
    <div class="dropdown w-100">
      <button
        class="btn dropdown-toggle d-flex align-items-center gap-1"
        :class="
          (color ? `btn-${color}` : 'btn-dark') + (large ? ' btn-lg' : '')
        "
        type="button"
        id="dropdownMenuButton"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
        @click="toggleDropdown"
      >
        {{ modelValue.title ?? modelValue.code }}
      </button>
      <div
        ref="menu"
        class="dropdown-menu dropdown-menu-dark"
        :class="alignRight ? 'dropdown-menu-end' : ''"
        aria-labelledby="dropdownMenuButton"
      >
        <a
          v-for="option in options"
          class="dropdown-item"
          :class="large ? ' option-lg' : ''"
          href="#"
          :key="option.id ?? option.code"
          @click.prevent="select(option)"
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
  options: Array,
  modelValue: Object,
  alignRight: Boolean,
  color: String,
  large: Boolean,
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
  &-end {
    right: 0;
    left: auto;
  }
}
.option-lg {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
}
</style>
