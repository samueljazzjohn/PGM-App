import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api'

const initialState = {
    loading:false
}

export const addMember = createAsyncThunk('user/addMember', async ({data,token,toast,setIsButtonClicked})=>{
    try{
        const response = await api.addMember(data,token)
        console.log(response.data)
        toast.success('Member added successfully')
        setIsButtonClicked(false)
        return response.data
    }catch(err){
        toast.error('Registration failed')
        console.log(err)
    }
})

export const addMemberSlice = createSlice({
    name:'addMember',
    initialState,
    extraReducers:builder=>{
        builder.addCase(addMember.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(addMember.fulfilled,(state)=>{
            state.loading=false
        })
        builder.addCase(addMember.rejected,(state)=>{
            state.loading=false
        })

    }
})


export const selectLoading = (state) => state.addMember.loading;


export default addMemberSlice.reducer;