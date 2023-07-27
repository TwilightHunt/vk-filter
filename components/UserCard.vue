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
      <div v-if="age" class="user-card__subtext">
        {{ age }} {{ getNounForAge(age) }}
      </div>
    </a>
  </div>
</template>

<script setup>
import { countAgeByBDate } from "@/composables/useCounters";
import { getNounForAge } from "~/utils/nouns";

const props = defineProps({
  userInfo: { type: Object, required: true },
});

const age = countAgeByBDate(props.userInfo.bdate);
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
