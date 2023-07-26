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
import { Filter } from "~/utils/filters";
import { storeToRefs } from "pinia";
import { useFilterStore } from "@/store/filter";

const store = useFilterStore();
const { currentFilter } = storeToRefs(store);

const groupId = ref(189070492);
const isFetching = ref(false);

const data = reactive({
  result: [],
  displayedMembers: [],
  errorMessage: "",
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

    const filter = new Filter(membersInfo);

    console.log(currentFilter.value);

    if (currentFilter.value.sex.id !== 0)
      filter.sex(currentFilter.value.sex.id);
    if (currentFilter.value.city.id !== 0)
      filter.city(currentFilter.value.city.id);
    if (currentFilter.value.max_age)
      filter.max_age(currentFilter.value.max_age);
    if (currentFilter.value.min_age)
      filter.min_age(currentFilter.value.min_age);
    if (currentFilter.value.isSkipClosed) filter.skipClosed();
    if (currentFilter.value.isSkipDeleted) filter.skipDeleted();

    data.result.push(...filter.value);
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
-->
