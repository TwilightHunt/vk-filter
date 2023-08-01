<template>
  <div ref="posts" class="posts p-4">
    <h3 class="section mb-4">Filter likes in posts</h3>
    <InputGroup
      :isButtonActive="!data.isShowButtonActive"
      @onInput="setToDefault"
      @onShowClicked="filter(0)"
      inputPlaceholder="https://vk.com/groupDomen?w=wall-groud-id_post-id"
      v-model="postUrl"
    />
    <div class="error-message text-danger">{{ data.errorMessage }}</div>
    <div v-if="isFetching">Loading...</div>
    <div v-else-if="data.result.length" class="posts__result">
      <div class="post-likes-count fs-4">
        Количество лайков на посте: {{ data.likesCount }}
      </div>
      <div class="post-likes-resut-header fs-4 fw-bolder mt-2 mb-1">
        Результат запроса:
      </div>
      <WorkScreenPartsResult :users="data.displayedLikes" />
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
                data.maxPage && currentPage === maxPage ? 'disabled' : ''
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

const postUrl = ref();
const isFetching = ref(false);

const data = reactive({
  result: [],
  displayedLikes: [],
  errorMessage: "",
  cities: "",
  count: 100,
  currentOffset: 0,
  currentPage: 1,
  likesCount: 0,
  maxPage: null,
  isShowButtonActive: true,
  usersForPage: 10,
});

async function filter(offset) {
  try {
    data.isShowButtonActive = false;
    isFetching.value = true;
    const likes = await fetchUsers(offset, data.count);
    data.likesCount = likes.count;
    while (
      data.result.length < data.currentPage * 10 &&
      offset < data.likesCount
    ) {
      const likes = await fetchUsers(offset, data.count);
      const response = await $fetch(`/api/users/info`, {
        method: "POST",
        body: { user_ids: likes },
      });
      let likesInfo = response.users;
      const filter = new Filter(likesInfo);
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
    const end = data.currentPage * data.usersForPage;
    const start = end - data.usersForPage;
    data.displayedLikes = data.result.slice(start, end);
    data.errorMessage = "";
    isFetching.value = false;
    data.currentOffset = offset;
    if (offset > data.likesCount) {
      data.maxPage = data.currentPage;
    }
  } catch (error) {
    console.error(error);
    data.errorMessage = error;
    isFetching.value = false;
  }
}

const fetchUsers = async (offset, count) => {
  const { likes, error } = await $fetch(
    `/api/posts/likes?url=${postUrl.value}}&offset=${offset}&count=${count}`
  );

  if (error) {
    throw new Error(error);
  }
  return likes;
};

const goToNextPage = async () => {
  data.currentPage++;
  const end = data.currentPage * data.usersForPage;
  const start = end - data.usersForPage;

  if (data.result.length < end) {
    await filter(data.currentOffset);
  } else {
    data.displayedLikes = data.result.slice(start, end);
  }
};

const goToPreviousPage = async () => {
  data.currentPage--;
  const end = data.currentPage * data.usersForPage;
  const start = end - data.usersForPage;
  data.displayedLikes = data.result.slice(start, end);
};

const setToDefault = () => {
  data.currentOffset = 0;
  data.currentPage = 1;
  data.likesCount = 0;
  data.maxPage = null;
  data.result = [];
  data.displayedLikes = [];
  if (postUrl.value) {
    data.isShowButtonActive = true;
  }
  data.errorMessage = "";
};

watch(
  currentFilter,
  () => {
    setToDefault();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
