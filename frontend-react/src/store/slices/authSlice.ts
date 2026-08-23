import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  authState,
  LoginPayload,
  SignupPayload,
} from "../../interfaces/auth.interface";
import API from "../../api/api";
import Cookies from "js-cookie";

const token = Cookies.get("token") ?? false;
console.log(token);
const storedUser = Cookies.get("user");

// Safely parse user from cookie on initial load
let parsedUser = null;
if (storedUser) {
  try {
    parsedUser = JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse user cookie", error);
  }
}
// const user = JSON.parse(Cookies.get("user") as string) ?? null
const initialState: authState = {
  isLoading: !!token && !parsedUser,
  isError: false,
  error: null,
  isAuthenticated: !!token,
  user: parsedUser,
  showPassword: false,
  detail: null,
};

export const signupThunk = createAsyncThunk(
  "auth/register",
  async (data: SignupPayload, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/registration/", data);
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await API.post("api/auth/login/", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
export const logOutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await API.post("/auth/logout/");
      // console.log(response.d);
      // return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("token");
      Cookies.remove("tokenType");
      Cookies.remove("user");
    },
    ShowPassword: (state) => {
      state.showPassword = !state.showPassword;
      // console.log("showpsw:", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //Login
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isError = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isError = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        const accessToken =
          action.payload.accessToken ??
          action.payload.access ??
          action.payload.key;
        Cookies.set("token", accessToken);
        Cookies.set(
          "tokenType",
          action.payload.accessToken || action.payload.access
            ? "Bearer"
            : "Token",
        );
        Cookies.set("user", JSON.stringify(action.payload.user));
        console.log("fulfilled login", action.payload);
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string" ? action.payload : null;
        state.isError = true;
        //    console.log(" failed login", action.payload);
      })

      //signup
      .addCase(signupThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isError = false;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = action?.payload?.user;
        const accessToken =
          action.payload.accessToken ??
          action.payload.access ??
          action.payload.key;
        Cookies.set("token", accessToken);
        Cookies.set(
          "tokenType",
          action.payload.accessToken || action.payload.access
            ? "Bearer"
            : "Token",
        );
        Cookies.set("user", JSON.stringify(action.payload.user));
        console.log("full filed register", action.payload);
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.error =
          typeof action?.payload === "string" ? action.payload : null;
      })
      .addCase(logOutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        // state.isAuthenticated = false;
      })
      .addCase(logOutUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = null;
        state.isAuthenticated = false;
        Cookies.remove("user");
        Cookies.remove("token");
        Cookies.remove("tokenType");
        console.log("logout-action==>", action);
      })
      .addCase(logOutUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.user = null;
        state.isAuthenticated = false;
        Cookies.remove("user");
        Cookies.remove("token");
        Cookies.remove("tokenType");
      });
  },
});

export const { logOut, ShowPassword } = authSlice.actions;
export default authSlice.reducer;
