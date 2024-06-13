import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../consts";

type State = {
  routes: string[];
  currRouteIndex: number;
};

const initialState: State = {
  routes: [],
  currRouteIndex: -1,
};

const routesHistorySlice = createSlice({
  name: SLICE_NAMES.ROUTES_HISTORY,
  initialState: initialState,
  reducers: {
    addNewRoute: (state, action) => {
      if (state.currRouteIndex === state.routes.length - 1) {
        state.routes = [...state.routes, action.payload];
      } else {
        state.routes = [
          ...state.routes.slice(0, state.currRouteIndex + 1),
          action.payload,
        ];
      }
      state.currRouteIndex += 1;
    },
    goBackRouteFromCurr: (state) => {
      state.currRouteIndex -= 1;
    },
    goForwardRouteFromCurr: (state) => {
      state.currRouteIndex += 1;
    },
  },
});

export const { addNewRoute, goBackRouteFromCurr, goForwardRouteFromCurr } =
  routesHistorySlice.actions;
export default routesHistorySlice.reducer;
