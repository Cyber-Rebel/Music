import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.data = action.payload;
        },
        clearUser:(state)=>{
            state.data = null;
        }
    }
})

export const {setUser,clearUser} = authSlice.actions
export default authSlice.reducer

// userSlice.actions ka matlab reducers ko export karna hai