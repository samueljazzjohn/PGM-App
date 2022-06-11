import React, { useState } from 'react'
import './RegistrationModel.css'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { registerModelClose, registerModelShow } from '../../features/registrationModel/registrationModelSlice'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import TypeComponent from './TypeComponent'
import FormComponent from './FormComponent'

const RegistrationModel = () => {

  const show = useSelector(registerModelShow)
  const dispatch = useDispatch();

  return (
    <Modal
      className="pgm__register-model-container fade"
      show={show}
      onHide={() => dispatch(registerModelClose())}
      tabIndex="-1"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Title className="pgm__register-model-header">Register</Modal.Title>
      <Modal.Body className="pgm__register-model-body">
        <Routes>
          <Route path="/" element={<TypeComponent />} />
          <Route path='/register' element={<FormComponent />} />
        </Routes>
          
      </Modal.Body>
    </Modal>
  )
}

export default RegistrationModel