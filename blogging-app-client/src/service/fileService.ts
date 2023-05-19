import HTTPServices from "./HTTPServices";

class FileService extends HTTPServices {
  async upload(payload: any) {
    return await this.sendRequest({
      method: "POST",
      url: "/upload",
      responseType: "multipart/form-data",
      data: payload,
    });
  }
  async deleteImage(filename: string) {
    return await this.sendRequest({
      method: "DELETE",
      url: `/upload/${filename}`,
      responseType: "json",
    });
  }
}

export const fileService = new FileService();
