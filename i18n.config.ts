export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      welcome: "Welcome",
      communities: "Communities",
      posts: "Posts",
      users: "Users",
    },
    ru: {
      welcome: "Добро пожаловать",
      communities: "Сообщества",
      posts: "Посты",
      users: "Пользователи",
    },
  },
}));
