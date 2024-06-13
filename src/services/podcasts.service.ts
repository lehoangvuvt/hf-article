import {
  GetAllPodcastsSuccessResponse,
  GetPodcastDetailsSuccessResponse,
} from "@/types/apiResponse";
import baseAxios from "./axiosClient";

const baseServiceURL = "/podcasts";

const PodcastsService = {
  async GetAllPodcasts(): Promise<
    | {
        status: "success";
        data: GetAllPodcastsSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const response = (await baseAxios.get(
        baseServiceURL
      )) as GetAllPodcastsSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async GetPodcastDetails(uuid: string): Promise<
    | {
        status: "success";
        data: GetPodcastDetailsSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const response = (await baseAxios.get(
        `${baseServiceURL}/${uuid}`
      )) as GetPodcastDetailsSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
};

export default PodcastsService;
