import { GetEpisodeDetailsSuccessResponse } from "@/types/apiResponse";
import baseAxios from "./axiosClient";

const baseServiceURL = "/episodes";

const EpisodesSevice = {
  async GetEpisodeDetails(uuid: string): Promise<
    | {
        status: "success";
        data: GetEpisodeDetailsSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const response = (await baseAxios.get(
        `${baseServiceURL}/${uuid}`
      )) as GetEpisodeDetailsSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
};

export default EpisodesSevice;
