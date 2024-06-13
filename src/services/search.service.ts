import { SearchItemsSuccessResponse } from "@/types/apiResponse";
import baseAxios from "./axiosClient";

const baseServiceURL = "/search";

const SearchService = {
  async SearchItems(q: string): Promise<
    | {
        status: "success";
        data: SearchItemsSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const url = `${baseServiceURL}/${q}`;
      const response = (await baseAxios.get(url)) as SearchItemsSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
};

export default SearchService;
