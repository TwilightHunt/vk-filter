import { vk } from "~/utils/vk";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const user = await vk.api.users.get({
      user_ids: [query.user_id],
    });
    return {
      user,
    };
  } catch (error) {
    return {
      error,
    };
  }
});
