import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticationState {
  loggedIn: boolean;
}

const initialState: AuthenticationState = {
  loggedIn: false,
};
           
const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state: AuthenticationState) => {
      state.loggedIn = true;
    },
    logout: (state: AuthenticationState) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;