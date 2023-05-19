import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface UserState {
  username: string | null;
  email: string | null;
}
export type LoginType = {
  username: string;
  email: string;
};

// Define the initial state using that type

const initialState: UserState = {
  username: null,
  email: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<LoginType>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    loggedOut: (state) => {
      localStorage.removeItem("token");
      state.username = null;
      state.email = null;
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const user = (state: RootState) => state.user;

export default userSlice.reducer;
