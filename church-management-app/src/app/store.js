import {configureStore} from '@reduxjs/toolkit'
import loginModel from '../features/loginModel/loginModelSlice'

const store = configureStore({
    reducer : {
        loginModel :loginModel
    },
})

export default store;