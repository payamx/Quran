import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosClient} from "../Axios.jsx";


export const fetchList=createAsyncThunk('arabic/arQuran',async ()=>{

    const response =await axiosClient.get(`/surah`);
    return response?.data?.data
})

export const listSlice=createSlice({
    name:'List',
    initialState:{
        data: [],
        isLoading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchList.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})
export default listSlice.reducer