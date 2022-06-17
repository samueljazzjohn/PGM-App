import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api'

const initialState = {
    loading:false,
    church:null,
    error:null
}

export const fetchChurch = createAsyncThunk('user/fetchChurch', async ({data})=>{
    console.log(data)
    try{
        const response = await api.churchDetails(data)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
})

export const churchSlice = createSlice({
    name:'church',
    initialState,
    extraReducers:builder=>{
        builder.addCase(fetchChurch.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchChurch.fulfilled,(state,actions)=>{
            state.loading=false
            state.church=actions.payload
            state.error=null
        })
        builder.addCase(fetchChurch.rejected,(state,actions)=>{
            state.loading=false
            state.church=null
            state.error=actions.payload
        })

    }
})

export const selectLoading=(state)=> state.church.loading

export const churchData=(state)=>state.church.church

export default churchSlice.reducer;