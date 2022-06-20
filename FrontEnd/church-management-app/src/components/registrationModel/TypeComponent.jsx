import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { registerModelClose } from '../../features/registrationModel/registrationModelSlice'
import { useForm } from 'react-hook-form'
import validator from 'validator'
import { categorySelected } from '../../features/category/categorySlice'

const TypeComponent = () => {

  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
);

  const navigateForm = (data) => {
    console.log(data)
    dispatch(categorySelected(data.type))
    navigate('/register', { state: data })
  }

  return (

    <div className="pgm__register1_container">
      <Form className="pgm__register-model-form" method='POST'>
        <Row>
          <Col className='sm-10 md-6'>
            <Form.Control type='email' className='pgm__contact-form-inputText' placeholder='Email address'
             {...register("email", { required: "email required",
             validate:(email)=>{
              if(!validator.isEmail(email)){
                return "Please enter valid email"
              }
             } })} />
            {errors.email && <span className="pgm__register_error" role='alert'>{errors.email.message}</span>}
          </Col>
          <Col className='sm-10 md-6'>
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='username' {...register('username', { required: "username required", minLength: { value: 5, message: "Username must contain 5 charecters" } })} />
            {errors.username && <span className="pgm__register_error" role='alert'>{errors.username.message}</span>}
          </Col>
        </Row>
        <Row>
          <Col className='sm-10 md-6'>
            <Form.Control type='password' className='pgm__contact-form-inputText' placeholder='password' {...register('pass', { required: true,
              validate:(pass)=>{
                if(!pattern.test(pass)){
                  return "password must contain 1 uppercase,lowercase and a special character"
                }
              },
              minLength: { value: 8, message: "password must contain 8 characters" } })} />
            {errors.pass && <span className="pgm__register_error" role='alert'>{errors.pass.message}</span>}
          </Col>
          <Col className='sm-10 md-6'>
            <Form.Control type='password' className='pgm__contact-form-inputText' placeholder='confirm password'
            {...register('cpass', {
               required: true ,
               validate:(val)=>{
                  if(watch('pass')!=val){
                    return "your password do not match"
                  }
               }})} />
            {errors.cpass && <span className="pgm__register_error" role='alert'>{errors.cpass.message}</span>}
          </Col>
        </Row>
        <Row>
          <Col className='sm-10 md-6'>
            <Form.Select aria-label="Default select" className='pgm__contact-form-inputText'
             {...register('type', { required: "Please select a type",
             validate:(val)=>{
              if(val==='--select type--'){
                return "Please select a type"
              }
             } })}>
              <option>--select type--</option>

              <option>student</option>
              <option>church</option>
              <option>teacher</option>
            </Form.Select>
            {errors.type && <span className="pgm__register_error" role='alert'>{errors.type.message}</span>}
          </Col>
        </Row>
        <div className="pgm__register_model_button_container">
          <Button className="pgm__register-model-button" variant="secondary" onClick={() => dispatch(registerModelClose())}>
            Close
          </Button>
          <Button className="pgm__register-model-button" variant="primary" onClick={handleSubmit(navigateForm)} >Next</Button>
        </div>
      </Form>
    </div>
  )
}

export default TypeComponent