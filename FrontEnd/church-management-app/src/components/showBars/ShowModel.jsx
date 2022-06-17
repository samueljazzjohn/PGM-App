import React from 'react'
import './showBars.css'
import { showModelShow,showModelClose } from '../../features/showModel/ShowModelSlice'
import { useSelector,useDispatch } from 'react-redux/es/exports'
import {Modal,Button} from 'react-bootstrap'
import { churchData } from '../../features/admin/churchDetails'

const ShowModel = () => {

  const show=useSelector(showModelShow)

  const churchDetails=useSelector(churchData)

  const dispatch=useDispatch()

  return (
    <Modal
    className="pgm__show_model"
    show={show}
    onHide={() => dispatch(showModelClose())}
    tabIndex="-1"
    backdrop="static"
    keyboard={false}
    >
      {churchDetails && console.log(churchDetails.type)}
      <Modal.Title className="pgm__show-model-header">{churchDetails && churchDetails.type} Details</Modal.Title>
      <Modal.Body className="pgm__show-model-body">
        {churchDetails && <div className="pgm__show_model_body_content">
          <p>Name : {churchDetails.church.pastorfname}</p>
          <p>Name : {churchDetails.church.pastorfname}</p>
        </div> }
        <Button className="pgm__show-model-button" variant="secondary" onClick={() => dispatch(showModelClose())}>
                            close
                        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default ShowModel