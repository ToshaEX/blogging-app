import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type LoginType = {
  username: string;
  token: string;
};

// Define a type for the slice state
interface UserState {
  username: string | null;
  isLogged: boolean;
  token: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  username: null,
  isLogged: false,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<LoginType>) => {
      state.isLogged = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    loggedOut: (state) => {
      state.isLogged = false;
      state.token = null;
      state.username = null;
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const user = (state: RootState) => state.users;

export default userSlice.reducer;
