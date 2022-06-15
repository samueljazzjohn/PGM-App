import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { BiShow } from 'react-icons/bi'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ShowBar } from '../../components'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { addCourse, selectLoading } from '../../features/admin/addCourseSlice'

const AddCourse = () => {

  const loading=useSelector(selectLoading)
  const dispatch=useDispatch()


  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const [course, setCourse] = useState()

  const { register, handleSubmit, formState: { errors }, reset } = useForm()


  const onSubmit = (data) => {
    console.log(data)
    dispatch(addCourse({data,toast,setIsButtonClicked}))
    reset(data)
  }

  useEffect(() => {
    axios.get("http://localhost:4000/course").then((res) => {
      setCourse(res.data)
      // toast.success('Loading success')
      // console.log("courses"+courses)
    }).catch((err) => {
      console.log(err.message)
      toast.error('Database loading error')
    })
  },[isButtonClicked])

  const handleClick=()=>{
    setIsButtonClicked(!isButtonClicked)
  }


  return (
    <div className="pgm__admin_add_course_container section__margin ">
      <Button className='pgm__admin_add_course_button' onClick={handleClick}>
        {
          !isButtonClicked
            ? "Add new Course"
            : "Show Courses"
        }
        {
          !isButtonClicked ?
            <GrAdd className="pgm__admin_add_course_icon" /> :
            <BiShow className="pgm__admin_add_course_icon" />
        }
      </Button>

        {
          !isButtonClicked && <div className="pgm__admin_show_course">
          <div className="pgm__admin_show_course_header">
            <p>Courses available</p>
          </div>
          <div className="pgm__admin_show">
            {course && course.map((course) => <ShowBar key={course._id} url="http://localhost:4000/admin/remove-course" name={course.courseName} id={course._id} state={isButtonClicked} />)}
          </div>
        </div>
        }
      {
        isButtonClicked && <div className="pgm__admin_add_course_form_container section__padding">
        <Form method='POST' className='pgm__admin_add_course_form' onSubmit={handleSubmit(onSubmit)}>
          <label className='pgm__admin_form_label' htmlFor="course">Enter the course name :</label>
          <Form.Control className="pgm__admin-form-inputText" type='text' placeholder='Course name' {...register('courseName', { required: "Course do not empty" })}></Form.Control>
          {errors.courseName && <span className='pgm__admin_form_error' role='alert'>{errors.course.message}</span>}
          <label className='pgm__admin_form_label' htmlFor="duration">Enter the duration of course :</label>
          <Form.Control className="pgm__admin-form-inputText" type='number' placeholder='duration' {...register('duration', { required: "duration do not empty", valueAsNumber: "please enter duration as number of years" })}></Form.Control>
          {errors.duration && <span className='pgm__admin_form_error' role='alert'>{errors.duration.message}</span>}
          <div>
            <Button type='submit' className="pgm__admin_add_course_form_button mx-auto" disabled={loading} variant="secondary">Add course</Button>

          </div>
        </Form>
      </div>
      }
    </div>
  )
}

export default AddCourse