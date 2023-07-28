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
      <CommonDropdown
        :options="locales"
        v-model="localeProperties"
        @onChange="switchLanguage"
      />
    </div>
  </div>
</template>

<script setup>
import Communities from "@/components/work-screen/sections/Communities.vue";
import Posts from "@/components/work-screen/sections/Posts.vue";
import Users from "@/components/work-screen/sections/Users.vue";
import CommunitiesFilters from "./filters/sections/CommunitiesFilters.vue";

const switchLocalePath = useSwitchLocalePath();
const { locales, localeProperties } = useI18n();

const router = useRouter();

const switchLanguage = (option) => {
  router.push(switchLocalePath(option.code));
};
</script>

<style lang="scss" scoped></style>
