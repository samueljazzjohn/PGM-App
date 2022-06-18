import React,{useEffect,useState} from 'react'
import ShowRequestBar from '../../../components/showBars/ShowRequestBar'
import axios from 'axios'
import ShowModel from '../../../components/showBars/ShowModel'

const StudentRequest = () => {
    const [studentDetails,setstudentDetails]=useState()

    const [isDataSet,setIsDataSet]=useState(false)
  
    useEffect(() => {
      axios.get('http://localhost:4000/admin/student-details').then((res)=>{
        setstudentDetails(res.data)
        console.log(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }, [isDataSet])
    
  
    return (
      <div className="pgm__student_request_container">
        <ShowModel />
        {studentDetails && studentDetails.map((student)=> <ShowRequestBar key={student._id} email={student.email} name={student.username} state={setIsDataSet} id={student._id} type={student.type} />)}
      </div>
    )
}

export default StudentRequest