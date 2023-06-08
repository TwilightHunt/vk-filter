import { run } from "~/utils/vk-auth";

export default defineEventHandler(async (event) => {
  try {
    const res = await run();
    return { message: res };
  } catch (error) {
    return {
      error,
    };
  }
});
