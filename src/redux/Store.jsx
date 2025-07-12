import { configureStore } from '@reduxjs/toolkit'
import {arSlice} from "./ArApiSlice.jsx";
import {faSlice} from "./FaApiSlice.jsx";
import { listSlice} from "./ListSlice.jsx";

export const store = configureStore({
    reducer: {
        arabic:arSlice.reducer,
        farsi:faSlice.reducer,
        list:listSlice.reducer,


    },
})