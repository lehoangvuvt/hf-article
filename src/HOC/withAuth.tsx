"use client";

import { routes } from "@/config/routes";
import useCustomRouter from "@/hooks/useCustomRouter";
import { State } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent: React.FC) => {
  const WithAuth: React.FC = (props: any) => {
    const userSlice = useSelector((state: State) => state.user);
    const { pushRoute } = useCustomRouter();

    useEffect(() => {
      if (userSlice.userInfo) return;
      pushRoute(routes.HOME);
    }, [userSlice, pushRoute]);

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithAuth;
};

export default withAuth;
