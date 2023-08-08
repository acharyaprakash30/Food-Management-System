import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from '../../utils/constants';
import { toast } from "react-hot-toast";


export const getAllUsers = createAsyncThunk('fetch all users',
    async (values, { rejectWithValue }) => {
        // console.log('getting al users');

        try {
            const token = localStorage.getItem("userToken");
            const authHeaders = { headers: { Authorization: `Bearer ${token}` } }
            // console.log(values);

            const res = await axios.get(`${APIURL}/user`, { ...authHeaders, params: { userName: values } })
            // console.log(res);

            return res.data

        }

        catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                console.log(error);
                toast.error(error.message)
                return rejectWithValue(error.message);
            }

        }

    }


)