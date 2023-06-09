import { vk } from "~/utils/vk";

export default defineEventHandler(async (event) => {
  try {
    const { group_id, offset, count } = getQuery(event);

    const members = await vk.api.groups.getMembers({
      group_id: group_id as string,
      offset: offset as number,
      count: count as number,
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
