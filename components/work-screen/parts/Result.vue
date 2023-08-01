<template>
  <div class="results">
    <UserCard v-for="user in users" :user-info="user" :key="user" />
  </div>
</template>

<script setup>
defineProps({
  users: Object,
});
</script>

<style lang="scss" scoped>
.results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 1.5rem;
  row-gap: 2rem;
}
</style>
