import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    show:false
}

export const showModelSlice = createSlice({
    name : 'showModel',
    initialState,
    reducers : {
        showModelOpen : (state)=>{
            state.show=true
        },
        showModelClose : (state)=>{
            state.show=false
        }
    }
})

export const showModelShow = (state) => state.showModel.show

export const {showModelOpen,showModelClose} = showModelSlice.actions;

export default showModelSlice.reducer;