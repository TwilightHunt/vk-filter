<template>
  <div
    class="navigation-item py-3 px-4"
    @click="setCurrentSection(component, filter)"
  >
    {{ title }}
  </div>
</template>

<script>
import { setCurrentSection } from "~/composables/useNavigation";

export default {
  props: {
    title: { type: String, requied: true },
    component: { requied: true },
    filter: { requied: true },
  },
};
</script>

<style lang="scss" scoped>
.navigation-item {
  cursor: pointer;
}
</style>
