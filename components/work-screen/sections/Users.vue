<template>
  <div ref="users" class="users p-4">
    <h4 class="section mb-4">Fiter users</h4>
    <div class="input-group mb-3">
      <input type="text" placeholder="User id" v-model="userId" class="form-control" />
      <button @click="filter" class="btn btn-primary" type="button" id="button-addon2">Show</button>
    </div>
    <div class="error-message text-danger">{{ data.errorMessage }}</div>
    <div>{{ data.members }}</div>
  </div>
</template>

<script setup>
const userId = ref();

const data = reactive({
  members: null,
  errorMessage: "",
});

async function filter() {
  // data.members = res;
  // data.errorMessage = "";
}
</script>

<style lang="scss" scoped></style>
