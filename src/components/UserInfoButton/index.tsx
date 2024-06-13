"use client";

import useCustomRouter from "@/hooks/useCustomRouter";
import { twMerge } from "tailwind-merge";
import { Popover } from "react-tiny-popover";
import { useState } from "react";
import UsersService from "@/services/users.service";
import AuthConditionalRenderWrapper from "@/middlewares/authConditionalRenderWrapper";

const UserInfoButton = () => {
  const { pushRouteWithHistory } = useCustomRouter();
  const [isOpenPopover, setOpenPopover] = useState(false);

  const handleLogout = async () => {
    await UsersService.Invalidate();
    window.location.reload();
  };

  return (
    <div>
      <AuthConditionalRenderWrapper required>
        <Popover
          containerStyle={{
            zIndex: "101",
          }}
          onClickOutside={() => setOpenPopover(false)}
          isOpen={isOpenPopover}
          positions={["bottom"]}
          content={
            <div
              className={twMerge(
                "bg-[#282828] w-[200px] rounded-sm shadow-xl",
                "flex flex-col items-center",
                "p-[4px]"
              )}
              style={{
                transform: "translate(-80px, 10px)",
                overflowY: "hidden",
              }}
            >
              <div
                onClick={handleLogout}
                style={{
                  color: "hsla(0, 0%, 100%, 0.9)",
                }}
                className="w-full
                px-[15px] py-[8px]
                text-[0.88rem] font-normal cursor-pointer hover:bg-[rgba(255,255,255,0.125)] hover:text-[white]"
              >
                Sign Out
              </div>
            </div>
          }
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpenPopover(!isOpenPopover);
            }}
            className={twMerge(
              "rounded-full",
              "w-[30px] h-[30px] bg-[white]",
              "cursor-pointer"
            )}
          />
        </Popover>
      </AuthConditionalRenderWrapper>
      <AuthConditionalRenderWrapper required={false}>
        <div
          onClick={() => pushRouteWithHistory("/login")}
          className={twMerge(
            "flex items-center justify-center",
            "px-[45px] py-[10px]",
            "bg-[#ffffff]",
            "font-bold",
            "text-[15px]",
            "rounded-3xl",
            "cursor-pointer",
            "transition-all",
            "hover:brightness-90"
          )}
        >
          Login
        </div>
      </AuthConditionalRenderWrapper>
    </div>
  );
};

export default UserInfoButton;
