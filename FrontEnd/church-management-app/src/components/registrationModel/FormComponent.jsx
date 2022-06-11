import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Form,Row,Col,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux' 
import { registerModelClose } from '../../features/registrationModel/registrationModelSlice'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import {toast} from 'react-toastify'
import { selectcategory } from '../../features/category/categorySlice'
import { registerUser } from '../../features/user/registerSlice'
import { selectLoading } from '../../features/user/registerSlice'

const FormComponent = () => {

    const {register,handleSubmit,errors} = useForm()

    const loading = useSelector(selectLoading)
    const category=useSelector(selectcategory)
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const location=useLocation();

    const onSubmit=(data)=>{
        const prev=location.state
        data={...data,'username':prev.username,'password':prev.pass,'type':prev.type,'email':prev.email}
        console.log(data)
        dispatch(registerUser({data,navigate,toast}))
    }

    // const renderField=()=>{
    //     console.log(type)
        
    // }

  return (
    <div className="pgm__register2_container">
        <Form className="pgm__register-model-form" onSubmit={handleSubmit(onSubmit)} method='POST'>
          <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='First Name' {...register('fname', { required: true })} />
            </Col>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='Last name' {...register('lname', { required: true })} />
            </Col>
          </Row>
          
          <Row>
          <Col className='sm-10 md-6'>
          { category==='student' &&
            <Form.Select aria-label="Default select" className='pgm__contact-form-inputText' {...register('course', { required: true })}>
                    <option>--select course--</option>
                    
                    <option value="3">BTH</option>
                  </Form.Select>
        }
        { category==='teacher' &&
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='Experience in years' {...register('experience', { required: true })} />
        }
        { category==='church' &&
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='Members' {...register('members', { required: true })} />
        }
            </Col>
            <Col className='sm-10 col-md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='phone number' {...register('phone', { required: true })} />
            </Col>
          </Row>
          <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='place' {...register('place', { required: true })} />
            </Col>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='city' {...register('city', { required: true })} />
            </Col>
          </Row>
          <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='district' {...register('district', { required: true })} />
            </Col>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='state' {...register('state', { required: true })} />
            </Col>
          </Row>
          <Row>
            <Col className='sm-10 md-6'>
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='pincode' {...register('pincode', { required: true })} />
            </Col>
            
          </Row>
          <div className="pgm__register_model_button_container">
            <Button className="pgm__register-model-button" variant="secondary" onClick={()=>navigate('/')}>
              Back
            </Button>
            <Button className="pgm__register-model-button" variant="primary" type='submit' disabled={loading} >Register</Button>
          </div>
        </Form>
    </div>
  )
}

export default FormComponent