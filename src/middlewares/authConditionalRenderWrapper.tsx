"use client";

import { State } from "@/redux/store";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
  renderIf: "AUTH" | "NOT_AUTH";
};

const AuthConditionalRenderWrapper: React.FC<Props> = ({
  children,
  renderIf,
}) => {
  const userSlice = useSelector((state: State) => state.user);

  return renderIf === "AUTH"
    ? userSlice.userInfo
      ? children
      : null
    : userSlice.userInfo
    ? null
    : children;
};

export default AuthConditionalRenderWrapper;
