import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    searchValue: '',
    category: "",

};

const searchSlice = createSlice({
    name: "Search",
    initialState: initialState,

    reducers: {

        clearSearchFields: (state, { payload }) => {
            // console.log('clearing search');

            state.searchValue = ""
            state.category = ''
        },

        getSearchInput: (state, { payload }) => {
            // console.log(payload);
            state.route = payload.pathname
            state.searchValue = payload.searchKeyword

        }


    },

})


export default searchSlice.reducer;
export const { clearSearchFields, getSearchInput } = searchSlice.actions;