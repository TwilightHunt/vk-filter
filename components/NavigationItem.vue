<template>
  <nuxt-link :to="path" class="navigation-item py-3 px-4">
    {{ title }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: { type: String, requied: true },
    path: { type: String, requied: true },
  },
};
</script>

<style lang="scss" scoped>
.navigation-item {
  cursor: pointer;
}
</style>
