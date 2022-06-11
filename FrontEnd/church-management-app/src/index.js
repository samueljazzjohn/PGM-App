import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Admin,Student,Teacher,Church} from './containers'
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
      <Route path='/admin/*' element={<Admin />} />
      <Route path='/student/*' element={<Student />} />
      <Route path='/teacher/*' element={<Teacher />} />
      <Route path='/church/*' element={<Church />} />
    </Routes>
  </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
