import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Form,Row,Col,Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux' 
import { registerModelClose } from '../../features/registrationModel/registrationModelSlice'
import { useForm } from 'react-hook-form'
import { categorySelected } from '../../features/category/categorySlice'

const TypeComponent = () => {

    const {register,handleSubmit,errors} = useForm()

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const navigateForm=(data)=>{
        console.log(data)
        dispatch(categorySelected(data.type))
        navigate('/register',{state:data})
    }

  return (
    
    <div className="pgm__register1_container">
    <Form className="pgm__register-model-form" method='POST'>
    <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='email' className='pgm__contact-form-inputText' placeholder='email address' {...register('email', { required: true })} />
            </Col>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='username' {...register('username', { required: true })} />
            </Col>
          </Row>
          <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='password' className='pgm__contact-form-inputText' placeholder='password' {...register('pass', { required: true })} />
            </Col>
            <Col className='sm-10 md-6'>
              <Form.Control type='password' className='pgm__contact-form-inputText' placeholder='confirm password' {...register('cpass', { required: true })} />
            </Col>
          </Row>
    <Row>
          <Col className='sm-10 md-6'>
            <Form.Select aria-label="Default select" className='pgm__contact-form-inputText' {...register('type', { required: true })}>
                <option>--select type--</option>
                
                <option  >student</option>
                <option  >church</option>
                <option  >teacher</option>
              </Form.Select>
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