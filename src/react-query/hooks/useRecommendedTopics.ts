import { Topic } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import TopicsService from "@/services/topics.service";

const getRecommendedTopics = async (): Promise<Topic[] | null> => {
  const response = await TopicsService.GetRecommendedTopics();
  if (response.status === "success") {
    return response.data.topics;
  }
  return null;
};

const useRecommendedTopics = () => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.RECOMMENDED_TOPICS],
    getRecommendedTopics,
    { staleTime: 15 * 60 * 1000 }
  );

  return {
    topics: data ?? null,
    isError,
    isLoading,
  };
};

export default useRecommendedTopics;
