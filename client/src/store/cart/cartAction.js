import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from '../../utils/constants';
import { toast } from "react-hot-toast";
import { getToken } from "../getToken";


export const addToCart = createAsyncThunk('add to cart',
    async (values, { rejectWithValue }) => {

        try {

            // console.log(values);
            const res = await axios.post(`${APIURL}/cart`, values, getToken())

            // console.log(res.status);
            if (res.status === 201) {
                // console.log(res.status);
                toast.success(res.data.item + " added to cart")
            }
            // console.log(res.data);

            return res.data

        }

        catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                // toast.error(error.response.data.message)
                toast.error(" Failed to add meal to cart.")
                return rejectWithValue(error.response.data.message);
            } else {
                // console.log(error);
                // toast.error(error.message)
                toast.error(" Failed to add meal to cart.")
                return rejectWithValue(error.message);
            }

        }

    }


)


export const getAllCartItems = createAsyncThunk('fetch all cart items',
    async (values, { rejectWithValue }) => {

        try {
            // console.log(values);

            const res = await axios.get(`${APIURL}/cart/${values}`, getToken())
            // console.log(res.data);

            return res.data

        }

        catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(" Failed to get cart meals.")
                return rejectWithValue(error.response.data.message);
            } else {
                // console.log(error);
                // toast.error(error.message)
                toast.error("Something went wrong.")
                return rejectWithValue(error.message);
            }

        }

    }


)



export const incrementQuantity = createAsyncThunk('IncrementQuantity',
    async (values, { rejectWithValue }) => {

        try {
            // console.log(values);
            // console.log(values.userId);

            const res = await axios.put(`${APIURL}/cart/increment/${values.itemId}`, values, getToken())
            // console.log(res.data);

            return res.data

        }

        catch (error) {
            console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                //runs when the api is offline
                toast.error("Something went wrong.")
                return rejectWithValue(error.message);
            }

        }

    }


)


export const decrementQuantity = createAsyncThunk('IncrementQuantity',
    async (values, { rejectWithValue }) => {

        try {

            const res = await axios.put(`${APIURL}/cart/decrement/${values.itemId}`, values, getToken())
            // console.log(res.data);

            return res.data

        }

        catch (error) {
            console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                // console.log(error);
                // toast.error(error.message)
                toast.error("Something went wrong.")
                return rejectWithValue(error.message);
            }

        }

    }


)
