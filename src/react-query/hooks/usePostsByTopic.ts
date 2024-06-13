import { Post } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import TopicsService from "@/services/topics.service";

const getPostsByTopic = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<Post[] | null> => {
  const topicSlug = queryKey[1];
  const response = await TopicsService.GetPostsByTopic(topicSlug);
  if (response.status === "success") {
    return response.data.posts;
  }
  return null;
};

const usePostsByTopic = (topicSlug: string | null) => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.POSTS_BY_TOPIC, topicSlug],
    getPostsByTopic,
    {
      enabled: typeof topicSlug === "string" && topicSlug !== "all",
    }
  );

  return {
    posts: data,
    isError,
    isLoading,
  };
};

export default usePostsByTopic;
