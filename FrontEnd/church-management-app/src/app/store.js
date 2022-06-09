import {configureStore} from '@reduxjs/toolkit'
import loginModel from '../features/loginModel/loginModelSlice'
import registerModel from '../features/registrationModel/registrationModelSlice'

const store = configureStore({
    reducer : {
        loginModel :loginModel,
        registerModel :registerModel
    },
})

export default store;