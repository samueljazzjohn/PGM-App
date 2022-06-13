import React from 'react'
import {GrAdd} from 'react-icons/gr'
import {Button,Form,Row} from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const AddCourse = () => {

  const {register,handleSubmit,formState:{errors}}=useForm()

  const onSubmit=(data)=>{
    console.log(data)
  }

  return (
    <div className="pgm__admin_add_course_container section__margin ">
      <Button className='pgm__admin_add_course_button'>Add new course<GrAdd className="pgm__admin_add_course_icon"/></Button>
      <div className="pgm__admin_add_course_show">

      </div>
      <div className="pgm__admin_add_course_form_container section__padding">
        <Form method='POST' className='pgm__admin_add_course_form' onSubmit={handleSubmit(onSubmit)}>
          <label className='pgm__admin_form_label' htmlFor="course">Enter the course name :</label>
          <Form.Control className="pgm__admin-form-inputText" type='text' placeholder='Course name' {...register('course',{required:"Course do not empty"})}></Form.Control>
          {errors.course && <span className='pgm__admin_form_error' role='alert'>{errors.course.message}</span>}
          <label className='pgm__admin_form_label' htmlFor="duration">Enter the duration of course :</label>
          <Form.Control className="pgm__admin-form-inputText" type='number' placeholder='duration' {...register('duration', {required:"duration do not empty",valueAsNumber:"please enter duration as number of years"})}></Form.Control>
          {errors.duration && <span className='pgm__admin_form_error' role='alert'>{errors.duration.message}</span>}
          <div>
          <Button type='submit' className="pgm__admin_add_course_form_button mx-auto" variant="secondary">Add course</Button>

          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddCourse