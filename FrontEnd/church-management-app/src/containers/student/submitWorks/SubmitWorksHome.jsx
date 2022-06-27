import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ViewWorks from './ViewWorks'
import SubmitWork from './SubmitWork'

const SubmitWorksHome = () => {
    return (
        <div className="pgm__submit_work_home_container">
            <Routes>
                <Route path='/' element={<ViewWorks />} />
                <Route path='/submit-work' element={<SubmitWork />} />
            </Routes>
        </div>
    )
}

export default SubmitWorksHome