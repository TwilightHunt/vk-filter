<template>
  <div class="d-flex align-items-center">
    <div class="me-2 fs-5">{{ props.filter }}</div>
    <div class="dropdown">
      <button
        class="btn btn-dark dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
        @click="toggleDropdown"
      >
        {{ props.modelValue.title }}
      </button>
      <div
        ref="menu"
        class="dropdown-menu dropdown-menu-dark"
        aria-labelledby="dropdownMenuButton"
      >
        <a
          v-for="option in props.options"
          class="dropdown-item"
          href="#"
          :key="option.id"
          @click="select(option)"
          >{{ option.title }}</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const menu = ref();
defineExpose({ menu });
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  filter: String,
  options: Array,
  modelValue: Object,
});

function toggleDropdown() {
  menu.value.classList.toggle("_opened");
}

function select(option) {
  toggleDropdown();
  emit("update:modelValue", option);
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
