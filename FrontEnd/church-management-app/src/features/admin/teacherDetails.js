import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api'

const initialState = {
    loading:false,
    teacher:null,
    mailSend:false,
    error:null
}

export const fetchTeacher = createAsyncThunk('user/fetchTeacher', async ({data})=>{
    console.log(data)
    try{
        const response = await api.teacherDetails(data)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
})

export const teacherSlice = createSlice({
    name:'teacher',
    initialState,
    extraReducers:builder=>{
        builder.addCase(fetchTeacher.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchTeacher.fulfilled,(state,actions)=>{
            state.loading=false
            state.teacher=actions.payload
            state.error=null
        })
        builder.addCase(fetchTeacher.rejected,(state,actions)=>{
            state.loading=false
            state.teacher=null
            state.error=actions.payload
        })

    }
})

export const selectLoading=(state)=> state.teacher.loading

export const teacherData=(state)=>state.teacher.teacher

export default teacherSlice.reducer;