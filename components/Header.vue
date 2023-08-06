<template>
  <div class="header bg-black py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="header__title">VK FILTER</div>
      <nav class="header__navigation d-md-flex d-none">
        <NavigationItem :title="$t('communities')" path="communities" />
        <NavigationItem :title="$t('users')" path="users" />
        <NavigationItem :title="$t('posts')" path="posts" />
      </nav>
      <CommonDropdown
        :options="locales"
        v-model="localeProperties"
        @onChange="switchLanguage"
        alignRight
        color="primary"
        class="d-md-block d-none"
      />
      <IconsBurger class="d-md-none d-block" @click="openMenu" />
    </div>
    <Menu ref="menu" />
  </div>
</template>

<script setup>
const switchLocalePath = useSwitchLocalePath();
const { locales, localeProperties } = useI18n();

const router = useRouter();

const switchLanguage = (option) => {
  router.push(switchLocalePath(option.code));
};

const openMenu = () => {
  const menu = document.getElementById("menu");
  menu.classList.add("show");
};
</script>

<style lang="scss" scoped></style>
