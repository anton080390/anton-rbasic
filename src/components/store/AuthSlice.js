import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    fullName: "",
    email: "",
    token: token,
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserData: (state, action) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
  },
});

export const { setLoading, setUserData, setToken } = AuthSlice.actions;

export const handleRegistration = (data) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const registrationRequest = await axios.post(
      "https://dolphin-app-pc6ii.ondigitalocean.app/user",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (registrationRequest.data.verified) {
      const verifyRequest = await axios.post(
        "https://dolphin-app-pc6ii.ondigitalocean.app/user/verify-email",
        { verification: registrationRequest.data.verified },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        setUserData({
          fullName: verifyRequest.data.fullName,
          email: verifyRequest.data.email,
        })
      );

      dispatch(setToken({ token: verifyRequest.data.accessToken }));

      dispatch(setLoading(false));
    }
  } catch (err) {
    console.log("Request error:", err);
    if (err.response) {
      console.log("Response status:", err.response.status);
      console.log("Response data:", err.response.data);
    }
  }
};

export default AuthSlice.reducer;
