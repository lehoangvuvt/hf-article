import { Podcast } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import PodcastsService from "@/services/podcasts.service";

const getPodcasts = async (): Promise<Podcast[] | null> => {
  const response = await PodcastsService.GetAllPodcasts();
  if (response.status === "success") {
    return response.data.podcasts;
  }
  return null;
};

const usePodcasts = (enabled: boolean) => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.PODCASTS],
    getPodcasts,
    {
      enabled,
    }
  );

  return {
    podcasts: data,
    isError,
    isLoading,
  };
};

export default usePodcasts;
