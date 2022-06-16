import React,{useState,useEffect} from 'react'
import '../admin.css'
import {Routes,Route} from 'react-router-dom'
import ChurchRequest from './ChurchRequest'
import StudentRequest from './StudentRequest'
import TeacherRequest from './TeacherRequest'
import ManageRequestHome from './ManageRequestHome'

const ManageRequest = () => {

  return (
    <div className="pgm__manage_request_container section__margin">
      <Routes>
        <Route path='/' element={<ManageRequestHome />} />
        <Route path='/church-request' element={<ChurchRequest />} />
        <Route path='/student-request' element={<StudentRequest />} />
        <Route path='/teacher-request' element={<TeacherRequest />} />
      </Routes>
    </div>
  )
}

export default ManageRequest