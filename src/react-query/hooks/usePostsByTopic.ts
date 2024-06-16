import { GetPostsSuccessResponse, Post } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import TopicsService from "@/services/topics.service";

const getPostsByTopic = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<GetPostsSuccessResponse | null> => {
  const topicSlug = queryKey[1];
  const page = queryKey[2];
  const response = await TopicsService.GetPostsByTopic(topicSlug, page);
  if (response.status === "success") {
    return response.data;
  }
  return null;
};

const usePostsByTopic = (topicSlug: string | null, page: number = 0) => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.POSTS_BY_TOPIC, topicSlug, page],
    getPostsByTopic,
    {
      enabled: typeof topicSlug === "string" && topicSlug !== "all",
    }
  );

  return {
    data: data ?? null,
    isError,
    isLoading,
  };
};

export default usePostsByTopic;
