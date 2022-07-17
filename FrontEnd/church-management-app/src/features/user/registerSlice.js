import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api'

const initialState = {
    loading:false,
    message:null,
    error:null
}

export const registerUser = createAsyncThunk('user/registerUser', async ({data,navigate,toast})=>{
    try{
        const response = await api.register(data)
        console.log(response.data)
        toast.success('Registration success')
        navigate('/')
        return response.data
    }catch(err){
        navigate('/')
        toast.error(err.response.data.Message)
        console.log(err.response.data.Message)
    }
})

export const registerSlice = createSlice({
    name:'register',
    initialState,
    extraReducers:builder=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(registerUser.fulfilled,(state,actions)=>{
            state.loading=false
            state.message=actions.payload
            state.error=null
        })
        builder.addCase(registerUser.rejected,(state,actions)=>{
            state.loading=false
            state.message=null
            state.error=actions.payload
        })

    }
})


export const selectLoading = (state) => state.register.loading;


export default registerSlice.reducer;