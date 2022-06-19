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

const AddCommitteMembers = () => {
    
//   const loading=useSelector(selectLoading)
  const dispatch=useDispatch()

  const [committee,setCommittee]=useState()


  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()


  const onSubmit = (data) => {
    console.log(data)
    // dispatch(addCourse({data,toast,setIsButtonClicked}))
    reset(data)
  }

//   useEffect(() => {
//     axios.get("http://localhost:4000/course").then((res) => {
//       setCourse(res.data)
//       // toast.success('Loading success')
//       // console.log("courses"+courses)
//     }).catch((err) => {
//       console.log(err.message)
//       toast.error('Database loading error')
//     })
//   },[isButtonClicked])

  const handleClick=()=>{
    setIsButtonClicked(!isButtonClicked)
  }

  return (
    <div className="pgm__church_add_committee_member_container section__margin ">
    <Button className='pgm__church_add_committee_member_button' onClick={handleClick}>
      {
        !isButtonClicked
          ? "Add new Committee Member"
          : "Show Committee Members"
      }
      {
        !isButtonClicked ?
          <GrAdd className="pgm__church_add_committe_member_icon" /> :
          <BiShow className="pgm__church_add_committe_member_icon" />
      }
    </Button>

      {
        !isButtonClicked && <div className="pgm__church_show_committe_member">
        <div className="pgm__church_show_committe_member_header">
          <p>Committe members</p>
        </div>
        <div className="pgm__church_show">
          {committee && committee.map((committee) => <ShowBar key={committee._id} url='http://localhost:4000/church/remove-committee' date={committee.date} id={committee._id} name={committee.committeeName} state={setIsButtonClicked} />)}
        </div>
      </div>
      }
    {
      isButtonClicked && <div className="pgm__church_add_committee_member_form_container section__padding">
      <Form method='POST' className='pgm__church_add_committee_member_form' onSubmit={handleSubmit(onSubmit)}>
        <label className='pgm__church_form_label' htmlFor="course">Enter the event name :</label>
        <Form.Control className="pgm__church-form-inputText" type='text' placeholder='Event' {...register('eventName', { required: "Course do not empty" })}></Form.Control>
        {errors.eventName && <span className='pgm__church_form_error' role='alert'>{errors.eventName.message}</span>}
        <label className='pgm__church_form_label' htmlFor="venue">Enter the venue :</label>
        <Form.Control className="pgm__church-form-inputText" type='text' placeholder='venue' {...register('venue', { required: "venue do not empty"})}></Form.Control>
        {errors.venue && <span className='pgm__church_form_error' role='alert'>{errors.venue.message}</span>}
        <label className='pgm__church_form_label' htmlFor="date">Enter the date :</label>
        <Form.Control className="pgm__church-form-inputText" type='date'{...register('date', { required: "date do not empty"})}></Form.Control>
        {errors.date && <span className='pgm__church_form_error' role='alert'>{errors.date.message}</span>}
        <div>
          <Button type='submit' className="pgm__church_add_committee_member_form_button mx-auto" variant="secondary">Add event</Button>

        </div>
      </Form>
    </div>
    }
  </div>
  )
}

export default AddCommitteMembers