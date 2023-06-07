export default defineEventHandler(async (event) => {
  try {
    return { message: "auth" };
  } catch (error) {
    return {
      error,
    };
  }
});
