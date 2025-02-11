import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload.user,
            state.isAuth = true
        },
        logout:(state)=>{
            state.user=null,
            state.isAuth = false
        },
    }
});

export const {login,logout} = AuthSlice.actions;

export default AuthSlice.reducer;