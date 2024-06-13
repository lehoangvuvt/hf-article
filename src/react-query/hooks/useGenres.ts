import { Genre } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import GenresService from "@/services/genres.service";

const getAllGenres = async (): Promise<Genre[] | null> => {
  const response = await GenresService.GetAllGenres();
  if (response.status === "success") {
    return response.data.genres;
  }
  return null;
};

const useGenres = () => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.GENRES],
    getAllGenres,
    { staleTime: 60 * 60 * 1000 }
  );

  return {
    genres: data,
    isError,
    isLoading,
  };
};

export default useGenres;
