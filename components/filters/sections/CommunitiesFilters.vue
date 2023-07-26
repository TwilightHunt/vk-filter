<template>
  <div class="community-filters" v-if="currentFilter">
    <FilterDropdown
      filter="Пол"
      :options="genders"
      :default="currentFilter.sex"
      class="mb-3"
    />
    <FilterDropdown
      filter="Город"
      :options="data.cities"
      :default="currentFilter.city"
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
        v-model="currentFilter.max_age"
      />
      <span class="me-2 ms-5">До: </span>
      <input
        type="number"
        min="1"
        max="99"
        maxlength="2"
        v-model="currentFilter.min_age"
      />
    </div>
    <div class="mt-3">
      <CommonCheckbox
        label="Скрывать удаленные аккаунты"
        v-model="currentFilter.isSkipDeleted"
        @change="setToDefault"
      />
      <CommonCheckbox
        label="Скрывать закрытые аккаунты"
        v-model="currentFilter.isSkipClosed"
        @change="setToDefault"
      />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useFilterStore } from "@/store/filter";
import { genders } from "~/types/filters";
const store = useFilterStore();
const { currentFilter } = storeToRefs(store);

const baseFilter = {
  sex: { id: 0, title: "Любой" },
  max_age: null,
  min_age: null,
  city: { id: 0, title: "Любой" },
  isSkipDeleted: true,
  isSkipClosed: false,
};

const data = reactive({
  cities: "",
});

onMounted(async () => {
  store.setCurrentFilter(baseFilter);
  data.cities = await store.getCitiesFromDatabase();
});
</script>
