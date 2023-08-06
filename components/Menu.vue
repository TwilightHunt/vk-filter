<template>
  <div
    v-on-click-outside="closeMenu"
    id="menu"
    class="mobile-menu bg-black d-md-none d-block"
  >
    <IconsCross class="cross" @click="closeMenu" />
    <h2>Секции:</h2>
    <NavigationItem :title="$t('communities')" path="communities" />
    <NavigationItem :title="$t('users')" path="users" />
    <NavigationItem :title="$t('posts')" path="posts" />
    <h2 class="mt-4">Язык:</h2>
    <CommonDropdown
      :options="locales"
      v-model="localeProperties"
      @onChange="switchLanguage"
      color="primary"
      large
    />
  </div>
</template>

<script setup>
import { vOnClickOutside } from "@vueuse/components";
const switchLocalePath = useSwitchLocalePath();
const { locales, localeProperties } = useI18n();

const router = useRouter();

const switchLanguage = (option) => {
  router.push(switchLocalePath(option.code));
};

const closeMenu = () => {
  const menu = document.getElementById("menu");
  menu.classList.remove("show");
};
</script>

<style lang="scss" scoped>
.mobile-menu {
  position: fixed;
  inset: 0;
  left: 10vw;
  z-index: 50;
  box-shadow: 1px 0px 45px rgba(#000000, 0.6);
  transition: 0.2s ease-in-out;
  padding: 2.1rem 2rem;
  &:not(.show) {
    box-shadow: unset;
    transform: translateX(100%);
  }
  & .navigation-item {
    font-size: 1.4rem;
    display: block;
    border-bottom: 1px solid rgba(#fff, 0.5);
  }
}
.cross {
  width: 25px;
  height: 25px;
  float: right;
}
</style>
