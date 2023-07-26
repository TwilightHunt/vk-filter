import { defineStore } from "pinia";
import { IFilters } from "~/types/filters";

export const useFilterStore = defineStore("filter", () => {
  const currentFilter = ref<IFilters>();
  const cities = ref();

  const setCurrentFilter = (filter: IFilters) => {
    currentFilter.value = filter;
  };

  const getCitiesFromDatabase = async () => {
    if (!cities.value) {
      const res: any = await $fetch("/api/database/cities");
      cities.value = [
        { id: 0, title: "Любой" },
        ...res.cities,
        { id: -1, title: "Другой..." },
      ];
    }
    return cities.value;
  };

  return { currentFilter, setCurrentFilter, getCitiesFromDatabase };
});
