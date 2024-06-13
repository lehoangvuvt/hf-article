import { Topic } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import TopicsService from "@/services/topics.service";

const searchTopics = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<Topic[] | null> => {
  const q = queryKey[1];
  const response = await TopicsService.SearchTopicsByName(q);
  if (response.status === "success") {
    return response.data.topics;
  }
  return null;
};

const useSearchTopics = (q: string, enabled: boolean) => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.S_TOPICS, q],
    searchTopics,
    {
      enabled: q && q.trim().length > 0 && enabled ? true : false,
    }
  );

  return {
    topics: data ?? null,
    isError,
    isLoading,
  };
};

export default useSearchTopics;
