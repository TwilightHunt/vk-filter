<template>
  <NuxtLink v-for="{ code, name } in locales" class="" :key="code" :to="switchLocalePath(code)">{{
    name
  }}</NuxtLink>
</template>

<script setup>
const switchLocalePath = useSwitchLocalePath();
const { locale, locales } = useI18n();
</script>

<style lang="scss" scoped></style>
