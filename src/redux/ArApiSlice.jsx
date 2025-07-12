import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosClient} from "../Axios.jsx";

export const fetchArApi=createAsyncThunk('arabic/arQuran', async (params)=>{
        const {number,farsi,arabic}=params;
        const url = `/surah/${number}/editions/${arabic},${farsi}`;
        try {
            const response = await axiosClient.get(url);
            console.log(response.data,'got it redux')
            return response.data;
        } catch (error) {
            console.error("Error fetching ArApi data:", error);
            throw new Error("Failed to fetch ArApi data"); // Re-throw with a clear message
        }


    })


export const arSlice=createSlice({
    name:'arabic',
    initialState:{
        data:null,
        isLoading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchArApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null; // Clear previous error on successful request
            })
            .addCase(fetchArApi.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "An error occurred"; // Provide a default error message
            });
    },
});
export const arReducer=  arSlice.reducer