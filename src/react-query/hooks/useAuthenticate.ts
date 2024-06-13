import UsersService from "@/services/users.service";
import { UserInfo } from "@/types/apiResponse";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../consts";

const authenticate = async (): Promise<UserInfo | null> => {
  const response = await UsersService.Authenticate();
  if (response.status === "success") {
    return response.data;
  }
  return null;
};

const useAuthenticate = () => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.AUTHENTICATE],
    authenticate
  );

  return {
    userInfo: data,
    isError,
    isLoading,
  };
};

export default useAuthenticate;
