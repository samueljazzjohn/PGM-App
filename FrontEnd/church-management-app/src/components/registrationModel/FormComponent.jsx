import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { registerModelClose } from '../../features/registrationModel/registrationModelSlice'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { selectcategory } from '../../features/category/categorySlice'
import { registerUser } from '../../features/user/registerSlice'
import { selectLoading } from '../../features/user/registerSlice'
import './RegistrationModel.css'
import axios from 'axios'

const FormComponent = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const [courses,setCourses]=useState()

  const loading = useSelector(selectLoading)
  const category = useSelector(selectcategory)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();

   useEffect(() => {
    if(category=='student'){
      axios.get("http://localhost:4000/course").then((res)=>{
        setCourses(res.data)
        // console.log("courses"+courses)
      }).catch((err)=>{
        console.log(err.message)
      })
    }
   },[category])
   

  const onSubmit = (data) => {
    const prev = location.state
    data = { ...data, 'username': prev.username, 'password': prev.pass, 'type': prev.type, 'email': prev.email }
    console.log(data)
    dispatch(registerUser({ data, navigate, toast }))
  }

  // const renderField=()=>{
  //     console.log(type)

  // }

  return (
    <div className="pgm__register2_container">
      <Form className="pgm__register-model-form" onSubmit={handleSubmit(onSubmit)} method='POST'>
        <Row>
          <Col className='sm-10 md-6'>
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='First Name' {...register('fname', { required: "First name is required" })} />
            {errors.fname && <span className="pgm__register_error" role='alert'>{errors.fname.message}</span>}
          </Col>
          <Col className='sm-10 md-6'>
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='Last name' {...register('lname', { required: "last name is required" })} />
            {errors.lname && <span className="pgm__register_error" role='alert'>{errors.lname.message}</span>}
          
          </Col>
        </Row>

        <Row>
          <Col className='sm-10 md-6'>
            {category === 'student' &&
              <Form.Select aria-label="Default select" className='pgm__contact-form-inputText' {...register('course', {
                required: true,
                validate: (course) => {
                  if (course == "--select course--") {
                    return "Select a course"
                  }
                }
              })}>
                <option>--select course--</option>
                {courses && console.log(courses)}
                { courses && courses.map((course)=><option value={course._id}>{course.courseName}</option>)}
              </Form.Select>

            }
            {errors.course && <span className="pgm__register_error" role='alert'>{errors.course.message}</span>}
            {category === 'teacher' &&
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='Experience in years' {...register('experience', { required: true,valueAsNumber:"Enter experience in number of years" })} />
            }
            {errors.experience && <span className="pgm__register_error" role='alert'>{errors.experience.message}</span>}

            {category === 'church' &&
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='Members' {...register('members', { required: true })} />
            }
            {errors.members && <span className="pgm__register_error" role='alert'>{errors.members.message}</span>}
          </Col>
          <Col className='sm-10 col-md-6'>
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='phone number' {...register('phone', {
              required: true, minLength: { value: 10, message: "Your phone number must be atleast 10 numbers" },
              //  valueAsNumber: "Please enter a valid phone number",
              maxLength: { value: 10, message: "Enter a valid phone" }
            })} />
            {errors.phone && <span className="pgm__register_error" role='alert'>{errors.phone.message}</span>}
          </Col>
        </Row>
        <Row>
          <Col className='sm-10 md-6'>
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='place' {...register('place', { required: true })} />
            {errors.place && <span className="pgm__register_error" role='alert'>{errors.place.message}</span>}

          </Col>
          <Col className='sm-10 md-6'>
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='city' {...register('city', { required: true })} />
            {errors.city && <span className="pgm__register_error" role='alert'>{errors.city.message}</span>}

          </Col>
        </Row>
        <Row>
          <Col className='sm-10 md-6'>
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='district' {...register('district', { required: true })} />
            {errors.district && <span className="pgm__register_error" role='alert'>{errors.district.message}</span>}

          </Col>
          <Col className='sm-10 md-6'>
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='state' {...register('state', { required: true })} />
            {errors.state && <span className="pgm__register_error" role='alert'>{errors.state.message}</span>}

          </Col>
        </Row>
        <Row>
          <Col className='sm-10 md-6'>
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='pincode' {...register('pincode', { required: true, minLength: { value: 6, message: "Enter valid pincode" }, maxLength: { value: 6, message: "Enter valid pincode" } })} />
            {errors.pincode && <span className="pgm__register_error" role='alert'>{errors.pincode.message}</span>}

          </Col>
          <Col className='sm-10 md-6'>
            {category !== 'church' &&
              <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='Aadhar Number' {...register('Aadhar', { required: true, minLength: { value: 12, message: "Enter valid aadhar" }, maxLength: { value: 12, message: "Enter valid aadhar" } })} />
            }
            {errors.Aadhar && <span className="pgm__register_error" role='alert'>{errors.Aadhar.message}</span>}
          </Col>

        </Row>
        <div className="pgm__register_model_button_container">
          <Button className="pgm__register-model-button" variant="secondary" onClick={() => navigate('/')}>
            Back
          </Button>
          <Button className="pgm__register-model-button" variant="primary" type='submit' disabled={loading} >Register</Button>
        </div>
      </Form>
    </div>
  )
}

export default FormComponent