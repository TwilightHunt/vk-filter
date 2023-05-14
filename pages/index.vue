<template>
  <div class="index"></div>
</template>

<script setup>
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.token) {
    return navigateTo("/main");
  }
  return navigateTo("/auth");
});
</script>

<style lang="scss" scoped></style>
