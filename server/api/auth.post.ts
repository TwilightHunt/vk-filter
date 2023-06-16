import Auth from "~/utils/vk-auth";

export default defineEventHandler(async (event) => {
  try {
    const { login, password } = await readBody(event);
    if (!login || !password) {
      throw new Error("SyntaxError: Login or password is not specified");
    }
    const auth = new Auth(login, password);
    const data = await auth.runAuth();
    return data;
  } catch (error) {
    throw error;
  }
});
