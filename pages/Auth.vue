<template>
  <div class="auth">
    <button @click="auth" class="auth-button">AUTH</button>
  </div>
</template>

<script setup>
const auth = () => {
  console.log("auth");
  const runtimeConfig = useRuntimeConfig();
  const AUTH_URI = `https://oauth.vk.com/authorize?client_id=${runtimeConfig.app_id}&scope=notify,photos,friends,audio,video,notes,pages,docs,status,questions,offers,wall,groups,stats,offline&redirect_uri=${runtimeConfig.base_url}&display=page&response_type=token`;
  window.location.replace(AUTH_URI);
};
</script>

<style lang="scss" scoped></style>
