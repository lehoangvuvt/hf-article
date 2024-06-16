import { GetPostsSuccessResponse, Post } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import PostsService from "@/services/posts.service";

const getPosts = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<GetPostsSuccessResponse | null> => {
  const q = queryKey[1];
  const start = queryKey[2];
  const end = queryKey[3];
  const response = await PostsService.GetPosts(q, start, end);
  if (response.status === "success") {
    return response.data;
  }
  return null;
};

const usePosts = (
  topicSlug: string | null,
  q: string = "*",
  searchMode: boolean,
  start: number = -1,
  end: number = -1
) => {
  const enabled =
    searchMode === false
      ? typeof topicSlug === "string" && topicSlug === "all"
      : true;
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.POSTS, q, start, end],
    getPosts,
    {
      enabled,
    }
  );

  return {
    data: data ?? null,
    isError,
    isLoading,
  };
};

export default usePosts;
