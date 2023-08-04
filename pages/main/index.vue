<template>
  <div class="main"></div>
</template>

<script setup>
onMounted(() => {
  const router = useRouter();
  router.push("main/communities");
});
</script>

<style lang="scss">
.filters-btn {
  font-size: 1.2rem;
  text-decoration: underline;
  line-height: 25px;
  align-items: center;
  column-gap: 0.5rem;
  &:active {
    text-decoration: none;
  }
}
</style>
