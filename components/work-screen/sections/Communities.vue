<template>
  <div ref="communities" class="communities p-4">
    <h3 class="section mb-4">Filter members</h3>
    <div class="input-group mb-3">
      <input
        type="text"
        placeholder="Group id"
        v-model="groupId"
        class="form-control"
        @change="setToDefault"
      />
      <button
        @click="filter(0)"
        class="btn btn-primary"
        type="button"
        id="button-addon2"
      >
        Show
      </button>
    </div>
    <div class="error-message text-danger">{{ data.errorMessage }}</div>
    <div class="community-filters">
      <FilterDropdown
        filter="Пол"
        :options="genders"
        :default="data.filters.sex"
        class="mb-3"
        @onSelectedOption="changeSexFilter"
      />
      <FilterDropdown
        filter="Город"
        :options="[
          { id: 0, title: 'Любой' },
          ...data.cities,
          { id: -1, title: 'Другой...' },
        ]"
        :default="data.filters.city"
        @onSelectedOption="changeCityFilter"
        class="mb-3"
      />
      <div>
        <div class="fs-5 mb-3">Возраст</div>
        <span class="me-2">От: </span>
        <input
          type="number"
          min="1"
          max="99"
          maxlength="2"
          @change="setMinAge"
        />
        <span class="me-2 ms-5">До: </span>
        <input
          type="number"
          min="1"
          max="99"
          maxlength="2"
          @change="setMaxAge"
        />
      </div>
      <div class="mt-3">
        <CommonCheckbox
          label="Скрывать удаленные аккаунты"
          v-model="data.filters.isSkipDeleted"
        />
        <CommonCheckbox
          label="Скрывать закрытые аккаунты"
          v-model="data.filters.isSkipClosed"
        />
      </div>
    </div>
    <div v-if="isFetching">Loading...</div>
    <div v-else-if="data.result.length" class="communities__result">
      <div class="community-members-count fs-4">
        Количество участников: {{ data.membersCount }}
      </div>
      <div class="community-members-resut-header fs-4 fw-bolder mt-2 mb-1">
        Результат запроса:
      </div>
      <div class="community__results my-4">
        <UserCard
          v-for="member in data.displayedMembers"
          :user-info="member"
          :key="member"
        />
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a
              :class="`page-link ${data.currentPage > 1 ? '' : 'disabled'}`"
              @click="goToPreviousPage"
              href="#"
              >Previous</a
            >
          </li>
          <li class="page-item">
            <a
              @click="goToNextPage"
              :class="`page-link ${
                data.maxPage && data.currentPage === data.maxPage
                  ? 'disabled'
                  : ''
              }`"
              href="#"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { countAgeByBDate } from "@/composables/useCounters";
const groupId = ref();
const isFetching = ref(false);

const data = reactive({
  result: [],
  displayedMembers: [],
  errorMessage: "",
  filters: {
    sex: { id: 0, title: "Любой" },
    max_age: null,
    min_age: null,
    city: { id: 0, title: "Любой" },
    isSkipDeleted: true,
    isSkipClosed: false,
  },
  cities: "",
  count: 10,
  currentOffset: 0,
  currentPage: 1,
  membersCount: 0,
  maxPage: null,
});

const setToDefault = () => {
  data.currentOffset = 0;
  data.currentPage = 1;
  data.membersCount = 0;
  data.maxPage = null;
  data.result = [];
  data.displayedMembers = [];
};

async function filter(offset) {
  isFetching.value = true;
  const members = await fetchMembers(offset, data.count);
  data.membersCount = members.count;

  while (
    data.result.length < data.currentPage * 10 &&
    offset < data.membersCount
  ) {
    const members = await fetchMembers(offset, data.count);

    const response = await $fetch(`/api/users/info`, {
      method: "POST",
      body: { user_ids: members },
    });

    let membersInfo = response.users;
    let localResult = membersInfo;

    console.log(response);

    if (data.filters.sex.id !== 0)
      localResult = membersInfo.filter(
        (member) => member?.sex === data.filters.sex.id
      );
    if (data.filters.city.id !== 0)
      localResult = localResult.filter(
        (member) => member?.city?.title === data.filters.city.title
      );
    if (data.filters.max_age) {
      localResult = localResult.filter(
        (member) =>
          countAgeByBDate(member?.bdate) &&
          countAgeByBDate(member?.bdate) <= data.filters.max_age
      );
    }
    if (data.filters.min_age) {
      localResult = localResult.filter(
        (member) =>
          countAgeByBDate(member?.bdate) &&
          countAgeByBDate(member?.bdate) >= data.filters.min_age
      );
    }
    if (data.filters.isSkipClosed) {
      localResult = localResult.filter((member) => !!member?.can_access_closed);
    }
    if (data.filters.isSkipDeleted) {
      localResult = localResult.filter((member) => !!!member?.deactivated);
    }

    data.result.push(...localResult);
    offset += data.count;
  }

  const end = data.currentPage * data.count;
  const start = end - data.count;
  data.displayedMembers = data.result.slice(start, end);
  data.errorMessage = "";
  isFetching.value = false;
  data.currentOffset = offset;
  if (offset > data.membersCount) {
    data.maxPage = data.currentPage;
  }
}

const fetchMembers = async (offset, count) => {
  const { members, error } = await $fetch(
    `/api/groups/members?group_id=${groupId.value}&offset=${offset}&count=${count}`
  );
  if (error) {
    data.errorMessage = error.message;
    return;
  }
  return members;
};

const goToNextPage = async () => {
  data.currentPage++;
  const end = data.currentPage * data.count;
  const start = end - data.count;

  if (data.result.length < end) {
    await filter(data.currentOffset);
  } else {
    data.displayedMembers = data.result.slice(start, end);
  }
};

const goToPreviousPage = async () => {
  data.currentPage--;
  const end = data.currentPage * data.count;
  const start = end - data.count;
  data.displayedMembers = data.result.slice(start, end);
};

const changeSexFilter = (option) => {
  data.filters.sex = option;
  setToDefault();
};

const changeCityFilter = (option) => {
  data.filters.city = option;
  setToDefault();
};

const setMinAge = (event) => {
  data.filters.min_age = event.target.value;
  setToDefault();
};

const setMaxAge = (event) => {
  data.filters.max_age = event.target.value;
  setToDefault();
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

<style lang="scss" scoped>
.community {
  &__results {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    column-gap: 1.5rem;
    row-gap: 2rem;
  }
}
</style>
