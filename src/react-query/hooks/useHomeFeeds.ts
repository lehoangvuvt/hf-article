import { GetHomeFeedsSuccessResponse } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import HomeService from "@/services/home.service";

const getHomeFeeds = async (): Promise<GetHomeFeedsSuccessResponse | null> => {
  const response = await HomeService.GetHomeFeeds();
  if (response.status === "success") {
    return response.data;
  }
  return null;
};

const useHomeFeeds = () => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.HOME_FEEDS],
    getHomeFeeds
  );

  return {
    result: data,
    isError,
    isLoading,
  };
};

export default useHomeFeeds;
