<template>
  <div ref="communities" class="communities p-4">
    <h3 class="section mb-4">Fiter members</h3>
    <div class="input-group mb-3">
      <input type="text" placeholder="Group id" v-model="groupId" class="form-control" />
      <button @click="filter" class="btn btn-primary" type="button" id="button-addon2">Show</button>
    </div>
    <div class="error-message text-danger">{{ data.errorMessage }}</div>
    <div v-if="data.info" class="communities__result">
      <div class="community-members-count fs-4">Количество участников: {{ data.info.count }}</div>
      <div class="community-members-resut-header fs-4 fw-bolder mt-2 mb-1">Результат запроса:</div>
      <UserCard v-for="member in data.info.items" :user-id="member" :key="member" />
    </div>
  </div>
</template>

<script setup>
const groupId = ref();

const data = reactive({
  info: null,
  errorMessage: "",
});

async function filter() {
  const { members, error } = await $fetch(`/api/groups/members?group_id=${groupId.value}`);
  if (error) {
    data.errorMessage = error.message;
    return;
  }
  data.info = members;
  data.errorMessage = "";
}
</script>

<script>
export default {
  name: "Communities",
};
</script>

<style lang="scss" scoped></style>
