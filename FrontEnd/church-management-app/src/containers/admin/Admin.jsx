import React from 'react'
import './admin.css'
import Dashboard from './Dashboard'
import AddCourse from './AddCourse'
import AddEvent from './AddEvent'
import ChurchDetails from './ChurchDetails'
import StudentDetails from './StudentDetails'
import TeacherDetails from './TeacherDetails'
import {Routes,Route} from 'react-router-dom'
import { DashboardTab } from '../../components'
import { AiOutlineHome } from 'react-icons/ai'
import { GoDiffAdded } from 'react-icons/go'
import { BiAlarmAdd, BiChurch } from 'react-icons/bi'
import { MdOutlineManageAccounts, MdDetails } from 'react-icons/md'
import { GiTeacher } from 'react-icons/gi'
import ManageRequest from './ManageRequest'
import {DashboardHometab} from '../../components'

const Admin = () => {
  const menuItems = [{
    icon: AiOutlineHome,
    item: 'Dashboard',
    url:'/admin/'
  },
  {
    icon: GoDiffAdded,
    item: 'Add courses',
    url:'/admin/add-course'
  },
  {
    icon: BiAlarmAdd,
    item: 'Add events',
    url:'/admin/add-event'
  },
  {
    icon: MdOutlineManageAccounts,
    item: 'Manage requests',
    url:'/admin/manage-request'
  },
  {
    icon: BiChurch,
    item: 'Church details',
    url:'/admin/church-details'
  },
  {
    icon: MdDetails,
    item: 'Student details',
    url:'/admin/student-details'
  },
  {
    icon: GiTeacher,
    item: 'Teacher details',
    url:'/admin/teacher-details'
  },
  ]
  return (
    <div className="pgm__admin_dashboard_container">
      <div className="pgm__admin_dashboard_menu">
        <div className="pgm__admin_dashboard_header">
          <h1 className="gradient__text">
            Admin
          </h1>
        </div>
        <div className="pgm__admin_dashboard_menu_links">
          <DashboardTab items={menuItems} />
        </div>
      </div>
      <div className="pgm__admin_dashboard_content">
        <div className="pgm__admin_dashboard_hometab">
          <DashboardHometab />
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/admin/add-course' element={<AddCourse />} />
          <Route path='/add-event' element={<AddEvent />} />
          <Route path='/add-course' element={<AddCourse />} />
          <Route path='/church-details' element={<ChurchDetails />} />
          <Route path='/student-details' element={<StudentDetails />} />
          <Route path='/tacher-details' element={<TeacherDetails />} />
          <Route path='/manage-request' element={<ManageRequest />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin