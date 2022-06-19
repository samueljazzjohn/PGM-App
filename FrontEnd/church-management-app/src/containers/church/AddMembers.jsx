import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { BiShow } from 'react-icons/bi'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ShowBar } from '../../components'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import './church.css'

const AddMembers = () => {

    
//   const loading=useSelector(selectLoading)
  const dispatch=useDispatch()

  const [members,setMembers]=useState()

  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()


  const onSubmit = (data) => {
    console.log(data)
    // dispatch(addCourse({data,toast,setIsButtonClicked}))
    reset(data)
  }

//   useEffect(() => {
//     axios.get("http://localhost:4000/church/members").then((res) => {
//       setCourse(res.data)
//       // toast.success('Loading success')
//       // console.log("courses"+courses)
//     }).catch((err) => {
//       console.log(err.message)
//     })
//   },[isButtonClicked])

  const handleClick=()=>{
    setIsButtonClicked(!isButtonClicked)
  }

  return (
    <div className="pgm__church_add_member_container section__margin ">
    <Button className='pgm__church_add_member_button' onClick={handleClick}>
      {
        !isButtonClicked
          ? "Add new member"
          : "Show members"
      }
      {
        !isButtonClicked ?
          <GrAdd className="pgm__church_add_member_icon" /> :
          <BiShow className="pgm__church_add_member_icon" />
      }
    </Button>

      {
        !isButtonClicked && <div className="pgm__church_show_member">
        <div className="pgm__church_show_member_header">
          <p>Members</p>
        </div>
        <div className="pgm__church_show">
          {members && members.map((member) => <ShowBar key={member._id} url='http://localhost:4000/church/remove-member' date={member.date} id={member._id} name={member.memberName} state={setIsButtonClicked} />)}
        </div>
      </div>
      }
    {
      isButtonClicked && <div className="pgm__church_add_member_form_container section__padding">
      <Form method='POST' className='pgm__church_add_member_form' onSubmit={handleSubmit(onSubmit)}>
        <label className='pgm__church_form_label' htmlFor="course">Enter the member name :</label>
        <Form.Control className="pgm__church-form-inputText" type='text' placeholder='member' {...register('memberName', { required: "Course do not empty" })}></Form.Control>
        {errors.memberName && <span className='pgm__church_form_error' role='alert'>{errors.memberName.message}</span>}
        <label className='pgm__church_form_label' htmlFor="venue">Enter the venue :</label>
        <Form.Control className="pgm__church-form-inputText" type='text' placeholder='venue' {...register('venue', { required: "venue do not empty"})}></Form.Control>
        {errors.venue && <span className='pgm__church_form_error' role='alert'>{errors.venue.message}</span>}
        <label className='pgm__church_form_label' htmlFor="date">Enter the date :</label>
        <Form.Control className="pgm__church-form-inputText" type='date'{...register('date', { required: "date do not empty"})}></Form.Control>
        {errors.date && <span className='pgm__church_form_error' role='alert'>{errors.date.message}</span>}
        <div>
          <Button type='submit' className="pgm__church_add_member_form_button mx-auto" variant="secondary">Add member</Button>

        </div>
      </Form>
    </div>
    }
  </div>
  )
}

export default AddMembers