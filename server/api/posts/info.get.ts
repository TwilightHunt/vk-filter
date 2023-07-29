import { vk } from "~/utils/vk";

export default defineEventHandler(async (event) => {
  try {
    const { url } = getQuery(event);

    if (!url) {
      throw new Error("Link is not specified");
    }

    const regex = /(-?\d+_\d+)/;
    const matches = url.toString().match(regex);

    if (matches) {
      const [owner_id, item_id] = matches[0].toString().split("_");

      const likes = await vk.api.likes.getList({
        type: "post",
        item_id: parseInt(item_id),
        owner_id: parseInt(owner_id),
        filter: "likes",
        extended: 1,
      });
      return {
        likes,
      };
    } else {
      throw new Error("Invalid link");
    }
  } catch (error) {
    return {
      error,
    };
  }
});
