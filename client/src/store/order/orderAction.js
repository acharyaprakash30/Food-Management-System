import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from "../../utils/constants";
import { toast } from "react-hot-toast";
import { getToken } from "../getToken";


export const createAnOrder = createAsyncThunk(
    "Create An Order",
    async (values, { rejectWithValue }) => {

        try {
            const res = await axios.post(`${APIURL}/order`, values, getToken());
            // console.log(res);
            toast.success(res.data.message)
            return res.data.message;

        } catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                // console.log(error);
                toast.error(error.message)
                return rejectWithValue(error.message);
            }
        }
    }
);

export const getUserAllOrder = createAsyncThunk(
    "Fetch all order of a user",
    async (values, { rejectWithValue }) => {

        try {
            const res = await axios.get(`${APIURL}/order/${values.id}`, values, getToken());
            console.log(res);
            toast.success(res.data.message)
            return res.data.message;

        } catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                // console.log(error);
                toast.error(error.message)
                return rejectWithValue(error.message);
            }
        }
    }
);