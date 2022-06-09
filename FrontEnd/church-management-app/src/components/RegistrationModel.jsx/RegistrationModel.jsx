import React, { useState } from 'react'
import './RegistrationModel.css'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { registerModelClose, registerModelShow } from '../../features/registrationModel/registrationModelSlice'

const RegistrationModel = () => {

  const show = useSelector(registerModelShow)
  const dispatch = useDispatch();

  console.log(show)

  return (
    <Modal
      className="pgm__register-model-container fade"
      show={show}
      onHide={() => dispatch(registerModelClose())}
      tabIndex="-1"
      backdrop="static"
      keyboard={false}
    >
      {/* <Modal.Header closeButton className="pgm__register-model-header">
            </Modal.Header> */}
      <Modal.Title className="pgm__register-model-header">Register</Modal.Title>
      <Modal.Body className="pgm__register-model-body">
        <Form className="pgm__register-model-form" method='POST'>
          <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='First name' value='' />
            </Col>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='Last name' value='' />
            </Col>
          </Row>
          <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='email address' value='' />
            </Col>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='username' value='' />
            </Col>
          </Row>
          <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='password' value='' />
            </Col>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='confirm password' value='' />
            </Col>
          </Row>
          <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='phone number' value='' />
            </Col>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='house name' value='' />
            </Col>
          </Row>
          <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='city' value='' />
            </Col>
            <Col className='sm-10 md-6'>
              <Form.Select aria-label="Default select" className='pgm__contact-form-inputText'>
                <option>--select state--</option>
                
                <option value="3">Kerala</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='pincode' value='' />
            </Col>
            <Col className='sm-10 md-6'>
            <Form.Select aria-label="Default select" className='pgm__contact-form-inputText'>
                <option>--select course--</option>
                
                <option value="3">BTH</option>
              </Form.Select>
            </Col>
          </Row>
          <div className="pgm__register_model_button_container">
            <Button className="pgm__register-model-button" variant="secondary" onClick={() => dispatch(registerModelClose())}>
              back
            </Button>
            <Button className="pgm__register-model-button" variant="primary" type='submit' >Register</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RegistrationModel