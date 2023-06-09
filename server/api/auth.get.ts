import { run } from "~/utils/vk-auth";

export default defineEventHandler(async (event) => {
  try {
    const data = await run();
    return data;
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
});
