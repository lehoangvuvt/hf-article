"use client";

import { routes } from "@/config/routes";
import useCustomRouter from "@/hooks/useCustomRouter";
import { State } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const noAuth = (WrappedComponent: React.FC) => {
  const NoAuth: React.FC = (props: any) => {
    const { pushRoute } = useCustomRouter();
    const userSlice = useSelector((state: State) => state.user);

    useEffect(() => {
      if (userSlice.userInfo) {
        pushRoute(routes.HOME);
      }
    }, [userSlice, pushRoute]);
    if (userSlice.userInfo) return null;
    return <WrappedComponent {...props} />;
  };

  NoAuth.displayName = `noAuth(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return NoAuth;
};

export default noAuth;
