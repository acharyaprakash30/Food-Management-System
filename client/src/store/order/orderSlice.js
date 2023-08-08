const initialState = {
    loading: false,
    error: null,
    success: false,
    userOrders,

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

    },
});

export default orderSlice.reducer;
export const { clearUserData, clearFields } = orderSlice.actions;

