import React,{useEffect,useState} from 'react'
import ShowRequestBar from '../../../components/showBars/ShowRequestBar'
import axios from 'axios'
import ShowModel from '../../../components/showBars/ShowModel'

const TeacherRequest = () => {
  const [teacherDetails,setteacherDetails]=useState()

  const [isDataSet,setIsDataSet]=useState(false)

  useEffect(() => {
    axios.get('http://localhost:4000/admin/teacher-details').then((res)=>{
      setteacherDetails(res.data)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }, [isDataSet])
  

  return (
    <div className="pgm__teacher_request_container">
      <ShowModel />
      {teacherDetails && teacherDetails.map((teacher)=> <ShowRequestBar key={teacher._id} email={teacher.email} name={teacher.username} state={setIsDataSet} id={teacher._id} type={teacher.type} />)}
    </div>
  )
}

export default TeacherRequest