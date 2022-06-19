import React from 'react'
import './church.css'
import Dashboard from './Dashboard'
import {Routes,Route} from 'react-router-dom'
import { DashboardTab } from '../../components'
import { AiOutlineHome } from 'react-icons/ai'
import { GoDiffAdded } from 'react-icons/go'
import { BiAlarmAdd, BiChurch } from 'react-icons/bi'
import { MdOutlineManageAccounts } from 'react-icons/md'
import {DashboardHometab} from '../../components'
import AddMembers from './AddMembers'
import AddCommitteMembers from './AddCommitteMembers'
import AddRevenueExp from './AddRevenueExp'

const Church = () => {

  const menuItems = [{
    icon: AiOutlineHome,
    item: 'Dashboard',
    url:'/church/'
  },
  {
    icon: GoDiffAdded,
    item: 'Add members',
    url:'/church/add-members'
  },
  {
    icon: BiAlarmAdd,
    item: 'Add revenue expenditure',
    url:'/church/add-revenue-expenditure'
  },
  {
    icon: MdOutlineManageAccounts,
    item: 'Add committee members',
    url:'/church/add-committee-members'
  },
  ]
  return (
    <div className="pgm__church_dashboard_container">
      <div className="pgm__church_dashboard_menu">
        <div className="pgm__church_dashboard_header">
          <h1 className="gradient__text">
            Church
          </h1>
        </div>
        <div className="pgm__church_dashboard_menu_links">
          <DashboardTab items={menuItems} />
        </div>
      </div>
      <div className="pgm__church_dashboard_content">
        <div className="pgm__church_dashboard_hometab">
          <DashboardHometab />
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/add-members' element={<AddMembers/>} />
          <Route path='/add-revenue-expenditure' element={<AddRevenueExp />} /> 
          <Route path='/add-committee-members' element={<AddCommitteMembers/>} /> 
        </Routes>
      </div>
    </div>
  )
}

export default Church