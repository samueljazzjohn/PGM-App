import React from 'react'
import ChurchDetails from './ChurchDetails'
import ChurchData from './ChurchData'
import ChurchMembers from './ChurchMembers'
import ChurchCommittee from './ChurchCommittee'
import { Routes, Route } from 'react-router-dom'
import RevenueExpense from './RevenueExpense'

const ChurchDetailsHome = () => {
    return (
        <div><Routes>
            <Route path='/' element={<ChurchDetails />} />
            <Route path='/church-data/*' element={<ChurchData />} />
            <Route path='/church-data/members' element={<ChurchMembers />} />
            <Route path='/church-data/revenue-expense' element={<RevenueExpense />} />
            <Route path='/church-data/committee-members' element={<ChurchCommittee />} />
        </Routes></div>
    )
}

export default ChurchDetailsHome