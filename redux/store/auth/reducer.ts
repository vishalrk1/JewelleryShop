import { createReducer } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./action";

interface AuthState {
  user: any | null;
  userData: any | null;
  fetching: boolean;
  status: string;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  userData: null,
  fetching: false,
  status: "idle",
  error: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    // fetching state
    .addCase(registerUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
      state.fetching = true;
    })
    .addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
      state.fetching = true;
    })
    .addCase(logoutUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
      state.fetching = true;
    })

    // call suces state
    .addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.fetching = false;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action?.payload?.user;
      state.userData = action?.payload?.userData;
      state.fetching = false;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.status = "succeeded";
      state.user = null;
      state.fetching = false;
    })

    // rejected state
    .addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
      state.fetching = false;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
      state.fetching = false;
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
      state.fetching = false;
    });
});

export default authReducer;
