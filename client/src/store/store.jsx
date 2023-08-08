import { configureStore } from '@reduxjs/toolkit'
import authSlice from './user/authSlice';
import productSlice from './product/productSlice';
import currUserSlice from './user/currUserSlice';
import searchSlice from './searchSlice';
import userSlice from './user/userSlice';
import cartSlice from './cart/cartSlice';



const store = configureStore({

    reducer: {
        auth: authSlice,
        product: productSlice,
        currUser: currUserSlice,
        search: searchSlice,
        user: userSlice,
        cart: cartSlice,

    }
})

export default store;






