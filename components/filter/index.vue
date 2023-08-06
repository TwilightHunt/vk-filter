<template>
  <div id="filter" class="filters p-md-4 col rounded bg-black">
    <div v-if="currentFilter">
      <div class="filter-dropdown">
        <div class="filter-dropdown__title fs-5">Пол:</div>
        <CommonDropdown
          :options="genders"
          v-model="currentFilter.sex"
          class="mb-3 filter-dropdown"
        />
      </div>
      <div class="filter-dropdown">
        <div class="filter-dropdown__title fs-5">Город:</div>
        <CommonDropdown
          :options="data.cities"
          v-model="currentFilter.city"
          class="mb-3 filter-dropdown"
        />
      </div>
      <div>
        <div class="fs-5 mb-3">Возраст:</div>
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
    <IconsCross @click="closeFilter" class="cross d-md-none d-block" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useFilterStore } from "@/store/filter";
import { genders } from "~/types/filters";
const store = useFilterStore();
const { currentFilter } = storeToRefs(store);
import { age } from "~/utils/maska/age.js";

const closeFilter = () => {
  const filter = document.getElementById("filter");
  filter.classList.remove("show");
};

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

<style lang="scss" scoped>
.filter {
  min-height: 80vh;
}

.filter-dropdown {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: baseline;
}

.cross {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .filters {
    position: fixed;
    inset: 0;
    z-index: 100;
    padding: 2rem;
    padding-top: 40px;
    transition: 0.3s ease-in-out;
    transform: translateX(100%);
    &.show {
      transform: translateX(0);
    }
    & .filter-dropdown {
      display: block;
      &__title {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
