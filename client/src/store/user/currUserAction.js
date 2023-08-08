import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from "../../utils/constants";
import { toast } from "react-hot-toast";
import { getToken } from "../getToken";

export const getUser = createAsyncThunk(
  "currUser-fetch",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${APIURL}/user/${values.userId}`,
        getToken()
      );
      // console.log(res);

      return res.data;
    } catch (error) {
      // console.log(error);

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error);
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "currUser-update",
  async (values, { rejectWithValue }) => {
    try {
      //   console.log(values);
      const res = await axios.patch(
        `${APIURL}/user/${values.id}`,
        values,
        getToken()
      );
      //   console.log(res);
      toast.success("Profile updated.");
      return res.data;
    } catch (error) {
      // console.log(error);

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error);
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  "currUser-profilePicture",
  async (values, { rejectWithValue }) => {
    try {
      // console.log(values);
      var fileRes = null;
      if (values.prevFile) {
        fileRes = await axios.put(
          `${APIURL}/file/${values.prevFile}`,
          values.formData,
          getToken()
        );
        // console.log(values.prevFile);
        // console.log(fileRes);
      }
      fileRes = await axios.post(`${APIURL}/file`, values.formData, getToken());

      const image = fileRes.data.url;
      const res = await axios.patch(
        `${APIURL}/user/picture/${values.userId}`,
        { image: image },
        getToken()
      );
      toast.success("Profile Picture updated.");
      return res.data;
    } catch (error) {
      // console.log(error);

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error);
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);
