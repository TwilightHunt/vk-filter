const switchLocalePath = useSwitchLocalePath();
const router = useRouter();

const switchLanguage = (option) => {
  router.push(switchLocalePath(option.code));
};
