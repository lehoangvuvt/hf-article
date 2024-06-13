"use client";

import useAuthenticate from "@/react-query/hooks/useAuthenticate";
import useFavouriteItems from "@/react-query/hooks/useFavouriteItems";
import { setUserFavouriteItems, setUserInfo } from "@/redux/slices/userSlice";
import { State } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state: State) => state.user);
  const { userInfo, isLoading } = useAuthenticate();
  const { items, isLoading: isLoadingFavItems } = useFavouriteItems(
    userSlice.userInfo === null
  );

  useEffect(() => {
    if (!isLoading) {
      if (userInfo) {
        dispatch(setUserInfo(userInfo));
      } else {
        dispatch(setUserInfo(null));
      }
    }
  }, [userInfo, dispatch, isLoading]);

  useEffect(() => {
    if (!isLoadingFavItems) {
      dispatch(setUserFavouriteItems(items ?? null));
    }
  }, [items, dispatch, isLoadingFavItems]);

  return children;
};

export default AuthWrapper;
