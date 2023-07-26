export const currentSection = ref();
export const currentFilter = ref();

export const setCurrentSection = (section, filter) => {
  currentSection.value = section;
  currentFilter.value = filter;
};
