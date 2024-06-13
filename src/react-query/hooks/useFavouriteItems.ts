import UsersService from "@/services/users.service";
import { UserFavouriteItems } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";

const getFavouriteItems = async (): Promise<UserFavouriteItems | null> => {
  const response = await UsersService.GetUserFavouriteItems();
  if (response.status === "success") {
    return response.data;
  }
  return null;
};

const useFavouriteItems = (enabled: boolean) => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.FAVOURITE_ITEMS],
    getFavouriteItems,
    {
      enabled,
    }
  );

  return {
    items: data,
    isError,
    isLoading,
  };
};

export default useFavouriteItems;
