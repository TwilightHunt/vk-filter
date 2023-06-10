import { vk } from "~/utils/vk";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const users = await vk.api.users.get({
      user_ids: body.user_ids.items,
      fields: ["sex", "bdate", "city", "language", "domain", "music", "interests"],
    });
    return {
      users,
    };
  } catch (error) {
    return {
      error,
    };
  }
});
