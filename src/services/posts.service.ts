import {
  CreatePostSuccessResponse,
  GetCommentsByPostIdSuccessResponse,
  GetPostDetailsSuccessResponse,
  GetPostLikesByPostIdSuccessResponse,
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
  async GetPostLikesByPostId(postId: number): Promise<
    | {
        status: "success";
        data: GetPostLikesByPostIdSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}/likes/${postId}`;
      const response = (await baseAxios.get(
        url
      )) as GetPostLikesByPostIdSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async LikePost(postId: number): Promise<
    | {
        status: "success";
        data: { message: string };
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}/likes/${postId}`;
      const response = (await baseAxios.put(url, null, {
        withCredentials: true,
      })) as { message: string };
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async UnlikePost(postId: number): Promise<
    | {
        status: "success";
        data: { message: string };
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}/likes/${postId}`;
      const response = (await baseAxios.delete(url, {
        withCredentials: true,
      })) as { message: string };
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async CommentToPost(data: {
    postId: number;
    content: string;
    replyToCommentId: number;
  }): Promise<
    | {
        status: "success";
        data: { message: string };
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}/comments/${data.postId}`;
      const response = (await baseAxios.post(
        url,
        {
          content: data.content,
          reply_to_comment_id: data.replyToCommentId,
        },
        {
          withCredentials: true,
        }
      )) as { message: string };
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async GetCommentsByPostId(postId: number): Promise<
    | {
        status: "success";
        data: GetCommentsByPostIdSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}/comments/${postId}`;
      const response = (await baseAxios.get(
        url
      )) as GetCommentsByPostIdSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
};

export default PostsService;

//
// router.HandlerFunc(http.MethodPut, "/posts/likes/:id", app.AuthGuard(app.likePostHandler))
// router.HandlerFunc(http.MethodDelete, "/posts/likes/:id", app.AuthGuard(app.unlikePostHandler))
