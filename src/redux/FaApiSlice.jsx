import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosClient} from "../Axios.jsx";


export const fetchFaApi=createAsyncThunk('arabic/arQuran',async (number)=>{

    const response =await axiosClient.get(`/surah/${number}/fa.ghomshei`);
    return response.data

})

export const faSlice=createSlice({
    name:'farsi',
    initialState:{
        data:[],
        isLoading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFaApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFaApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchFaApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})
export const faReducer=  faSlice.reducer