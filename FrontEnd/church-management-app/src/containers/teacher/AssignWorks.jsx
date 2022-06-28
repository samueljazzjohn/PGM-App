import React, { useState, useEffect } from 'react'
import './teacher.css'
import { GrAdd } from 'react-icons/gr'
import { BiShow } from 'react-icons/bi'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import ShowQuestion from '../../components/showBars/ShowQuestion'
import { useNavigate } from 'react-router-dom'

const AssignWorks = () => {

  var max = new Date().getFullYear()
  var min = max - 5
  var years = []

  for (var i = max; i >= min; i--) {
    years.push(i)
  }

  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState()
  const [upload, setUpload] = useState()
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [work, setWork] = useState()

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const navigate = useNavigate()

  const user = useSelector(selectUser)

  const token = user.token

  const onSubmit = (data) => {
    data.question = data.question.trim()
    setLoading(true)
    console.log(data)
    axios.post("http://localhost:4000/teacher/assign-works", data, { headers: { "authorization": `Bearer ${token}` } }).then(() => {
      setLoading(false)
      setIsButtonClicked(false)
      toast.success("Notifications added")
      // data.reset({title:"",message:""})
    }).catch((err) => {
      setLoading(false)
      toast.error("Server error")
    })
  }

  // useEffect(() => {
  //   console.log(user)
  //   if (user==null) {
  //     navigate('/')
  //   }
  // })

  useEffect(() => {
    axios.get("http://localhost:4000/course").then((res) => {
      setCourses(res.data)
      // console.log("courses"+courses)
    }).catch((err) => {
      console.log(err.message)
    })
  }, [isButtonClicked])

  useEffect(() => {
    axios.get("http://localhost:4000/teacher/view-works", { headers: { "authorization": `Bearer ${token}` } }).then((res) => {
      setWork(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  }, [!isButtonClicked])

  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked)
  }


  return (
    <div className="pgm__teacher_assign_works_container section__margin">
      <Button className='pgm__admin_add_course_button' onClick={handleClick}>
        {
          !isButtonClicked
            ? "Assign Work"
            : "Show Works"
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
            <p>Works assigned</p>
          </div>
          <div className="pgm__admin_show">
            {work && work.map((work, index) => <ShowQuestion key={work._id} url="http://localhost:4000/teacher/remove-work" token={token} name={index + 1} course={work.courseId.courseName} question={work.question} id={work._id} date={work.date} state={isButtonClicked} />)}
          </div>
        </div>
      }
      {
        isButtonClicked &&
        <div className="pgm__teacher_heading">
          <h5>Assign Works</h5>
        </div>
      }
      {
        isButtonClicked &&
        <Form className="pgm__teacher_assign_works-form" method='POST' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <label className='pgm__church_form_label' htmlFor="year">Select Year :</label>
              <Form.Select aria-label="Default select" className='pgm__teacher-form-inputText' {...register('year', {
                required: true,
                validate: (year) => {
                  if (year == "--select year--") {
                    return "Select a year"
                  }
                }
              })}>
                <option>--select year--</option>
                {/* {years && console.log(years)} */}
                {years && years.map((year) => <option key={year}>{year}</option>)}
              </Form.Select>
            </Col>
            <Col>
              <label className='pgm__church_form_label' htmlFor="course">Select Course :</label>
              {
                courses &&
                <Form.Select aria-label="Default select" className='pgm__teacher-form-inputText' {...register('course', {
                  required: true,
                  validate: (course) => {
                    if (course == "--select course--") {
                      return "Select a course"
                    }
                  }
                })}>
                  <option>--select course--</option>
                  {courses && console.log(courses)}
                  {courses && courses.map((course) => <option key={course._id} value={course._id}>{course.courseName}</option>)}
                </Form.Select>
              }
              {errors.course && <span className="pgm__register_error" role='alert'>{errors.course.message}</span>}
            </Col>
          </Row>
          <Row>
            <Col>
              <label className='pgm__church_form_label' htmlFor="name">Enter the Question :</label>
              <Form.Control as='textarea' className='pgm__teacher-form-inputText' placeholder='question' style={{ height: '100px' }} {...register('question', { required: "question required", minLength: { value: 5, question: "Username must contain 5 charecters" } })} />
              {errors.question && <span className="pgm__register_error" role='alert'>{errors.question.message}</span>}
            </Col>
          </Row>
          <Row>
            <Col>
              <label className='pgm__church_form_label' htmlFor="date">Enter the deadline date :</label>
              <Form.Control className="pgm__teacher-form-inputText" type='date'{...register('date', { required: "date do not empty" })}></Form.Control>
              {errors.date && <span className='pgm__church_form_error' role='alert'>{errors.date.message}</span>}
            </Col>
          </Row>
          {/* <Row>
          <Col>
          <label className='pgm__church_form_label' htmlFor="name">Choose a file :</label>
          <Button className="pgm__teacher_assign_works-upload-button" onClick={uploadWidget}>Upload</Button>
          </Col>
        </Row> */}
          <Row>
            <Col>
              <Button className="pgm__teacher_assign_works-button" disabled={loading} variant="primary" type="submit" >Add</Button>
            </Col>
          </Row>

        </Form>
      }
    </div>
  )
}

export default AssignWorks