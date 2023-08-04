<template>
  <div class="main">
    <Header />
    <div class="container">
      <div class="row gap-3 py-4">
        <Filter class="col" />
        <div @click="openFilters" class="d-flex d-md-none filters-btn">
          <IconsFilter /> Показать фильтры
        </div>
        <WorkScreen
          :section="section"
          class="col-lg-9 col-md-8 col-sm-12 col-12"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { section } = useRoute().params;

const openFilters = () => {
  const filter = document.getElementById("filter");
  filter.classList.add("show");
};
</script>

<style lang="scss">
.filters-btn {
  font-size: 1.2rem;
  text-decoration: underline;
  line-height: 25px;
  align-items: center;
  column-gap: 0.5rem;
  &:active {
    text-decoration: none;
  }
}
</style>
