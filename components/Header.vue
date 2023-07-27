<template>
  <div class="header bg-black py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="header__title">VK FILTER</div>
      <nav class="header__navigation d-md-flex d-none">
        <NavigationItem
          :title="$t('communities')"
          :component="Communities"
          :filter="CommunitiesFilters"
        />
        <NavigationItem :title="$t('users')" :component="Users" />
        <NavigationItem :title="$t('posts')" :component="Posts" />
      </nav>
      <LangSwitch />
    </div>
  </div>
</template>

<script setup>
import Communities from "@/components/work-screen/sections/Communities.vue";
import Posts from "@/components/work-screen/sections/Posts.vue";
import Users from "@/components/work-screen/sections/Users.vue";
import NavigationItem from "./NavigationItem.vue";
import CommunitiesFilters from "./filters/sections/CommunitiesFilters.vue";
</script>

<style lang="scss" scoped></style>
