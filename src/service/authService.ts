import HTTPServices from "./HTTPServices";

class AuthService extends HTTPServices {
  async signUp(payload: any) {
    return await this.sendRequest({
      method: "POST",
      url: "/auth",
      responseType: "json",
      data: payload,
    });
  }

  async signIn(payload: any) {
    return await this.sendRequest({
      method: "POST",
      url: "/auth/sign-in",
      responseType: "json",
      data: payload,
    });
  }
}

export const authService = new AuthService();
