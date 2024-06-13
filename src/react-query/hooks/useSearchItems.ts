import { SearchResult } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";
import SearchService from "@/services/search.service";

const getSearchItems = async ({
  queryKey,
}: {
  queryKey: any[];
}): Promise<SearchResult | null> => {
  const searchTerm = queryKey[1];
  const response = await SearchService.SearchItems(searchTerm);
  if (response.status === "success") {
    return response.data.result;
  }
  return null;
};

const useSearchItems = (searchTerm: string) => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.SEARCH_ITEMS, searchTerm],
    getSearchItems,
    { enabled: searchTerm.trim().length > 1 }
  );

  return {
    result: data,
    isError,
    isLoading,
  };
};

export default useSearchItems;
