<template>
  <div class="user-card py-2">
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="user-card__link"
      :href="`https://vk.com/${props.userInfo.domain}`"
    >
      <img class="user-card__photo" :src="props.userInfo.photo_200" alt="" />
      <div class="user-card__text">{{ props.userInfo.first_name }}</div>
      <div class="user-card__text">{{ props.userInfo.last_name }}</div>
      <div
        v-if="countAgeByBDate(props.userInfo.bdate)"
        class="user-card__subtext"
      >
        {{ countAgeByBDate(props.userInfo.bdate) }} лет
      </div>
    </a>
  </div>
</template>

<script setup>
import { countAgeByBDate } from "@/composables/useCounters";
const props = defineProps({
  userInfo: { type: Object, required: true },
});
</script>

<style lang="scss" scoped>
.user-card {
  line-height: 160%;
  &__photo {
    border-radius: 100vh;
    width: 200px;
    height: 200px;
    margin-bottom: 1rem;
  }
  &__link {
    display: block;
    text-align: center;
  }
  &__text {
    font-size: 1.4rem;
    font-weight: 500;
  }
  &__subtext {
    opacity: 0.6;
  }
}
</style>
