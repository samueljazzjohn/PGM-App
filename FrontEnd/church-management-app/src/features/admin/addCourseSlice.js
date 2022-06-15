import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api'

const initialState = {
    loading:false
}

export const addCourse = createAsyncThunk('user/addCourse', async ({data,toast,setIsButtonClicked})=>{
    try{
        const response = await api.addCourse(data)
        console.log(response.data)
        toast.success('Course added successfully')
        setIsButtonClicked(false)
        return response.data
    }catch(err){
        toast.error('Registration failed')
        console.log(err)
    }
})

export const addCourseSlice = createSlice({
    name:'addCourse',
    initialState,
    extraReducers:builder=>{
        builder.addCase(addCourse.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(addCourse.fulfilled,(state)=>{
            state.loading=false
        })
        builder.addCase(addCourse.rejected,(state)=>{
            state.loading=false
        })

    }
})


export const selectLoading = (state) => state.addCourse.loading;


export default addCourseSlice.reducer;