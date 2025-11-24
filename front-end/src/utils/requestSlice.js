import { createSlice } from "@reduxjs/toolkit";

const requestSlice =createSlice({
    name:"request",
    initialState:[],
    reducers:{
        addrequest:(state,action)=>{
            return action.payload
        },
        removeRequests:(state,action)=>{
            const newArray =state.filter(r=> r._id !== action.payload);
            return newArray
        }
    }
})
export const{addrequest,removeRequests} =requestSlice.actions
export default requestSlice.reducer