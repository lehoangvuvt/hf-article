import {
  GetPostsSuccessResponse,
  GetTopicsSuccessResponse,
} from "@/types/apiResponse";
import baseAxios from "./axiosClient";

const baseServiceURL = "/topics";

const TopicsService = {
  async GetAllTopics(): Promise<
    | {
        status: "success";
        data: GetTopicsSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const response = (await baseAxios.get(
        baseServiceURL
      )) as GetTopicsSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async SearchTopicsByName(q: string): Promise<
    | {
        status: "success";
        data: GetTopicsSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const response = (await baseAxios.get(
        `${baseServiceURL}/search/${q}`
      )) as GetTopicsSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async GetPostsByTopic(
    topicSlug: string,
    page: number = 0,
    take: number = 5
  ): Promise<
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
      const response = (await baseAxios.get(
        `${baseServiceURL}/posts?slug=${topicSlug}&take=${take}&page=${page}`
      )) as GetPostsSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async GetRelativeTopics(slug: string): Promise<
    | {
        status: "success";
        data: GetTopicsSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const response = (await baseAxios.get(
        `${baseServiceURL}/relative/${slug}`
      )) as GetTopicsSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async GetRecommendedTopics(): Promise<
    | {
        status: "success";
        data: GetTopicsSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const response = (await baseAxios.get(
        `${baseServiceURL}/recommended`
      )) as GetTopicsSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
};

export default TopicsService;
