import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api'

const initialState = {
    loading:false,
    student:null,
    mailSend:false,
    error:null
}

export const fetchStudent = createAsyncThunk('user/fetchStudent', async ({data})=>{
    console.log(data)
    try{
        const response = await api.studentDetails(data)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
})

export const studentSlice = createSlice({
    name:'student',
    initialState,
    extraReducers:builder=>{
        builder.addCase(fetchStudent.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchStudent.fulfilled,(state,actions)=>{
            state.loading=false
            state.student=actions.payload
            state.error=null
        })
        builder.addCase(fetchStudent.rejected,(state,actions)=>{
            state.loading=false
            state.student=null
            state.error=actions.payload
        })

    }
})

export const selectLoading=(state)=> state.student.loading

export const studentData=(state)=>state.student.student

export default studentSlice.reducer;