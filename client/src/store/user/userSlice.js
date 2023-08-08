import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./userAction";


const initialState = {

    loading: false,
    error: null,
    success: false,
    usersList: []

};

const userSlice = createSlice({
    name: "current-user",
    initialState: initialState,

    reducers: {
        clearFields: (state, { payload }) => {
            state.success = false;
            state.loading = false;
            state.error = null;
        },

        clearUsersData: (state) => {
            state.loading = false;
            state.success = false
            state.error = null
            state.usersList = []
        },

    },
    extraReducers: {



        [getAllUsers.fulfilled]: (state, { payload }) => {
            state.success = true;
            state.error = null;
            state.loading = false
            state.usersList = payload
        },
        [getAllUsers.pending]: (state) => {

            state.loading = true;
            state.error = null;
            state.success = false


        }, [getAllUsers.rejected]: (state, { payload }) => {
            state.error = payload
            state.loading = false
            state.success = false;


        },
    }

})



export default userSlice.reducer;
export const { clearUsersData, clearFields } = userSlice.actions;