import { Topic } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import TopicsService from "@/services/topics.service";

const getRelativeTopics = async ({
  queryKey,
}: {
  queryKey: any[];
}): Promise<Topic[] | null> => {
  const topicSlug = queryKey[1];
  const response = await TopicsService.GetRelativeTopics(topicSlug);
  if (response.status === "success") {
    return response.data.topics;
  }
  return null;
};

const useRelativeTopics = (topicSlug: string) => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.RELATIVE_TOPICS, topicSlug],
    getRelativeTopics,
    { enabled: !!topicSlug, staleTime: 15 * 60 * 1000 }
  );

  return {
    topics: data,
    isError,
    isLoading,
  };
};

export default useRelativeTopics;
