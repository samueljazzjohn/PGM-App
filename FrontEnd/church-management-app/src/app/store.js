import {configureStore} from '@reduxjs/toolkit'
import loginModel from '../features/loginModel/loginModelSlice'
import registerModel from '../features/registrationModel/registrationModelSlice'
import userSlice from '../features/user/userSlice'
import registerSlice from '../features/user/registerSlice'
import categorySlice from '../features/category/categorySlice'
import addEventSlice from '../features/admin/addEventSlice'
import addCourseSlice from '../features/admin/addCourseSlice'
import ShowModelSlice from '../features/showModel/ShowModelSlice'
import churchSlice from '../features/admin/churchDetails'

const store = configureStore({
    reducer : {
        loginModel :loginModel,
        registerModel :registerModel,
        user:userSlice,
        register:registerSlice,
        category:categorySlice,
        addCourse:addCourseSlice,
        addEvent:addEventSlice,
        showModel:ShowModelSlice,
        church:churchSlice
    },
})

export default store;