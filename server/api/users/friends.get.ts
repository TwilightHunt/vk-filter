import { vk } from "~/utils/vk";

export default defineEventHandler(async (event) => {
  try {
    const { id, offset, count } = getQuery(event);
    const users = await vk.api.friends.get({
      user_id: parseInt(id as string),
      offset: parseInt(offset as string),
      count: parseInt(count as string),
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
