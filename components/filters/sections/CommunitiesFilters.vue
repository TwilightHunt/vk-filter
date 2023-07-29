<template>
  <div class="community-filters" v-if="currentFilter">
    <div class="filter-dropdown">
      <div class="filter-dropdown__title">Пол:</div>
      <CommonDropdown
        :options="genders"
        v-model="currentFilter.sex"
        class="mb-3 filter-dropdown"
      />
    </div>
    <div class="filter-dropdown">
      <div class="filter-dropdown__title">Город:</div>
      <CommonDropdown
        :options="data.cities"
        v-model="currentFilter.city"
        class="mb-3 filter-dropdown"
      />
    </div>
    <div>
      <div class="fs-5 mb-3">Возраст</div>
      <span class="me-2">От: </span>
      <input
        type="text"
        v-maska:[age]
        data-maska="###"
        v-model="currentFilter.min_age"
        class="age-input"
      />
      <span class="me-2 ms-5">До: </span>
      <input
        type="text"
        v-maska:[age]
        data-maska="###"
        v-model="currentFilter.max_age"
        class="age-input"
      />
    </div>
    <div class="mt-3">
      <CommonCheckbox
        label="Скрывать удаленные аккаунты"
        v-model="currentFilter.isSkipDeleted"
      />
      <CommonCheckbox
        label="Скрывать закрытые аккаунты"
        v-model="currentFilter.isSkipClosed"
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
import { age } from "~/utils/maska/age.js";

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

<style lang="scss">
.filter-dropdown {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: baseline;
}
</style>
