<template>
  <div class="workscreen p-4 rounded overflow-hidden bg-black">
    <h3 class="section mb-4">{{ currentSection.sectionTitle }}</h3>
    <InputGroup
      :isButtonActive="!data.isShowButtonActive"
      @onInput="setToDefault"
      @onShowClicked="filter(0)"
      :inputPlaceholder="currentSection.sectionPlaceholder"
      v-model="userInput"
    />
    <div class="error-message text-danger">{{ data.errorMessage }}</div>
    <div v-if="isFetching">Loading...</div>
    <div v-else-if="data.result.length" class="communities__result">
      <div class="community-users-count fs-4">
        Количество участников: {{ data.usersCount }}
      </div>
      <div class="community-users-resut-header fs-4 fw-bolder mt-2 mb-1">
        Результат запроса:
      </div>
      <WorkScreenPartsResult :users="data.displayedUsers" />
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
import { currentSection, setCurrentSection } from "~/composables/useNavigation";

const props = defineProps({
  section: String,
});

onMounted(() => {
  setCurrentSection(props.section);
});

const data = reactive({
  cities: "",
  result: [],
  displayedUsers: [],
  errorMessage: "",
  count: 10,
  currentOffset: 0,
  currentPage: 1,
  usersCount: 0,
  maxPage: null,
  isShowButtonActive: false,
});

import { Filter } from "~/utils/filters";
import { storeToRefs } from "pinia";
import { useFilterStore } from "@/store/filter";
import InputGroup from "./parts/InputGroup.vue";

const store = useFilterStore();
const { currentFilter } = storeToRefs(store);

const userInput = ref();
const isFetching = ref(false);

const setToDefault = () => {
  data.currentOffset = 0;
  data.currentPage = 1;
  data.usersCount = 0;
  data.maxPage = null;
  data.result = [];
  data.displayedUsers = [];
  if (userInput.value) {
    data.isShowButtonActive = true;
  }
  data.errorMessage = "";
};

async function filter(offset) {
  try {
    data.isShowButtonActive = false;
    isFetching.value = true;
    const users = await fetchUsers(offset, data.count);
    data.usersCount = users.count;

    const { sex, city, max_age, min_age, isSkipClosed, isSkipDeleted } =
      currentFilter.value;

    while (
      data.result.length < data.currentPage * 10 &&
      offset < data.usersCount
    ) {
      const users = await fetchUsers(offset, data.count);

      const response = await $fetch(`/api/users/info`, {
        method: "POST",
        body: { user_ids: users },
      });

      let usersInfo = response.users;
      const filter = new Filter(usersInfo);

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
    data.displayedUsers = data.result.slice(start, end);
    data.errorMessage = "";
    isFetching.value = false;
    data.currentOffset = offset;
    if (offset > data.usersCount) {
      data.maxPage = data.currentPage;
    }
  } catch (error) {
    console.log(error);
    data.errorMessage = error;
    isFetching.value = false;
  }
}

const fetchUsers = async (offset, count) => {
  const { users, error } = await $fetch(
    `${currentSection.value.fetchUrl}${userInput.value}&offset=${offset}&count=${count}`
  );

  if (error) {
    console.log(error);
    throw new Error(error);
  }
  return users;
};

const goToNextPage = async () => {
  data.currentPage++;
  const end = data.currentPage * data.count;
  const start = end - data.count;

  if (data.result.length < end) {
    await filter(data.currentOffset);
  } else {
    data.displayedUsers = data.result.slice(start, end);
  }
};

const goToPreviousPage = async () => {
  data.currentPage--;
  const end = data.currentPage * data.count;
  const start = end - data.count;
  data.displayedUsers = data.result.slice(start, end);
};

watch(
  currentFilter,
  () => {
    setToDefault();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.workscreen {
  min-height: 80vh;
  overflow-y: scroll;
}
</style>
