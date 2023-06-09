<template>
  <div class="user-card">
    <a target="_blank" rel="noopener noreferrer" :href="`https://vk.com/${userInfo.domain}`"
      >{{ userInfo.first_name }} {{ userInfo.last_name }}</a
    >
  </div>
</template>

<script setup>
const props = defineProps({
  userId: { type: String, required: true },
});

const userInfo = ref();

const res = await $fetch(`/api/users/info?user_id=${props.userId}`);
userInfo.value = res.user[0];
</script>

<style lang="scss" scoped></style>
