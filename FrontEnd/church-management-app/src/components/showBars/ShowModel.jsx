import React from 'react'
import './showBars.css'
import { showModelShow, showModelClose } from '../../features/showModel/ShowModelSlice'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { Modal, Button } from 'react-bootstrap'
// import { churchData } from '../../features/admin/churchDetails'
// import { studentData } from '../../features/admin/studentDetails'
// import { teacherData } from '../../features/admin/teacherDetails'
import {detailsData} from '../../features/admin/detailsSlice'
import {toast} from 'react-toastify'
import axios from 'axios'

const ShowModel = () => {

  const show = useSelector(showModelShow)

  // const churchDetails = useSelector(churchData)
  // const studentDetails = useSelector(studentData)
  // const teacherDetails = useSelector(teacherData)
  const details = useSelector(detailsData)

  const dispatch = useDispatch()

  const handleInvite = (id) => {
    console.log(id)
    var data = { email: id }
    axios.get('http://localhost:4000/admin/interview-invite', {params: data}).then((res) => {
      toast.success('Mail Send successfully')
      console.log(res)
      dispatch(showModelClose())
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <Modal
      className="pgm__show_model"
      show={show}
      onHide={() => dispatch(showModelClose())}
      tabIndex="-1"
      backdrop="static"
      keyboard={false}
    >
      {details && console.log(details.type)}
      <Modal.Title className="pgm__show-model-header">{details && details.type} Details</Modal.Title>
      <Modal.Body className="pgm__show-model-body section__padding">
      {details && <div className="pgm__show_model_body_content">
          {details.data[0].pastorfName && <p>Pastor Name : {details.data[0].pastorfName} {details.data[0].pastorlName}</p>}
          {details.data[0].fname && <p>Name : {details.data[0].fname} {details.data[0].lname}</p>}
          <p>place : {details.data[0].address.place}</p>
          <p>district : {details.data[0].address.district}</p>
          <p>state : {details.data[0].address.state}</p>
          <p>phone : {details.data[0].address.phone}</p>
          <p>pincode : {details.data[0].address.pincode}</p>
        {details.data[0].members && <p>members : {details.data[0].members}</p>}
        {details.data[0].experience && <p>Experience : {details.data[0].experience}</p>}
        {details.course && <p>Course selected : {details.course}</p>}
          {/* <p>Phone : {details.data[0].address.phone}</p> */}
        </div>}
        {/* {churchDetails && <div className="pgm__show_model_body_content">
          <p>Pastor Name : {churchDetails.data[0].pastorfName} {churchDetails.data[0].pastorlName}</p>
          <p>place : {churchDetails.data[0].address.place}</p>
          <p>district : {churchDetails.data[0].address.district}</p>
          <p>state : {churchDetails.data[0].address.state}</p>
          <p>phone : {churchDetails.data[0].address.phone}</p>
          <p>members : {churchDetails.data[0].members}</p>
        </div>}
        {studentDetails && <div className="pgm__show_model_body_content">
          <p>Name : {studentDetails.data[0].pastorfName} {studentDetails.data[0].pastorlName}</p>
          <p>place : {studentDetails.data[0].address.place}</p>
          <p>district : {studentDetails.data[0].address.district}</p>
          <p>state : {studentDetails.data[0].address.state}</p>
          <p>phone : {studentDetails.data[0].address.phone}</p>
          <p>course : {studentDetails.data[0].course}</p>
        </div>}
        {teacherDetails && <div className="pgm__show_model_body_content">
          <p>Name : {teacherDetails.data[0].pastorfName} {teacherDetails.data[0].pastorlName}</p>
          <p>place : {teacherDetails.data[0].address.place}</p>
          <p>district : {teacherDetails.data[0].address.district}</p>
          <p>state : {teacherDetails.data[0].address.state}</p>
          <p>phone : {teacherDetails.data[0].address.phone}</p>
          <p>experience : {teacherDetails.data[0].experience}</p>
        </div>} */}
        <div className="pgm__show-model-button_container">

          {details && <Button className="pgm__show-model-button" variant="secondary" onClick={()=>handleInvite(details.email)}>
            invite
          </Button>}
          {/* {studentDetails && <Button className="pgm__show-model-button" variant="secondary" onClick={()=>handleInvite(studentDetails.email)}>
            invite
          </Button>}
          {teacherDetails && <Button className="pgm__show-model-button" variant="secondary" onClick={()=>handleInvite(teacherDetails.email)}>
            invite
          </Button>} */}

          <Button className="pgm__show-model-button" variant="secondary" onClick={() => dispatch(showModelClose())}>
            close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ShowModel