import {createSlice} from '@reduxjs/toolkit'

const initialState={
    category : null
}

export const categorySlice = createSlice({
    name : 'category',
    initialState,
    reducers : {
        categorySelected : (state,actions)=>{
            state.category=actions.payload
        },
        categoryUnselected : (state)=>{
            state.category=null
        }
    }
})

export const selectcategory = (state) => state.category.category

export const {categorySelected,categoryUnselected} = categorySlice.actions;

export default categorySlice.reducer;