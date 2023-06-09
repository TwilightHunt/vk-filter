<template>
  <div class="workscreen rounded overflow-hidden bg-black">
    <component :is="currentSection ?? Communities" />
  </div>
</template>

<script setup>
import Communities from "./sections/Communities.vue";
import Posts from "./sections/Posts.vue";
import Users from "./sections/Users.vue";
import { currentSection } from "~/composables/useNavigation";
</script>

<style lang="scss" scoped>
.workscreen {
  height: 80vh;
  overflow-y: scroll;
}
</style>
