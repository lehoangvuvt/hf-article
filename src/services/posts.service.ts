import {
  CreatePostSuccessResponse,
  GetPostDetailsSuccessResponse,
  GetPostsSuccessResponse,
} from "@/types/apiResponse";
import baseAxios from "./axiosClient";

const baseServiceURL = "/posts";

const PostsService = {
  async GetPosts(q: string = "*"): Promise<
    | {
        status: "success";
        data: GetPostsSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}/search/${q}`;
      const response = (await baseAxios.get(url)) as GetPostsSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async CreatePost(data: {
    title: string;
    short_content: string;
    thumbnail_url: string;
    content: string;
    topics: Array<{ id: number; name: string }>;
  }): Promise<
    | {
        status: "success";
        data: CreatePostSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}`;
      const response = (await baseAxios.post(url, data, {
        withCredentials: true,
      })) as CreatePostSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async GetPostDetails(slug: string): Promise<
    | {
        status: "success";
        data: GetPostDetailsSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseServiceURL}/post/${slug}`;
      const response = await fetch(url);
      const json = await response.json();
      return { status: "success", data: json };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
};

export default PostsService;
