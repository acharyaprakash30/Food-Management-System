import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from '../../utils/constants';


export const userLogin = createAsyncThunk('user/login',
    async (values, { rejectWithValue }) => {
        console.log(values);



        try {

            const res = await axios.post(`${APIURL}/auth/login`, values)
            
            console.log(res);
            // console.log(res.data.token);
            // setResponse(res.data.message)

            return res.data

        }

        catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                console.log(error);
                return rejectWithValue(error.message);
            }

        }

    }


)

export const userRegister = createAsyncThunk('user/sign-up',
    async (values, { rejectWithValue }) => {
        console.log(values);



        try {

            const res = await axios.post(`${APIURL}/auth/register`, values)
            console.log(res);

            return res.data

        }

        catch (error) {
            console.log(error);

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                console.log(error);
                return rejectWithValue(error.message);
            }

        }

    }


)