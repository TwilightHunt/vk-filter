<template>
  <div class="form-check">
    <input
      class="form-check-input cursor-pointer"
      type="checkbox"
      :checked="modelValue"
      @change="onChange"
      :id="id"
    />
    <label class="form-check-label cursor-pointer" :for="id">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
const id = ref();

onMounted(() => {
  id.value = "checkbox" + Math.random().toString(16).slice(2);
  console.log(id.value);
});
defineProps({
  label: String,
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const onChange = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped></style>
