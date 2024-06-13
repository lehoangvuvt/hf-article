"use client";

import useCustomRouter from "@/hooks/useCustomRouter";
import { addNewRoute } from "@/redux/slices/routesHistorySlice";
import { State } from "@/redux/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function RoutesHandler() {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const routesHistorySlice = useSelector((state: State) => state.routesHistory);
  const { backRoute, forwardRoute } = useCustomRouter();

  useEffect(() => {
    if (routesHistorySlice.currRouteIndex === -1) {
      dispatch(addNewRoute(pathName));
    }
  }, [pathName, routesHistorySlice, dispatch]);

  const buttonCSSClass = twMerge(
    "rounded-full",
    "bg-[rgba(0,0,0,0.8)]",
    "w-[38px]",
    "h-[38px]",
    "flex",
    "items-center",
    "justify-center",
    "text-[white]",
    "text-[18px]",
    "disabled:text-[rgba(255,255,255,0.6)]",
    "disabled:cursor-not-allowed"
  );

  return (
    <div className="relative  flex flex-row h-[45px] items-center justify-start text-[white] px-[20px] gap-[10px]">
      <button
        onClick={backRoute}
        disabled={routesHistorySlice.currRouteIndex <= 0}
        className={buttonCSSClass}
      >
        <ArrowBackIosNewIcon fontSize="inherit" />
      </button>
      <button
        onClick={forwardRoute}
        disabled={
          routesHistorySlice.currRouteIndex ===
          routesHistorySlice.routes.length - 1
        }
        className={buttonCSSClass}
      >
        <ArrowBackIosNewIcon
          fontSize="inherit"
          style={{
            transform: "rotate(180deg)",
          }}
        />
      </button>
    </div>
  );
}
