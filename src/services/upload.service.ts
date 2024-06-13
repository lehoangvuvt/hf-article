import { UploadFileSuccessResponse } from "@/types/apiResponse";
import baseAxios from "./axiosClient";

const baseServiceURL = "/upload";

const UploadService = {
  async UploadFile(data: {
    base64: string;
    file_type: string;
    file_name: string;
  }): Promise<
    | {
        status: "success";
        data: UploadFileSuccessResponse;
      }
    | {
        status: "fail";
        errorMsg: string;
      }
  > {
    try {
      const response = (await baseAxios.post(baseServiceURL, data, {
        withCredentials: true,
      })) as UploadFileSuccessResponse;
      return { status: "success", data: response };
    } catch (err: any) {
      return { status: "fail", errorMsg: err.response.data.error };
    }
  },
};

export default UploadService;
