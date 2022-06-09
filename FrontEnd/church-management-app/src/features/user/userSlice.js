import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {axios} from 'axios'

const initialState = {
    loading:false,
    user:null,
    error:null
}

export const fetchUser = createAsyncThunk('user/fetchUser',()=>{
    return axios.get()
})

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login : (state,actions) =>{
            state.user=actions.payload
        },
        logout:(state)=>{
            state.user=null
        }
    },
    extraReducers:builder=>{
        builder.addCase(fetchUser.pending,(state)=>{
            state.loading=true
        }),
        builder.addCase(fetchUser.fulfilled,(state,actions)=>{
            state.loading=false
            state.user=actions.payload
            state.error=null
        }),
        builder.addCase(fetchUser.rejected,(state,actions)=>{
            state.loading=false
            state.user=null
            state.error=actions.payload
        }),
    }
})

export const selectUser = (state) => state.user.user;

export const {login,logout} = userSlice.actions;


export default userSlice.reducer;