import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api'

const initialState = {
    loading:false,
    user:null,
    error:null
}

export const fetchUser = createAsyncThunk('user/fetchUser', async ({data,navigate,toast})=>{
    try{
        const response = await api.login(data)
        console.log(response.data)
        localStorage.setItem('user',response.data)
        console.log("Local storage"+localStorage.getItem('user'))
        toast.success('Login success')
        if(response.data.type==='admin'){
            navigate('/admin')
        }else if(response.data.type==='student'){
            navigate('/student')
        }else if(response.data.type==='teacher'){
            navigate('/teacher')
        }else{
            navigate('/church')
        }
        return response.data
    }catch(err){
        toast.error(err.response.data.Message)
        console.log(err.response.data.Message)
    }
})

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers : {
        login : (state,payload)=>{
            state.user=payload
        },
        logout : (state)=>{
            state.user=null
        }
    },
    extraReducers:builder=>{
        builder.addCase(fetchUser.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchUser.fulfilled,(state,actions)=>{
            state.loading=false
            state.user=actions.payload
            state.error=null
        })
        builder.addCase(fetchUser.rejected,(state,actions)=>{
            state.loading=false
            state.user=null
            state.error=actions.payload
        })

    }
})

export const selectUser = (state) => state.user.user;

export const selectLoading = (state) => state.user.loading;

export const selectError = (state) => state.user.error;

export const {login,logout} = userSlice.actions;


export default userSlice.reducer;