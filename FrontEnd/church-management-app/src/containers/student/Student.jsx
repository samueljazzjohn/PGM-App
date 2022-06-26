import React from 'react'
import './student.css'
import Dashboard from './Dashboard'
import {Routes,Route} from 'react-router-dom'
import { DashboardTab } from '../../components'
import { AiOutlineHome } from 'react-icons/ai'
import { GoDiffAdded } from 'react-icons/go'
import { BiAlarmAdd } from 'react-icons/bi'
import { MdOutlineManageAccounts } from 'react-icons/md'
import {DashboardHometab} from '../../components'
import ViewNotification from './ViewNotification'
import SubmitWorks from './SubmitWorks'

const Student = () => {

  const menuItems = [{
    icon: AiOutlineHome,
    item: 'Dashboard',
    url:'/student/'
  },
  {
    icon: GoDiffAdded,
    item: 'Complete works',
    url:'/student/submit-works'
  },
  {
    icon: BiAlarmAdd,
    item: 'View notification',
    url:'/student/view-notification'
  },
  ]

  return (
    <div className="pgm__student_dashboard_container">
      <div className="pgm__student_dashboard_menu">
        <div className="pgm__student_dashboard_header">
          <h1 className="gradient__text">
            Student
          </h1>
        </div>
        <div className="pgm__student_dashboard_menu_links">
          <DashboardTab items={menuItems} />
        </div>
      </div>
      <div className="pgm__student_dashboard_content">
        <div className="pgm__student_dashboard_hometab">
          <DashboardHometab />
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/submit-works" element={<SubmitWorks />} />
          <Route path="/view-notification" element={<ViewNotification />} />
        </Routes>
      </div>
    </div>
  )
}

export default Student