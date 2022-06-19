import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api'

const initialState = {
    loading:false,
    details:null,
    error:null
}

export const fetchDetails = createAsyncThunk('user/fetchDetails', async ({data})=>{
    console.log(data)
    try{
        const response = await api.details(data)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
})

export const detailsSlice = createSlice({
    name:'details',
    initialState,
    extraReducers:builder=>{
        builder.addCase(fetchDetails.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchDetails.fulfilled,(state,actions)=>{
            state.loading=false
            state.details=actions.payload
            state.error=null
        })
        builder.addCase(fetchDetails.rejected,(state,actions)=>{
            state.loading=false
            state.details=null
            state.error=actions.payload
        })

    }
})

export const selectLoading=(state)=> state.details.loading

export const detailsData=(state)=>state.details.details

export default detailsSlice.reducer;