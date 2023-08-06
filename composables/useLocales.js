const switchLocalePath = useSwitchLocalePath();
const router = useRouter();

export const switchLanguage = (option) => {
  router.push(switchLocalePath(option.code));
};
