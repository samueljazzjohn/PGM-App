import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ShowAnswers from '../../../components/showBars/ShowAnswer'
import { selectUser } from '../../../features/user/userSlice'

const ViewAnswers = () => {

  const { state } = useLocation()

  const [answers, setAnswers] = useState()

  const user = useSelector(selectUser)

  const token = user.token

  useEffect(() => {
    let data={id:state.id}
    axios.get("http://localhost:4000/teacher/get-answers",{params:data}).then((res) => {
      setAnswers(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  }, [])

  return (
    <div className="pgm__teacher_view_answer_container section__margin">
      <div className="pgm__admin_show_course_header">
        <p>Answers</p>
      </div>
      <div className="pgm__admin_show">
      {
        answers && answers.map((answer)=><ShowAnswers key={answer._id} url={answer.url} submission={answer.submission} name={answer.studentId.lname +" "+ answer.studentId.fname} />)
      }
      </div>
    </div>
  )
}

export default ViewAnswers