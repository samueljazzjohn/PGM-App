import React from 'react'
import './teacher.css'
import Dashboard from './Dashboard'
import {Routes,Route} from 'react-router-dom'
import { DashboardTab } from '../../components'
import { AiOutlineHome } from 'react-icons/ai'
import { GoDiffAdded } from 'react-icons/go'
import { BiAlarmAdd, BiChurch } from 'react-icons/bi'
import { MdOutlineManageAccounts } from 'react-icons/md'
import {DashboardHometab} from '../../components'
import AddNotification from './AddNotification'
import AssignWorks from './AssignWorks'
import ViewStudents from './ViewStudents'
import ViewWorks from './ViewWorks'

const Teacher = () => {

  const menuItems = [{
    icon: AiOutlineHome,
    item: 'Dashboard',
    url:'/teacher/'
  },
  {
    icon: GoDiffAdded,
    item: 'View student',
    url:'/teacher/view-students'
  },
  {
    icon: BiAlarmAdd,
    item: 'Assign works',
    url:'/teacher/assign-works'
  },
  {
    icon: MdOutlineManageAccounts,
    item: 'View works',
    url:'/teacher/view-works'
  },
  {
    icon: MdOutlineManageAccounts,
    item: 'Add notifications',
    url:'/teacher/add-notification'
  },
  ]

  return (
    <div className="pgm__teacher_dashboard_container">
    <div className="pgm__teacher_dashboard_menu">
      <div className="pgm__teacher_dashboard_header">
        <h1 className="gradient__text">
          Teacher
        </h1>
      </div>
      <div className="pgm__teacher_dashboard_menu_links">
        <DashboardTab items={menuItems} />
      </div>
    </div>
    <div className="pgm__teacher_dashboard_content">
      <div className="pgm__teacher_dashboard_hometab">
        <DashboardHometab />
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-notification" element={<AddNotification />} />
        <Route path="/view-students" element={<ViewStudents />} />
        <Route path="/view-works" element={<ViewWorks />} />
        <Route path="/assign-works" element={<AssignWorks />} />
      </Routes>
    </div>
  </div>
  )
}

export default Teacher