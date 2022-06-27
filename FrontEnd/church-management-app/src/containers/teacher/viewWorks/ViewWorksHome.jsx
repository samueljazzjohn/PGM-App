import React from 'react'
import { Route,Routes } from 'react-router-dom'
import ViewWorks from './ViewWorks'
import ViewAnswers from './ViewAnswers'

const ViewWorksHome = () => {
  return (
    <div className="pgm__teacher_view_works_home_container">
        <Routes>
                <Route path='/' element={<ViewWorks />} />
                <Route path='/view-answers' element={<ViewAnswers />} />
            </Routes>
    </div>
  )
}

export default ViewWorksHome