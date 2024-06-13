import { PodcastEpisodeDetails } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import RelativeService from "@/services/relative.service";

const getRelativeEpisodes = async ({
  queryKey,
}: {
  queryKey: any[];
}): Promise<PodcastEpisodeDetails[] | null> => {
  console.log(queryKey);
  const episodeNo = queryKey[1];
  const podcastId = queryKey[2];
  const response = await RelativeService.GetRelativeEpisodes(
    episodeNo,
    podcastId
  );
  if (response.status === "success") {
    return response.data.episodes;
  }
  return null;
};

const useRelativeEpisodes = (episodeNo: number, podcastId: number) => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.RELATIVE_EPISODES, episodeNo, podcastId],
    getRelativeEpisodes,
    { enabled: !!episodeNo && !!podcastId, staleTime: 30 * 60 * 1000 }
  );

  return {
    episodes: data,
    isError,
    isLoading,
  };
};

export default useRelativeEpisodes;
