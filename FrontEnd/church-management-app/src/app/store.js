import {configureStore} from '@reduxjs/toolkit'
import loginModel from '../features/loginModel/loginModelSlice'
import registerModel from '../features/registrationModel/registrationModelSlice'
import userSlice from '../features/user/userSlice'
import registerSlice from '../features/user/registerSlice'
import categorySlice from '../features/category/categorySlice'

const store = configureStore({
    reducer : {
        loginModel :loginModel,
        registerModel :registerModel,
        user:userSlice,
        register:registerSlice,
        category:categorySlice
    },
})

export default store;