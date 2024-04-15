
import { createReducer } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./action";

interface AuthState {
  user: any | null;
  userData: any | null;
  status: string;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  userData: null,
  status: "idle",
  error: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    // fetching state
    .addCase(registerUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(logoutUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })

    // call suces state
    .addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.userData = action.payload.userData;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.status = "succeeded";
      state.user = null;
    })

    // rejected state
    .addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
});

export default authReducer;
