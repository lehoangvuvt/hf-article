import { GetRelativeEpisodesSuccessResponse } from "@/types/apiResponse";
import baseAxios from "./axiosClient";

const baseServiceURL = "/relative";

const RelativeService = {
  async GetRelativeEpisodes(
    episodeNo: number,
    podcastId: number
  ): Promise<
    | {
        status: "success";
        data: GetRelativeEpisodesSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}/episodes?episodeNo=${episodeNo}&podcastId=${podcastId}`;
      const response = (await baseAxios.get(
        url
      )) as GetRelativeEpisodesSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
};

export default RelativeService;
