<template>
  <div class="workscreen">
    <button @click="fetch">Fetch</button>
  </div>
</template>

<script setup>
async function fetch() {
  const res = await $fetch("/api/users/friends?id=1");
  console.log(res);
}
</script>

<style lang="scss" scoped></style>
