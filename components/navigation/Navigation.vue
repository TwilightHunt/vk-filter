<template>
  <div class="navigation rounded bg-black">
    <NavigationItem :title="$t('communities')" :component="Communities" />
    <NavigationItem :title="$t('users')" :component="Users" />
    <NavigationItem :title="$t('posts')" :component="Posts" />
  </div>
</template>

<script setup>
import Communities from "../work-screen/sections/Communities.vue";
import Posts from "../work-screen/sections/Posts.vue";
import Users from "../work-screen/sections/Users.vue";
</script>

<style lang="scss" scoped></style>
