import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false,
    role: null
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload.user,
            state.role=action.payload.role,
            state.isAuth = true
        },
        logout:(state)=>{
            state.user=null,
            state.isAuth = false,
            state.role=null
        },
    }
});

export const {login,logout} = AuthSlice.actions;

export default AuthSlice.reducer;