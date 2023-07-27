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
  } catch (error: any) {
    let errorMessage = "";

    if (error.code === 100) {
      errorMessage = "Неверный формат id";
    } else if (error.code === 203) {
      errorMessage = "Доступ к сообществу запрещен";
    }

    return {
      error: errorMessage || error.message,
    };
  }
});
