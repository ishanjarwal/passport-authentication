"use client";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUserAPI, resendOTPAPI, verifyUserAPI } from "./authAPI";
import { InfoTypeValues } from "./types";

interface User {
  id?: string;
  name?: string;
  email: string;
  // roles: string[]
}

interface AuthStateValues {
  user: User | null;
  loading: boolean;
  info: {
    message: string;
    type: InfoTypeValues;
  } | null;
}

const initialState: AuthStateValues = {
  user: null,
  loading: false,
  info: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    data: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await registerUserAPI(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "auth/verify",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await verifyUserAPI(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const resendOTP = createAsyncThunk(
  "auth/resent-otp",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const response = await resendOTPAPI(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      state.user = null;
    },
    resetInfo(state, action) {
      state.info = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action: any) => {
        state.loading = true;
        state.info = null;
      })
      .addCase(registerUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: "success",
          message: action.payload?.message || "Registration successful",
        };
        state.user = {
          email: action.payload?.body.email,
        };
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.info = {
          // type: action.payload?.response.data?.status || "error",
          type: "error",
          message:
            action.payload?.response.data?.message ||
            "Something went wrong, registration unsuccessful",
        };
      })
      .addCase(verifyUser.pending, (state, action: any) => {
        state.loading = true;
        state.info = null;
      })
      .addCase(verifyUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: "success",
          message: action.payload?.message || "Verification successful",
        };
      })
      .addCase(verifyUser.rejected, (state, action: any) => {
        state.loading = false;
        state.info = {
          // type: action.payload?.response.data?.status || "error",
          type: "error",
          message:
            action.payload?.response.data?.message ||
            "Something went wrong, verification unsuccessful",
        };
      })
      .addCase(resendOTP.pending, (state, action: any) => {
        state.loading = true;
        state.info = null;
      })
      .addCase(resendOTP.fulfilled, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: "info",
          message: action.payload?.message || "OTP resent",
        };
      })
      .addCase(resendOTP.rejected, (state, action: any) => {
        state.loading = false;
        state.info = {
          // type: action.payload?.response.data?.status || "error",
          type: "error",
          message:
            action.payload?.response.data?.message ||
            "Something went wrong, try again later",
        };
      });
  },
});

export const { resetInfo, logout } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
