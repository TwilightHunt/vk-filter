import { VK } from "vk-io";
const config = useRuntimeConfig();

export const vk = new VK({
  token: config.public.token,
});
