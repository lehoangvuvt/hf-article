"use client";

import {
  addNewRoute,
  goBackRouteFromCurr,
  goForwardRouteFromCurr,
} from "@/redux/slices/routesHistorySlice";
import { State } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const useCustomRouter = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const routesHistorySlice = useSelector((state: State) => state.routesHistory);

  const pushRoute = (path: string) => {
    router.push(path);
  };

  const pushRouteWithHistory = (path: string) => {
    if (path !== routesHistorySlice.routes[routesHistorySlice.currRouteIndex]) {
      dispatch(addNewRoute(path));
    }
    router.push(path);
  };

  const backRoute = () => {
    const currentIndex = routesHistorySlice.currRouteIndex;
    dispatch(goBackRouteFromCurr());
    router.push(routesHistorySlice.routes[currentIndex - 1]);
  };

  const forwardRoute = () => {
    const currentIndex = routesHistorySlice.currRouteIndex;
    dispatch(goForwardRouteFromCurr());
    router.push(routesHistorySlice.routes[currentIndex + 1]);
  };

  return {
    pushRoute,
    pushRouteWithHistory,
    backRoute,
    forwardRoute,
  };
};

export default useCustomRouter;
