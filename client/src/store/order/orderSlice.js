import { createSlice } from "@reduxjs/toolkit";
import {  getUserAllOrder,updateOrderStatus } from "./orderAction";


const initialState = {
    loading: false,
    error: null,
    success: false,
    userOrders:[]
};

const orderSlice = createSlice({
    name: "orders",
    initialState: initialState,

    reducers: {
        clearFields: (state, { payload }) => {
            // console.log("clearing fields");
            state.success = false;
            state.loading = false;
            state.error = null;
        },

        clearOrderData: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: {
            //create Product
            [getUserAllOrder.fulfilled]: (state, { payload }) => {
                console.log("payload of data",payload,state);
                // console.log(state);
                state.error = null;
                state.success = true;
                state.userOrders = payload;
                state.loading = false
    
            },
            [getUserAllOrder.pending]: (state) => {
    
                state.loading = true;
                state.error = null;
                state.success = false
    
    
            },
            [getUserAllOrder.rejected]: (state, { payload }) => {
                state.error = payload
                state.loading = false
                // console.log(state);
                state.success = false;
    
    
            },

                //create Product
                [updateOrderStatus.fulfilled]: (state, { payload }) => {
                    // console.log(state);
                    state.error = null;
                    state.success = true;
                    state.loading = false
        
                },
                [updateOrderStatus.pending]: (state) => {
        
                    state.loading = true;
                    state.error = null;
                    state.success = false
        
        
                },
                [updateOrderStatus.rejected]: (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                    // console.log(state);
                    state.success = false;
        
        
                },


    },
});

export default orderSlice.reducer;
export const { clearUserData, clearFields } = orderSlice.actions;

