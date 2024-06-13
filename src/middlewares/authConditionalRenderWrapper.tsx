"use client";

import { State } from "@/redux/store";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
  required: boolean;
};

const AuthConditionalRenderWrapper: React.FC<Props> = ({
  children,
  required,
}) => {
  const userSlice = useSelector((state: State) => state.user);

  return required
    ? userSlice.userInfo
      ? children
      : null
    : userSlice.userInfo
    ? null
    : children;
};

export default AuthConditionalRenderWrapper;
