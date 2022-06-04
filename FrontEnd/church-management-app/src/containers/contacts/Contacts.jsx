import React from 'react'
import './contacts.css'
import { ContactBar } from '../../components'
import { Form, Col, Row, FloatingLabel,Button } from 'react-bootstrap'

const Contacts = () => {
  return (
    <div className="pgm__contact-container section__margin" id='contact'>
      <div className="pgm__contact-details-container">
        <div className="pgm__contact-details-header">
          <h1 className='gradient__text'>Our Contacts</h1>
        </div>
        <div className="pgm__contact-details-content mt-4">
          <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old.</p>
        </div>
        <ContactBar />
      </div>
      <div className="pgm__contact-form-container">
        <div className="pgm__contact-form-header ">
          <h1 className='gradient__text'>Quick contact form</h1>
        </div>
        <Form className='pgm__contact-form mt-4'>
          <Row className='pgm__contact-form-row'>
            <Col>
              <Form.Control className='pgm__contact-form-inputText' placeholder="First name" />
            </Col>
            <Col>
              <Form.Control className='pgm__contact-form-inputText' placeholder="Last name" />
            </Col>
          </Row>
          <Row className='pgm__contact-form-row'>
            <Col>
              <Form.Control className='pgm__contact-form-inputText' placeholder="Email Address" />
            </Col>
            <Col>
              <Form.Control className='pgm__contact-form-inputText' placeholder="Subject" />
            </Col>
          </Row>
          <Row className='pgm__contact-form-row'>
            <Col>  <FloatingLabel  controlId="floatingTextarea2">
              <Form.Control
                className='pgm__contact-form-inputText'
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
              />
            </FloatingLabel></Col>
          </Row>
          <Row className='pgm__contact-form-row'>
            <Col>
              <Button className='pgm__contact-form-button'>Send Message</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default Contacts