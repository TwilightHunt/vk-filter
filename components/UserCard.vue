<template>
  <div class="user-card">
    <a :href="`https://vk.com/id${props.userId}`"
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
