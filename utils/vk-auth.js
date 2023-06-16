import { CallbackService } from "vk-io";
import { DirectAuthorization, officialAppCredentials } from "@vk-io/authorization";

const callbackService = new CallbackService();

export default class vkAuth {
  constructor(login, password) {
    this.login = login;
    this.password = password;
  }

  async runAuth() {
    try {
      const direct = new DirectAuthorization({
        callbackService,
        scope: "all",
        ...officialAppCredentials.android,
        login: this.login,
        password: this.password,
        apiVersion: "5.131",
      });

      const response = await direct.run();

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
