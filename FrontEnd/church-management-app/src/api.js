import axios from 'axios'

const API = axios.create({baseURL:'http://localhost:4000'});

export const login= (formData) => API.post("/login",formData);

export const register = (formData) => API.post("/register",formData);

export const addCourse = (formData) => API.post("/admin/add-course",formData)

export const addEvent = (formData) => API.post("/admin/add-event",formData)

export const churchDetails = (Data) => API.get("/admin/church-data",{params:Data})
