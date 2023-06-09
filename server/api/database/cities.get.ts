import { vk } from "~/utils/vk";

export default defineEventHandler(async (event) => {
  try {
    const cities = await vk.api.database.getCities({ country_id: 1 });

    return {
      cities: cities.items,
    };
  } catch (error) {
    return {
      error,
    };
  }
});
