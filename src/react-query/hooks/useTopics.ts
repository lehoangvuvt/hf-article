import { Topic } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import TopicsService from "@/services/topics.service";

const getTopics = async (): Promise<Topic[] | null> => {
  const response = await TopicsService.GetAllTopics();
  if (response.status === "success") {
    return response.data.topics;
  }
  return null;
};

const useTopics = () => {
  const { data, isError, isLoading } = useQuery([QUERY_KEYS.TOPICS], getTopics);

  return {
    topics: data,
    isError,
    isLoading,
  };
};

export default useTopics;
