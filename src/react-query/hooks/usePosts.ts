import { Post } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import PostsService from "@/services/posts.service";

const getPosts = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<Post[] | null> => {
  const q = queryKey[1];
  const response = await PostsService.GetPosts(q);
  if (response.status === "success") {
    return response.data.posts;
  }
  return null;
};

const usePosts = (
  topicSlug: string | null,
  q: string = "*",
  searchMode: boolean
) => {
  const enabled =
    searchMode === false
      ? typeof topicSlug === "string" && topicSlug === "all"
      : true;
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.POSTS, q],
    getPosts,
    {
      enabled,
    }
  );

  return {
    posts: data ?? null,
    isError,
    isLoading,
  };
};

export default usePosts;
