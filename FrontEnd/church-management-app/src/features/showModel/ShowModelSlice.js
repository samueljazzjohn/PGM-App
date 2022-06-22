import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    show:false,
    invite:true
}

export const showModelSlice = createSlice({
    name : 'showModel',
    initialState,
    reducers : {
        showModelOpen : (state,payload)=>{
            state.show=true
            state.invite=payload
        },
        showModelClose : (state)=>{
            state.show=false
        }
    }
})

export const showModelShow = (state) => state.showModel.show

export const selectInvite = (state) => state.showModel.invite

export const {showModelOpen,showModelClose} = showModelSlice.actions;

export default showModelSlice.reducer;