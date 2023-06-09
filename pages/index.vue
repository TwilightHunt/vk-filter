<template>
  <div class="index"></div>
</template>

<script setup>
const localPath = useLocalePath();

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return navigateTo(localPath("/main"));
  }
  return navigateTo(localPath("/auth"));
});
</script>

<style lang="scss" scoped></style>
