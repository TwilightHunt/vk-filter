<template>
  <div ref="communities" class="communities">
    <h4 class="section">Fiter members</h4>
    <input type="text" placeholder="group id" v-model="groupId" />
    <button @click="filter">Show</button>
  </div>
</template>

<script setup>
const groupId = ref();

async function filter() {
  const res = await $fetch(`/api/groups/members?group_id=${groupId.value}`);
  console.log(res);
}
</script>

<script>
export default {
  name: "Communities",
};
</script>

<style lang="scss" scoped></style>
