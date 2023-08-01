<template>
  <div ref="communities" class="communities p-4">
    <h3 class="section mb-4">Filter members</h3>
    <InputGroup
      :isButtonActive="!data.isShowButtonActive"
      @onInput="setToDefault"
      @onShowClicked="filter(0)"
      inputPlaceholder="Group id"
      v-model="groupId"
    />
    <div class="error-message text-danger">{{ data.errorMessage }}</div>
    <div v-if="isFetching">Loading...</div>
    <div v-else-if="data.result.length" class="communities__result">
      <div class="community-members-count fs-4">
        Количество участников: {{ data.membersCount }}
      </div>
      <div class="community-members-resut-header fs-4 fw-bolder mt-2 mb-1">
        Результат запроса:
      </div>
      <WorkScreenPartsResult :users="data.displayedMembers" />
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
import InputGroup from "../parts/InputGroup.vue";

const store = useFilterStore();
const { currentFilter } = storeToRefs(store);

const groupId = ref();
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
  isShowButtonActive: false,
});

const setToDefault = () => {
  data.currentOffset = 0;
  data.currentPage = 1;
  data.membersCount = 0;
  data.maxPage = null;
  data.result = [];
  data.displayedMembers = [];
  if (groupId.value) {
    data.isShowButtonActive = true;
  }
  data.errorMessage = "";
};

async function filter(offset) {
  try {
    data.isShowButtonActive = false;
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

      const { sex, city, max_age, min_age, isSkipClosed, isSkipDeleted } =
        currentFilter.value;

      filter
        .sex(sex.id)
        .city(city.id)
        .max_age(max_age)
        .min_age(min_age)
        .skipClosed(isSkipClosed)
        .skipDeleted(isSkipDeleted);

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
  } catch (error) {
    data.errorMessage = error;
    isFetching.value = false;
  }
}

const fetchMembers = async (offset, count) => {
  const { members, error } = await $fetch(
    `/api/groups/members?group_id=${groupId.value}`
  );

  if (error) {
    throw new Error(error);
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

watch(
  currentFilter,
  () => {
    setToDefault();
  },
  { deep: true }
);
</script>

<script>
export default {
  name: "Communities",
};
</script>
