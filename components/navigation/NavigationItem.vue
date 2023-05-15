<template>
  <div class="navigation-item py-3 px-4">{{ title }}</div>
</template>

<script>
export default {
  props: {
    title: { type: String, requied: true },
  },
};
</script>

<style lang="scss" scoped>
.navigation-item {
  cursor: pointer;
}
</style>
