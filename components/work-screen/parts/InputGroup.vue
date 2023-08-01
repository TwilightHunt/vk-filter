<template>
  <div class="input-group mb-3">
    <input
      type="text"
      :placeholder="inputPlaceholder"
      v-model="groupId"
      class="form-control"
      @input="$emit('onInput')"
      @change="onChange"
    />
    <button
      @click="$emit('onShowClicked')"
      class="btn btn-primary"
      type="button"
      id="button-addon2"
      :disabled="isButtonActive"
    >
      Show
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
};
</script>

<style lang="scss" scoped></style>
