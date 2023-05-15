<template>
  <div class="auth">
    <div class="auth-content">
      <img src="~/assets/images/icons8-vk-500.png" alt="" />
      <div class="auth-warning">
        Для корректной работы приложению необходимы некоторые данные вашего аккаунта ВКонтакте
      </div>
      <button @click="auth" class="auth-button btn bg-black text-white">Войти</button>
    </div>
  </div>
</template>

<script setup>
const auth = () => {
  const runtimeConfig = useRuntimeConfig();
  const AUTH_URI = `https://oauth.vk.com/authorize?client_id=${runtimeConfig.app_id}&scope=notify,photos,friends,audio,video,notes,pages,docs,status,questions,offers,wall,groups,stats,offline&redirect_uri=${runtimeConfig.base_url}&display=page&response_type=token`;
  window.location.replace(AUTH_URI);
};
</script>

<style lang="scss" scoped>
.auth {
  display: grid;
  place-content: center;
  height: 100lvh;
  text-align: center;
  font-size: 1.2em;
}
.auth-warning {
  margin: 1em 0;
}
.auth-content {
  max-width: 500px;
}
.auth-button {
  font-weight: 600;
}
</style>
