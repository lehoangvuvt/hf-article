"use client";

import AuthConditionalRenderWrapper from "@/middlewares/authConditionalRenderWrapper";
import { State } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UsersService from "@/services/users.service";
import { useQueryClient } from "react-query";
import { ToastContainer, toast, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { setUserFavouriteItems } from "@/redux/slices/userSlice";

type Props = {
  type: "episode" | "podcast";
  itemId: number;
};

const AddToFavButton: React.FC<Props> = ({ type, itemId }) => {
  const userSlice = useSelector((state: State) => state.user);
  const [isAdded, setAdded] = useState(false);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    let isAdded = false;
    switch (type) {
      case "episode":
        isAdded = userSlice.favouriteItems?.favourite_episodes?.find(
          (ele) => ele.id === itemId
        )
          ? true
          : false;
        break;
    }
    setAdded(isAdded);
  }, [userSlice, type, itemId]);

  const handleAddToFav = async () => {
    switch (type) {
      case "episode":
        const response = await UsersService.ModifyUserFavourite({
          type: "Episode",
          item_id: itemId,
          operator: "Add",
        });
        if (response.status === "success") {
          const response = await UsersService.GetUserFavouriteItems();
          if (response.status === "success") {
            dispatch(setUserFavouriteItems(response.data));
            toast("Add episode to your favourite");
          }
        }
        break;
    }
  };

  const handleRemoveFromFav = async () => {
    switch (type) {
      case "episode":
        const response = await UsersService.ModifyUserFavourite({
          type: "Episode",
          item_id: itemId,
          operator: "Remove",
        });
        if (response.status === "success") {
          const response = await UsersService.GetUserFavouriteItems();
          if (response.status === "success") {
            dispatch(setUserFavouriteItems(response.data));
            toast("Remove episode from your favourite");
          }
        }
        break;
    }
  };

  return (
    <AuthConditionalRenderWrapper renderIf="AUTH">
      <button
        className={twMerge(
          "rounded-full",
          "w-[45px]",
          "h-[45px]",
          "flex",
          "items-center",
          "justify-center",
          "cursor-pointer",
          "transition-all",
          "hover:scale-110",
          "text-[36px]"
        )}
      >
        {isAdded ? (
          <CheckCircleIcon
            onClick={handleRemoveFromFav}
            fontSize="inherit"
            color="inherit"
            style={{ color: "#00E676" }}
          />
        ) : (
          <AddCircleOutlineIcon
            onClick={handleAddToFav}
            fontSize="inherit"
            color="inherit"
            style={{ color: "rgba(0,0,0,0.4)" }}
          />
        )}
      </button>
      <ToastContainer
        hideProgressBar
        autoClose={500}
        transition={Flip}
        theme="colored"
        style={{
          position: "fixed",
          zIndex: 1000,
          top: "50%",
          left: "calc(50% - 80px)",
        }}
      />
    </AuthConditionalRenderWrapper>
  );
};

export default AddToFavButton;
