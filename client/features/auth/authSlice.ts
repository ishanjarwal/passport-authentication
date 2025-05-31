"use client";
import { RootState } from "@/redux/store";
import reduxThunkErrorPaylod from "@/utils/reduxThunkErrorPaylod";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  changePasswordAPI,
  loginUserAPI,
  logoutUserAPI,
  registerUserAPI,
  resendOTPAPI,
  resetPasswordAPI,
  resetPasswordLinkAPI,
  updateUserAPI,
  userProfileAPI,
  verifyUserAPI,
} from "./authAPI";
import { InfoTypeValues } from "./types";

interface User {
  id?: string;
  name?: string;
  email: string;
  bio?: string;
  login_provider?: string | null;
  // roles: string[]
}

interface AuthStateValues {
  user: User | null;
  loading: boolean;
  info: {
    message: string;
    type: InfoTypeValues;
  } | null;
  is_auth: boolean;
  initialized: boolean;
}

const initialState: AuthStateValues = {
  user: null,
  loading: false,
  info: null,
  is_auth: false,
  initialized: false,
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
      return rejectWithValue(reduxThunkErrorPaylod(error));
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
      return rejectWithValue(reduxThunkErrorPaylod(error));
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
      return rejectWithValue(reduxThunkErrorPaylod(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(reduxThunkErrorPaylod(error));
    }
  }
);

export const userProfile = createAsyncThunk(
  "auth/user-profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userProfileAPI();
      return response;
    } catch (error: any) {
      return rejectWithValue(reduxThunkErrorPaylod(error));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout-user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUserAPI();
      return response;
    } catch (error: any) {
      return rejectWithValue(reduxThunkErrorPaylod(error));
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/change-password",
  async (
    data: {
      old_password: string;
      password: string;
      password_confirmation: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await changePasswordAPI(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(reduxThunkErrorPaylod(error));
    }
  }
);

export const resetPasswordLink = createAsyncThunk(
  "auth/reset-password-link",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const response = await resetPasswordLinkAPI(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(reduxThunkErrorPaylod(error));
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (
    data: { token: string; password: string; password_confirmation: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await resetPasswordAPI(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(reduxThunkErrorPaylod(error));
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update-user",
  async (data: { name: string; bio: string }, { rejectWithValue }) => {
    try {
      const response = await updateUserAPI(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(reduxThunkErrorPaylod(error));
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
      .addCase(registerUser.pending, (state, action) => {
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
          type: action.payload?.status || "error",
          message: action.payload?.message || "Something went wrong",
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
        state.initialized = false;
      })
      .addCase(verifyUser.rejected, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: action.payload?.status || "error",
          message: action.payload?.message || "Something went wrong",
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
          type: action.payload?.status || "error",
          message: action.payload?.message || "Something went wrong",
        };
      })
      .addCase(loginUser.pending, (state, action: any) => {
        state.loading = true;
        state.info = null;
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.is_auth = true;
        state.initialized = false;
        state.info = {
          type: "success",
          message: action.payload?.message || "Login successful",
        };
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: action.payload?.status || "error",
          message: action.payload?.message || "Something went wrong",
        };
      })
      .addCase(userProfile.pending, (state, action: any) => {
        state.loading = true;
        state.initialized = false;
        state.info = null;
        state.is_auth = false;
      })
      .addCase(userProfile.fulfilled, (state, action: any) => {
        state.loading = false;
        state.initialized = true;
        state.is_auth = true;
        state.info = {
          type: "neutral",
          message: "",
        };
        state.user = {
          name: action.payload.body.name,
          email: action.payload.body.email,
          id: action.payload.body.id,
          bio: action.payload.body.bio,
          login_provider: action.payload.body.login_provider,
        };
      })
      .addCase(userProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: action.payload?.status || "error",
          message: action.payload?.message || "Something went wrong",
        };
        state.initialized = true;
        state.is_auth = false;
      })
      .addCase(logoutUser.pending, (state, action: any) => {
        state.loading = true;
        state.info = null;
      })
      .addCase(logoutUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.is_auth = false;
        state.info = {
          type: "success",
          message: action.payload?.message || "logged out",
        };
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: action.payload?.status || "error",
          message: action.payload?.message || "Something went wrong",
        };
      })
      .addCase(changePassword.pending, (state, action: any) => {
        state.loading = true;
        state.info = null;
      })
      .addCase(changePassword.fulfilled, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: "success",
          message: action.payload?.message || "Password Changed",
        };
      })
      .addCase(changePassword.rejected, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: action.payload?.status || "error",
          message: action.payload?.message || "Something went wrong",
        };
      })
      .addCase(resetPasswordLink.pending, (state, action: any) => {
        state.loading = true;
        state.info = null;
      })
      .addCase(resetPasswordLink.fulfilled, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: "success",
          message:
            action.payload?.message || "Password reset link sent to email",
        };
      })
      .addCase(resetPasswordLink.rejected, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: action.payload?.status || "error",
          message: action.payload?.message || "Something went wrong",
        };
      })
      .addCase(resetPassword.pending, (state, action: any) => {
        state.loading = true;
        state.info = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: "success",
          message: action.payload?.message || "Password reset successfully",
        };
      })
      .addCase(resetPassword.rejected, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: action.payload?.status || "error",
          message: action.payload?.message || "Something went wrong",
        };
      })
      .addCase(updateUser.pending, (state, action: any) => {
        state.loading = true;
        state.info = null;
      })
      .addCase(updateUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: "success",
          message: action.payload?.message || "details updated",
        };
        state.user = action.payload.body;
      })
      .addCase(updateUser.rejected, (state, action: any) => {
        state.loading = false;
        state.info = {
          type: action.payload?.status || "error",
          message: action.payload?.message || "Something went wrong",
        };
      });
  },
});

export const { resetInfo, logout } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
