import axios, { AxiosInstance } from "axios";

class HTTPServices {
  service: AxiosInstance | null = null;
  constructor() {
    this.service = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
    this.service.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );
  }

  sendRequest = (config: any) => {
    config.headers = {
      Authorization: `Bearer ${window?.localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
    return this.service?.request(config);
  };

  uploadRequest = (config: any) => {
    //TODO :File upload  request
    config.headers = {
      Authorization: `Bearer ${window?.localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "",
    };
    return this.service?.request(config);
  };

  handleSuccess = (res: any) => {
    return res;
  };

  handleError = (e: any) => {
    if (!e.response) {
      return {
        data: {
          success: false,
          message: "Network Failure",
        },
      };
    }

    switch (e.response.status) {
      default:
        throw e;
    }
  };
}

export default HTTPServices;
