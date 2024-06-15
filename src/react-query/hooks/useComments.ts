import { Comment } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import PostsService from "@/services/posts.service";

const getComments = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<Comment[] | null> => {
  const postId = queryKey[1];
  const response = await PostsService.GetCommentsByPostId(postId);
  if (response.status === "success") {
    return response.data.comments;
  }
  return null;
};

const useComments = (postId: number) => {
  // alert(true);
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.COMMENTS, postId],
    getComments,
    {
      enabled: !!postId,
    }
  );

  return {
    comments: data ?? null,
    isError,
    isLoading,
  };
};

export default useComments;
