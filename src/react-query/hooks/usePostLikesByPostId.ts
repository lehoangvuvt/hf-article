import { PostLike } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import PostsService from "@/services/posts.service";

const getPostLikesByPostId = async ({
  queryKey,
}: {
  queryKey: any[];
}): Promise<PostLike[] | null> => {
  const postId = queryKey[1];
  const response = await PostsService.GetPostLikesByPostId(postId);
  if (response.status === "success") {
    return response.data.post_likes;
  }
  return null;
};

const usePostLikesByPostId = (postId: number) => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.POST_LIKES_BY_POST_ID, postId],
    getPostLikesByPostId
  );

  return {
    postLikes: data ?? null,
    isError,
    isLoading,
  };
};

export default usePostLikesByPostId;
