<template>
  <div class="input-group mb-3">
    <input
      type="text"
      :placeholder="inputPlaceholder"
      class="form-control"
      @input="onChange"
    />
    <button
      @click="$emit('onShowClicked')"
      class="btn btn-primary"
      type="button"
      id="button-addon2"
      :disabled="isButtonActive"
    >
      {{ $t("show") }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  isButtonActive: { type: Boolean, required: true },
  modelValue: Number,
  inputPlaceholder: String,
});

const emit = defineEmits(["update:modelValue"]);

const onChange = (event) => {
  emit("update:modelValue", event.target.value);
  emit("onInput");
};
</script>

<style lang="scss" scoped></style>
