<template>
  <div class="navigation rounded bg-black">
    <NavigationItem :title="'Сообщества'" :component="Communities" />
    <NavigationItem :title="'Пользователи'" :component="Users" />
    <NavigationItem :title="'Посты'" :component="Posts" />
  </div>
</template>

<script setup>
import Communities from "../work-screen/sections/Communities.vue";
import Posts from "../work-screen/sections/Posts.vue";
import Users from "../work-screen/sections/Users.vue";
</script>

<style lang="scss" scoped></style>
