import { CallbackService } from "vk-io";
import { DirectAuthorization, officialAppCredentials } from "@vk-io/authorization";

const callbackService = new CallbackService();

const direct = new DirectAuthorization({
  callbackService,
  scope: "all",
  ...officialAppCredentials.android,
  login: process.env.LOGIN,
  password: process.env.PASSWORD,
  apiVersion: "5.131",
});

export async function run() {
  try {
    const response = await direct.run();
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
