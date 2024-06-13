import { UserFavouriteItems, UserInfo } from "@/types/apiResponse";
import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../consts";

type State = {
  userInfo: UserInfo | null;
  favouriteItems: UserFavouriteItems | null;
};

const initialState: State = {
  userInfo: null,
  favouriteItems: null,
};

const userSlice = createSlice({
  name: SLICE_NAMES.USER,
  initialState: initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setUserFavouriteItems(
      state,
      action: {
        payload: UserFavouriteItems | null;
      }
    ) {
      state.favouriteItems = action.payload;
    },
  },
});

export const { setUserInfo, setUserFavouriteItems } = userSlice.actions;
export default userSlice.reducer;
