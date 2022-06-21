import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Admin,Student,Teacher,Church} from './containers'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import store from './app/store'
import { Provider } from 'react-redux';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { login } from './features/user/userSlice';
import { useDispatch } from 'react-redux';

// const user=localStorage.getItem('user')
// if(user){
//   const dispatch=useDispatch()
//   dispatch(login(user))  
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path='/admin/*' element={<Admin />} />
      <Route path='/student/*' element={<Student />} />
      <Route path='/teacher/*' element={<Teacher />} />
      <Route path='/church/*' element={<Church />} />
    </Routes>
  </BrowserRouter>
  <ToastContainer autoClose={5000}  />
    </Provider>
  </React.StrictMode>
);
