<template>
  <div ref="communities" class="communities p-4">
    <h3 class="section mb-4">Fiter members</h3>
    <div class="input-group mb-3">
      <input type="text" placeholder="Group id" v-model="groupId" class="form-control" />
      <button @click="filter" class="btn btn-primary" type="button" id="button-addon2">Show</button>
    </div>
    <div class="error-message text-danger">{{ data.errorMessage }}</div>
    <div class="community-filters">
      <FilterDropdown
        filter="Пол"
        :options="genders"
        :default="data.filters.sex"
        class="mb-3"
        @onSelectedOption="changeSexFilter" />
      <FilterDropdown
        filter="Город"
        :options="[{ id: 0, title: 'Любой' }, ...data.cities, { id: -1, title: 'Другой...' }]"
        :default="data.filters.city"
        @onSelectedOption="changeCityFilter"
        class="mb-3" />
      <div>
        <div class="fs-5 mb-3">Возраст</div>
        <span class="me-2">От: </span>
        <input type="number" min="1" max="99" maxlength="2" @change="setMinAge" />
        <span class="me-2 ms-5">До: </span>
        <input type="number" min="1" max="99" maxlength="2" @change="setMaxAge" />
      </div>
    </div>
    <div v-if="data.info" class="communities__result">
      <div class="community-members-count fs-4">Количество участников: {{ data.info.count }}</div>
      <div class="community-members-resut-header fs-4 fw-bolder mt-2 mb-1">Результат запроса:</div>
      <UserCard v-for="member in data.info" :user-info="member" :key="member" />
    </div>
    <!-- <button
      v-if="data.isNextVisible"
      @click="filter"
      class="btn btn-primary"
      type="button"
      id="button-addon2">
      Next
    </button> -->
  </div>
</template>

<script setup>
const groupId = ref();

const data = reactive({
  info: null,
  errorMessage: "",
  isNextVisible: false,
  filters: {
    sex: { id: 0, title: "Любой" },
    max_age: null,
    min_age: null,
    city: { id: 0, title: "Любой" },
  },
  cities: "",
});

let offset = 0;
const count = 10;

async function filter() {
  data.isNextVisible = false;
  let result = [];

  const members = await fetchMembers(offset, count);

  while (result.length < count && offset < members.count) {
    let delta = count - result.length;
    const members = await fetchMembers(offset, delta);

    const response = await $fetch(`/api/users/info`, {
      method: "POST",
      body: { user_ids: members },
    });

    let membersInfo = response.users;
    let localResult = membersInfo;

    if (data.filters.sex.id !== 0)
      localResult = membersInfo.filter((member) => member?.sex === data.filters.sex.id);
    if (data.filters.city.id !== 0)
      localResult = localResult.filter((member) => member?.city?.title === data.filters.city.title);

    result.push(...localResult);

    offset += delta;
  }

  data.isNextVisible = true;
  data.info = result;
  data.errorMessage = "";
  offset = 0;
}

const fetchMembers = async (_offset, _count) => {
  const { members, error } = await $fetch(
    `/api/groups/members?group_id=${groupId.value}&offset=${_offset}&count=${_count}`
  );
  if (error) {
    data.errorMessage = error.message;
    return;
  }
  return members;
};

const changeSexFilter = (option) => {
  data.filters.sex = option;
};

const changeCityFilter = (option) => {
  data.filters.city = option;
};

const setMinAge = (event) => {
  data.filters.min_age = event.target.value;
};

const setMaxAge = (event) => {
  data.filters.max_age = event.target.value;
};

onMounted(async () => {
  const res = await $fetch("/api/database/cities");
  data.cities = res.cities;
});

const genders = [
  { id: 0, title: "Любой" },
  { id: 1, title: "Женский" },
  { id: 2, title: "Мужской" },
];
</script>

<script>
export default {
  name: "Communities",
};
</script>

<style lang="scss" scoped></style>
