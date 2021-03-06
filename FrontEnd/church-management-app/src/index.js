import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Admin,Student,Teacher,Church,DonatePage} from './containers'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import store from './app/store'
import { Provider } from 'react-redux';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="/donate/*" element={<DonatePage />} />
      <Route path='/admin/*' element={<Admin />} />
      <Route path='/student/*' element={<Student />} />
      <Route path='/teacher/*' element={<Teacher />} />
      <Route path='/church/*' element={<Church />} />
    </Routes>
  </BrowserRouter>
  <ToastContainer autoClose={2000}  />
    </Provider>
  </React.StrictMode>
);
