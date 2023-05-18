import HTTPServices from "./HTTPServices";

class UploadFileService extends HTTPServices {
  async upload(payload: any) {
    return await this.sendRequest({
      method: "POST",
      url: "/upload",
      responseType: "multipart/form-data",
      data: payload,
    });
  }
}

export const uploadFileService = new UploadFileService();
