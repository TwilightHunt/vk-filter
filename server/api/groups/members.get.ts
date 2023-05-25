import { vk } from "~/utils/vk";

export default defineEventHandler(async (event) => {
  try {
    const { group_id } = getQuery(event);

    const members = await vk.api.groups.getMembers({
      group_id: group_id as string,
      count: 100,
    });
    return {
      members,
    };
  } catch (error) {
    return {
      error,
    };
  }
});
