import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "./currUserAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  userData: null,
};

const currUserSlice = createSlice({
  name: "current-user",
  initialState: initialState,

  reducers: {
    clearFields: (state, { payload }) => {
      // console.log("clearing fields");
      state.success = false;
      state.loading = false;
      state.error = null;
    },

    clearUserData: (state) => {
      state.userData = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: {
    //user Login
    [getUser.fulfilled]: (state, { payload }) => {
      state.success = true;
      state.error = null;
      state.loading = false;
      state.userData = payload;
    },
    [getUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.success = false;
    },

    // [updateUser.fulfilled]: (state, { payload }) => {

    //     console.log('update user');
    //     state.success = true;
    //     state.error = null;
    //     state.loading = false
    //     // state.userData = payload
    // },
    // [updateUser.pending]: (state) => {

    //     state.loading = true;
    //     state.error = null;
    //     state.success = false

    // }, [updateUser.rejected]: (state, { payload }) => {
    //     state.error = payload
    //     state.loading = false
    //     state.success = false;

    // },
  },
});

export default currUserSlice.reducer;
export const { clearUserData, clearFields } = currUserSlice.actions;
