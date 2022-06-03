import {createSlice} from '@reduxjs/toolkit'

const initialState={
    show : false
}

export const loginModelSlice = createSlice({
    name : 'loginModel',
    initialState,
    reducers : {
        loginModelOpen : (state)=>{
            state.show=true
        },
        loginModelClose : (state)=>{
            state.show=false
        }
    }
})

export const selectShow = (state) => state.loginModel.show

export const {loginModelOpen,loginModelClose} = loginModelSlice.actions;

export default loginModelSlice.reducer;