import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api'

const initialState = {
    loading:false
}

export const addEvent = createAsyncThunk('user/addEvent', async ({data,toast,setIsButtonClicked})=>{
    try{
        const response = await api.addEvent(data)
        console.log(response.data)
        toast.success('Event added successfully')
        setIsButtonClicked(false)
        return response.data
    }catch(err){
        toast.error(err)
        console.log(err)
    }
})

export const addEventSlice = createSlice({
    name:'addEvent',
    initialState,
    extraReducers:builder=>{
        builder.addCase(addEvent.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(addEvent.fulfilled,(state)=>{
            state.loading=false
        })
        builder.addCase(addEvent.rejected,(state)=>{
            state.loading=false
        })

    }
})


export const selectLoading = (state) => state.addEvent.loading;


export default addEventSlice.reducer;