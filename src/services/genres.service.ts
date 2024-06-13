import {
  GetAllGenresSuccessResponse,
  GetGenreDetailsSuccessResponse,
} from "@/types/apiResponse";
import baseAxios from "./axiosClient";

const baseServiceURL = "/genres";

const GenresService = {
  async GetAllGenres(): Promise<
    | {
        status: "success";
        data: GetAllGenresSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const response = (await baseAxios.get(
        baseServiceURL
      )) as GetAllGenresSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
  async GetGenreDetails(uuid: string): Promise<
    | {
        status: "success";
        data: GetGenreDetailsSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const response = (await baseAxios.get(
        `${baseServiceURL}/${uuid}`
      )) as GetGenreDetailsSuccessResponse;

      return { status: "success", data: response };
    } catch (err: any) {
      console.log(err.response.data.error);
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
};

export default GenresService;
