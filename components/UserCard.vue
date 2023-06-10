<template>
  <div class="user-card">
    <a target="_blank" rel="noopener noreferrer" :href="`https://vk.com/${props.userInfo.domain}`">
      {{ props.userInfo.first_name }} {{ props.userInfo.last_name }}</a
    >
  </div>
</template>

<script setup>
const props = defineProps({
  userInfo: { type: Object, required: true },
});
</script>

<style lang="scss" scoped></style>
