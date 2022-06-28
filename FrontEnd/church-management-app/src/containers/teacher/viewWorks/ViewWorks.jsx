import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import ShowQuestion from '../../../components/showBars/ShowQuestion'
import { selectUser } from '../../../features/user/userSlice'

const ViewWorks = () => {

  const [loading, setLoading] = useState(false)

  const [works, setWorks] = useState()

  const user = useSelector(selectUser)

  const token = user.token

  useEffect(() => {
    axios.get("http://localhost:4000/teacher/view-works", { headers: { "authorization": `Bearer ${token}` } }).then((res) => {
      setWorks(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  }, [loading])


  return (
    <div className="pgm__submit_work_container section__margin">
      <div className="pgm__admin_show_course_header">
        <p>Works</p>
      </div>
      <div className="pgm__admin_show">
      {works && works.map((work,index) => <ShowQuestion key={work._id} navUrl='/teacher/view-works/view-answers' token={token} nav={work._id} name={index+1} course={work.courseId.courseName} question={work.question} id={work._id} date={work.deadline} state={setLoading} />)}
      </div>
    </div>
  )
}

export default ViewWorks