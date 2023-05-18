import { CreatePostType } from "@/types/posts";
import HTTPServices from "./HTTPServices";

class PostService extends HTTPServices {
  async updatePost(id: string, payload: CreatePostType) {
    return await this.sendRequest({
      method: "PATCH",
      url: `/post/${id}`,
      responseType: "json",
      data: payload,
    });
  }

  async createPost(payload: CreatePostType) {
    return await this.sendRequest({
      method: "POST",
      url: "/post",
      responseType: "json",
      data: payload,
    });
  }

  async getUserPosts() {
    return await this.sendRequest({
      method: "GET",
      url: "/post/user",
      responseType: "json",
    });
  }

  async getPostById(id: string) {
    return await this.sendRequest({
      method: "GET",
      url: `/post/${id}`,
      responseType: "json",
    });
  }
  async getAllPosts() {
    return await this.sendRequest({
      method: "GET",
      url: "/post",
      responseType: "json",
    });
  }
}

export const postService = new PostService();
