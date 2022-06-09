import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    show:false
}

export const registerModelSlice = createSlice({
    name : 'registerModel',
    initialState,
    reducers : {
        registerModelOpen : (state)=>{
            state.show=true
        },
        registerModelClose : (state)=>{
            state.show=false
        }
    }
})

export const registerModelShow = (state) => state.registerModel.show

export const {registerModelOpen,registerModelClose} = registerModelSlice.actions;

export default registerModelSlice.reducer;